'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type Genome, type StrainView } from '@/lib/genome';
import { FigLabel } from './manual';

interface ContagionSimulatorProps {
  strains: StrainView[];
}

// Internal coordinate space; the canvas is scaled to fit its container via CSS.
const W = 880;
const H = 520;
const K_NEIGHBORS = 7;

// Tuning constants for the epidemic dynamics.
const BASE_INFECT = 1.05;
const BASE_RECOVER = 0.05;
const BASE_CONVERT = 0.55;
const SUSCEPTIBLE = -1;

interface Snapshot {
  counts: number[];
  susceptible: number;
  tick: number;
  dominantIdx: number;
}

export default function ContagionSimulator({ strains }: ContagionSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ----- mutable simulation state (kept out of React to avoid re-render churn)
  const posX = useRef<Float32Array>(new Float32Array(0));
  const posY = useRef<Float32Array>(new Float32Array(0));
  const state = useRef<Int16Array>(new Int16Array(0)); // strain index or SUSCEPTIBLE
  const neighbors = useRef<Int32Array>(new Int32Array(0)); // N * K flat
  const genomes = useRef<Genome[]>([]); // live (mutating) copies
  const enabled = useRef<boolean[]>([]);
  const runningRef = useRef(false);
  const speedRef = useRef(12); // ticks per second
  const tickRef = useRef(0);
  const prevCounts = useRef<number[]>([]);
  const dominatingFlag = useRef<boolean[]>([]);
  const rng = useRef<() => number>(() => Math.random());

  // ----- React state (display only)
  const [population, setPopulation] = useState(560);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(12);
  const [snapshot, setSnapshot] = useState<Snapshot>({
    counts: strains.map(() => 0),
    susceptible: population,
    tick: 0,
    dominantIdx: -1,
  });
  const [strainOn, setStrainOn] = useState<boolean[]>(strains.map(() => true));
  const [events, setEvents] = useState<string[]>([]);

  const pushEvent = useCallback((msg: string) => {
    setEvents((prev) => [msg, ...prev].slice(0, 7));
  }, []);

  // Seedable PRNG so a reset reproduces the same world layout.
  const makeRng = (seed: number) => {
    let s = seed >>> 0;
    return () => {
      s ^= s << 13;
      s ^= s >>> 17;
      s ^= s << 5;
      return ((s >>> 0) % 1000000) / 1000000;
    };
  };

  // Build the world: positions, neighbor graph, fresh genomes.
  const build = useCallback(
    (n: number) => {
      const r = makeRng(1337);
      rng.current = r;
      const px = new Float32Array(n);
      const py = new Float32Array(n);
      const st = new Int16Array(n);
      const margin = 14;
      for (let i = 0; i < n; i++) {
        px[i] = margin + r() * (W - margin * 2);
        py[i] = margin + r() * (H - margin * 2);
        st[i] = SUSCEPTIBLE;
      }

      // Neighbor graph via a spatial grid.
      const cell = 70;
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      const grid: number[][] = Array.from({ length: cols * rows }, () => []);
      const cellIdx = (x: number, y: number) =>
        Math.min(cols - 1, Math.floor(x / cell)) +
        Math.min(rows - 1, Math.floor(y / cell)) * cols;
      for (let i = 0; i < n; i++) grid[cellIdx(px[i], py[i])].push(i);

      const nbr = new Int32Array(n * K_NEIGHBORS).fill(-1);
      for (let i = 0; i < n; i++) {
        const cxi = Math.min(cols - 1, Math.floor(px[i] / cell));
        const cyi = Math.min(rows - 1, Math.floor(py[i] / cell));
        const cand: { j: number; d: number }[] = [];
        for (let gx = cxi - 1; gx <= cxi + 1; gx++) {
          for (let gy = cyi - 1; gy <= cyi + 1; gy++) {
            if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) continue;
            for (const j of grid[gx + gy * cols]) {
              if (j === i) continue;
              const dx = px[i] - px[j];
              const dy = py[i] - py[j];
              cand.push({ j, d: dx * dx + dy * dy });
            }
          }
        }
        cand.sort((a, b) => a.d - b.d);
        for (let k = 0; k < K_NEIGHBORS && k < cand.length; k++) {
          nbr[i * K_NEIGHBORS + k] = cand[k].j;
        }
      }

      posX.current = px;
      posY.current = py;
      state.current = st;
      neighbors.current = nbr;
      genomes.current = strains.map((s) => ({ ...s.genome }));
      enabled.current = strainOn.slice();
      tickRef.current = 0;
      prevCounts.current = strains.map(() => 0);
      dominatingFlag.current = strains.map(() => false);
    },
    [strains, strainOn],
  );

  // Inject `amount` infections of strain `idx` into random susceptible hosts.
  const seedStrain = useCallback((idx: number, amount: number) => {
    const st = state.current;
    const n = st.length;
    if (n === 0) return;
    const r = rng.current;
    let placed = 0;
    let attempts = 0;
    while (placed < amount && attempts < n * 4) {
      const i = Math.floor(r() * n);
      if (st[i] === SUSCEPTIBLE) {
        st[i] = idx;
        placed++;
      }
      attempts++;
    }
  }, []);

  const reset = useCallback(
    (seedAll: boolean) => {
      build(population);
      if (seedAll) {
        strains.forEach((_, idx) => {
          if (strainOn[idx]) seedStrain(idx, 8);
        });
      }
      tickRef.current = 0;
      setSnapshot({
        counts: strains.map(() => 0),
        susceptible: population,
        tick: 0,
        dominantIdx: -1,
      });
      setEvents([]);
    },
    [build, population, strains, strainOn, seedStrain],
  );

  // One simulation step.
  const step = useCallback(() => {
    const st = state.current;
    const nbr = neighbors.current;
    const g = genomes.current;
    const en = enabled.current;
    const n = st.length;
    const r = rng.current;
    const S = g.length;

    const next = st.slice();

    // Scratch arrays reused per agent.
    const pressure = new Float64Array(S);
    const sameCount = new Float64Array(S);

    for (let i = 0; i < n; i++) {
      const cur = st[i];
      const base = i * K_NEIGHBORS;

      if (cur === SUSCEPTIBLE) {
        pressure.fill(0);
        sameCount.fill(0);
        let total = 0;
        for (let k = 0; k < K_NEIGHBORS; k++) {
          const j = nbr[base + k];
          if (j < 0) continue;
          const s = st[j];
          if (s < 0 || !en[s]) continue;
          sameCount[s] += 1;
        }
        for (let s = 0; s < S; s++) {
          if (sameCount[s] === 0 || !en[s]) continue;
          const gen = g[s];
          const frac = sameCount[s] / K_NEIGHBORS;
          const emo = 0.55 + 0.45 * gen.emotionalPull;
          const net = 1 + gen.network * frac;
          const p = gen.contagion * frac * emo * net * BASE_INFECT;
          pressure[s] = p;
          total += p;
        }
        if (total > 0) {
          const prob = 1 - Math.exp(-total / speedRef.current);
          if (r() < prob) {
            // choose strain weighted by pressure
            let pick = r() * total;
            for (let s = 0; s < S; s++) {
              pick -= pressure[s];
              if (pick <= 0) {
                next[i] = s;
                break;
              }
            }
          }
        }
      } else {
        const gen = g[cur];
        // recovery: weaker grip => more forgetting
        const recover =
          BASE_RECOVER * (1 - gen.resistance) * (1.1 - 0.4 * gen.emotionalPull);
        if (r() < recover / speedRef.current) {
          next[i] = SUSCEPTIBLE;
          continue;
        }
        // conversion by aggressive rivals
        pressure.fill(0);
        let total = 0;
        for (let k = 0; k < K_NEIGHBORS; k++) {
          const j = nbr[base + k];
          if (j < 0) continue;
          const s = st[j];
          if (s < 0 || s === cur || !en[s]) continue;
          const rg = g[s];
          const p = rg.virulence * rg.contagion * BASE_CONVERT;
          pressure[s] += p;
          total += p;
        }
        if (total > 0) {
          const eff = total * (1 - gen.resistance);
          const prob = 1 - Math.exp(-eff / speedRef.current);
          if (r() < prob) {
            let pick = r() * total;
            for (let s = 0; s < S; s++) {
              if (pressure[s] === 0) continue;
              pick -= pressure[s];
              if (pick <= 0) {
                next[i] = s;
                break;
              }
            }
          }
        }
      }
    }

    state.current = next;
    tickRef.current += 1;

    // Mutation events — scaled by each strain's adaptability.
    for (let s = 0; s < S; s++) {
      if (!en[s]) continue;
      const gen = g[s];
      if (r() < 0.0016 * gen.adaptability) {
        const traitPool: (keyof Genome)[] = ['contagion', 'resistance', 'virulence'];
        const t = traitPool[Math.floor(r() * traitPool.length)];
        const dir = r() < 0.6 ? 1 : -1;
        const before = gen[t];
        gen[t] = Math.max(0.05, Math.min(0.99, gen[t] + dir * 0.06));
        if (Math.abs(gen[t] - before) > 0.001) {
          pushEvent(
            `🧬 ${strains[s].name} mutated — ${t} ${dir > 0 ? '↑' : '↓'}`,
          );
        }
      }
    }
  }, [pushEvent, strains]);

  // Render the population to the canvas.
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    if (canvas.width !== W * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // paper backdrop
    ctx.fillStyle = '#f7f6ef';
    ctx.fillRect(0, 0, W, H);

    // blueprint graph-paper grid
    ctx.strokeStyle = 'rgba(36,76,255,0.07)';
    ctx.lineWidth = 1;
    for (let x = 22; x < W; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 22; y < H; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }
    // heavier decade lines
    ctx.strokeStyle = 'rgba(36,76,255,0.16)';
    for (let x = 0; x <= W; x += 110) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 110) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }

    // corner registration crosses
    ctx.strokeStyle = '#244cff';
    ctx.lineWidth = 1.2;
    const reg = (x: number, y: number) => {
      ctx.beginPath();
      ctx.moveTo(x - 6, y);
      ctx.lineTo(x + 6, y);
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x, y + 6);
      ctx.stroke();
    };
    reg(12, 12);
    reg(W - 12, 12);
    reg(12, H - 12);
    reg(W - 12, H - 12);

    const st = state.current;
    const px = posX.current;
    const py = posY.current;
    const n = st.length;

    // susceptible hosts — faint ink ticks (uninfected substrate)
    ctx.fillStyle = 'rgba(87,86,76,0.4)';
    for (let i = 0; i < n; i++) {
      if (st[i] !== SUSCEPTIBLE) continue;
      ctx.fillRect(px[i] - 0.7, py[i] - 0.7, 1.4, 1.4);
    }

    // infected colonies — solid colored-ink dots with a thin ink ring
    for (let i = 0; i < n; i++) {
      const s = st[i];
      if (s === SUSCEPTIBLE) continue;
      const color = strains[s].color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px[i], py[i], 2.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(23,23,15,0.55)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }, [strains]);

  // Animation + simulation loop.
  useEffect(() => {
    build(population);
    seedStrain(-1, 0); // no-op guard; ensures state initialized
    strains.forEach((_, idx) => {
      if (strainOn[idx]) seedStrain(idx, 8);
    });
    draw();

    let raf = 0;
    let acc = 0;
    let last = 0;
    let snapAcc = 0;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (last === 0) last = t;
      const dt = Math.min(100, t - last);
      last = t;

      if (runningRef.current) {
        acc += dt;
        const tickMs = 1000 / speedRef.current;
        let steps = 0;
        while (acc >= tickMs && steps < 6) {
          step();
          acc -= tickMs;
          steps += 1;
        }
      }
      draw();

      snapAcc += dt;
      if (snapAcc >= 160) {
        snapAcc = 0;
        const st = state.current;
        const counts = strains.map(() => 0);
        let susceptible = 0;
        for (let i = 0; i < st.length; i++) {
          const s = st[i];
          if (s === SUSCEPTIBLE) susceptible++;
          else if (s >= 0 && s < counts.length) counts[s]++;
        }
        let dominantIdx = -1;
        let max = 0;
        counts.forEach((c, i) => {
          if (c > max) {
            max = c;
            dominantIdx = i;
          }
        });

        // extinction / domination events
        const prev = prevCounts.current;
        counts.forEach((c, i) => {
          if (prev[i] > 0 && c === 0 && enabled.current[i]) {
            pushEvent(`💀 ${strains[i].name} went extinct`);
          }
          const share = st.length ? c / st.length : 0;
          if (share > 0.55 && !dominatingFlag.current[i]) {
            dominatingFlag.current[i] = true;
            pushEvent(`👑 ${strains[i].name} dominates the population`);
          } else if (share < 0.45) {
            dominatingFlag.current[i] = false;
          }
        });
        prevCounts.current = counts;

        setSnapshot({ counts, susceptible, tick: tickRef.current, dominantIdx });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [population]);

  // keep refs in sync with controls
  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    enabled.current = strainOn;
  }, [strainOn]);

  const total = snapshot.counts.reduce((a, b) => a + b, 0) + snapshot.susceptible;
  const infectedPct = total ? Math.round((1 - snapshot.susceptible / total) * 100) : 0;

  return (
    <div className="border border-line-strong bg-paper">
      {/* figure header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-3 py-2">
        <FigLabel id="FIG. 04" title="Contagion chamber — in-vitro propagation assay" />
        <div className="font-mono-label flex items-center gap-2">
          <button
            onClick={() => setIsRunning((v) => !v)}
            className={`snap border px-3 py-1 text-[11px] uppercase ${
              isRunning
                ? 'border-line-strong bg-ink text-paper'
                : 'border-blue bg-blue text-paper hover:bg-ink hover:border-ink'
            }`}
          >
            {isRunning ? '▮▮ Halt' : '▶ Incubate'}
          </button>
          <button
            onClick={() => reset(true)}
            className="snap border border-line-strong bg-paper px-3 py-1 text-[11px] uppercase text-ink hover:bg-ink hover:text-paper"
          >
            ↺ Re-seed
          </button>
        </div>
      </div>

      {/* readout strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-line px-3 py-1.5 font-mono-label text-[10px] uppercase text-ink-soft">
        <span>
          hosts <span className="text-ink">{total}</span>
        </span>
        <span>
          infected <span className="text-blue">{infectedPct}%</span>
        </span>
        <span>
          cycle <span className="text-ink tabular-nums">{snapshot.tick}</span>
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_19rem]">
        {/* Canvas plate */}
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="Memetic contagion propagation assay"
          />
        </div>

        {/* Side panel */}
        <div className="flex flex-col divide-y divide-line">
          {/* Strain ledger */}
          <div className="p-3">
            <div className="mb-2 font-mono-label text-[10px] uppercase text-ink-faint">
              Tab. A — viable strains / culture share
            </div>
            <div className="flex flex-col gap-2.5">
              {strains.map((strain, idx) => {
                const count = snapshot.counts[idx] ?? 0;
                const share = total ? (count / total) * 100 : 0;
                const on = strainOn[idx];
                return (
                  <div key={strain.id} className={on ? '' : 'opacity-45'}>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() =>
                          setStrainOn((prev) =>
                            prev.map((v, i) => (i === idx ? !v : v)),
                          )
                        }
                        className="flex min-w-0 items-center gap-1.5"
                        title="Toggle strain"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 border border-ink"
                          style={{ backgroundColor: on ? strain.color : 'transparent' }}
                        />
                        <span className="truncate font-serif text-[13px] text-ink">
                          {strain.name}
                        </span>
                      </button>
                      <span className="font-mono-label shrink-0 text-[11px] tabular-nums text-ink-soft">
                        {share.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 border border-line bg-paper-2">
                        <div
                          className="h-full transition-[width] duration-200"
                          style={{
                            width: `${share}%`,
                            backgroundColor: strain.color,
                          }}
                        />
                      </div>
                      <button
                        onClick={() => seedStrain(idx, 6)}
                        disabled={!on}
                        className="snap border border-line px-1.5 py-0.5 font-mono-label text-[9px] uppercase text-ink-soft hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-50"
                        title="Inject this strain"
                      >
                        inject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="p-3">
            <div className="mb-2 font-mono-label text-[10px] uppercase text-ink-faint">
              Apparatus controls
            </div>
            <label className="mb-3 block">
              <span className="font-mono-label mb-1 flex justify-between text-[10px] uppercase text-ink-soft">
                <span>Incubation rate</span>
                <span className="text-ink">{speed}/s</span>
              </span>
              <input
                type="range"
                min={2}
                max={30}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <span className="font-mono-label mb-1 flex justify-between text-[10px] uppercase text-ink-soft">
                <span>Host culture</span>
                <span className="text-ink">{population}</span>
              </span>
              <input
                type="range"
                min={200}
                max={800}
                step={40}
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>

          {/* Field log */}
          <div className="min-h-[104px] flex-1 p-3">
            <div className="mb-2 font-mono-label text-[10px] uppercase text-ink-faint">
              Observation log
            </div>
            {events.length === 0 ? (
              <p className="font-mono-label caret text-[11px] text-ink-soft">
                awaiting first mutation
              </p>
            ) : (
              <ul className="font-mono-label flex flex-col gap-1 text-[11px] text-ink">
                {events.map((e, i) => (
                  <li
                    key={`${e}-${i}`}
                    className="flex gap-1.5"
                    style={{ opacity: 1 - i * 0.1 }}
                  >
                    <span className="text-blue">›</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* caption */}
      <figcaption className="border-t border-line px-3 py-2 font-mono-label text-[10px] leading-relaxed text-ink-soft">
        Each strain propagates, resists, and converts rival colonies per its genome
        (§ derived from the six-dimension classification). Plot shows host minds on a
        22-unit grid; filled markers denote infection. Toggle strains, inject inoculum,
        observe which idea saturates the culture.
      </figcaption>
    </div>
  );
}
