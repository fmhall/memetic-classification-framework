'use client';

import React, { useMemo, useState } from 'react';
import { ROSTER_MAX, type StrainView } from '@/lib/genome';
import ContagionSimulator from './ContagionSimulator';

/**
 * Stages the propagation assay. The chamber can only hold a handful of strains
 * before it becomes illegible, so with a large catalogue the user selects which
 * specimens enter the culture. Changing the roster remounts the simulator with
 * a fresh world (via `key`), so its internal arrays always match the combatants.
 */
export default function AssaySection({
  catalog,
  initialRoster,
}: {
  catalog: StrainView[];
  initialRoster: number[];
}) {
  const [rosterIds, setRosterIds] = useState<number[]>(initialRoster);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState('');

  const byId = useMemo(() => {
    const m = new Map<number, StrainView>();
    catalog.forEach((s) => m.set(s.id, s));
    return m;
  }, [catalog]);

  const roster = rosterIds
    .map((id) => byId.get(id))
    .filter((s): s is StrainView => Boolean(s));

  const full = rosterIds.length >= ROSTER_MAX;

  const toggle = (id: number) =>
    setRosterIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // keep at least one combatant
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= ROSTER_MAX) return prev; // chamber is full
      return [...prev, id];
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.binomial.toLowerCase().includes(q),
    );
  }, [catalog, query]);

  return (
    <div>
      {/* combatant selector */}
      <div className="mb-4 border border-line-strong bg-paper">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-2 px-3 py-1.5">
          <span className="font-mono-label text-[10px] uppercase text-blue">
            Tab. R — culture roster · {rosterIds.length}/{ROSTER_MAX} loaded
          </span>
          <button
            onClick={() => setEditing((v) => !v)}
            className="snap border border-line px-2 py-0.5 font-mono-label text-[10px] uppercase text-ink-soft hover:border-blue hover:text-blue"
          >
            {editing ? 'close' : 'select strains'}
          </button>
        </div>

        {/* selected chips */}
        <div className="flex flex-wrap gap-2 px-3 py-2">
          {roster.map((s) => (
            <span
              key={s.id}
              className="flex items-center gap-1.5 border border-line bg-paper px-1.5 py-0.5"
            >
              <span
                className="h-2.5 w-2.5 border border-ink"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-serif text-[13px] leading-none text-ink">
                {s.name}
              </span>
              <button
                onClick={() => toggle(s.id)}
                disabled={rosterIds.length <= 1}
                className="font-mono-label text-[12px] leading-none text-ink-faint hover:text-blue disabled:opacity-30"
                title="Remove from chamber"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* catalogue picker */}
        {editing && (
          <div className="border-t border-line p-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search the catalogue…"
              className="mb-2 w-full border-b border-line bg-transparent py-0.5 font-serif text-[14px] text-ink placeholder:text-ink-faint focus:border-blue focus:outline-none"
            />
            {full && (
              <p className="mb-2 font-mono-label text-[10px] uppercase text-ink-faint">
                chamber full — remove a strain to load another
              </p>
            )}
            <div className="max-h-64 overflow-auto border border-line">
              {filtered.slice(0, 200).map((s) => {
                const on = rosterIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    disabled={!on && full}
                    className={`flex w-full items-center justify-between gap-2 border-b border-line px-2 py-1 text-left last:border-b-0 ${
                      on ? 'bg-paper-2' : 'hover:bg-paper-2'
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 border border-ink"
                        style={{ backgroundColor: on ? s.color : 'transparent' }}
                      />
                      <span className="truncate font-serif text-[13px] text-ink">
                        {s.name}
                      </span>
                      <span className="font-mono-label hidden shrink-0 text-[10px] italic text-ink-faint sm:inline">
                        {s.binomial}
                      </span>
                    </span>
                    <span className="font-mono-label shrink-0 text-[11px] tabular-nums text-ink-soft">
                      {on ? '✓ loaded' : s.fitness}
                    </span>
                  </button>
                );
              })}
            </div>
            {filtered.length > 200 && (
              <p className="mt-1 font-mono-label text-[10px] uppercase text-ink-faint">
                showing first 200 of {filtered.length} — refine the search
              </p>
            )}
          </div>
        )}
      </div>

      <ContagionSimulator key={rosterIds.join('-')} strains={roster} />
    </div>
  );
}
