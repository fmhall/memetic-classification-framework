import React from 'react';
import { TRAITS, TRAIT_META, type Genome, withAlpha } from '@/lib/genome';

interface FitnessRadarProps {
  genome: Genome;
  color: string;
  size?: number;
  showLabels?: boolean;
}

const BLUE = '#244cff';

/**
 * A six-axis "fitness diagram" of a meme's genome, drawn as a blueprint plate:
 * blue construction grid, tick marks, and a colored-ink genome polygon. Pure
 * SVG so it renders on the server and stays crisp at any size.
 */
export default function FitnessRadar({
  genome,
  color,
  size = 280,
  showLabels = true,
}: FitnessRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * (showLabels ? 0.3 : 0.42);
  const axes = TRAITS;
  const n = axes.length;

  const angle = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const point = (i: number, r: number) => ({
    x: cx + Math.cos(angle(i)) * r,
    y: cy + Math.sin(angle(i)) * r,
  });

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = axes.map((trait, i) => point(i, radius * genome[trait]));
  const dataPath =
    dataPoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ') + ' Z';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Genome fitness diagram"
    >
      {/* concentric construction rings (blueprint hairlines) */}
      {rings.map((rr, ri) => (
        <polygon
          key={rr}
          points={axes
            .map((_, i) => {
              const p = point(i, radius * rr);
              return `${p.x},${p.y}`;
            })
            .join(' ')}
          fill="none"
          stroke={withAlpha(BLUE, ri === rings.length - 1 ? 0.5 : 0.22)}
          strokeWidth={1}
          strokeDasharray={ri === rings.length - 1 ? undefined : '2 3'}
        />
      ))}

      {/* spokes */}
      {axes.map((_, i) => {
        const p = point(i, radius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={withAlpha(BLUE, 0.28)}
            strokeWidth={1}
          />
        );
      })}

      {/* center crosshair */}
      <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={BLUE} strokeWidth={1} />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={BLUE} strokeWidth={1} />

      {/* the genome polygon — colored ink */}
      <path
        d={dataPath}
        fill={withAlpha(color, 0.16)}
        stroke={color}
        strokeWidth={1.75}
        strokeLinejoin="miter"
      />
      {dataPoints.map((p, i) => (
        <rect
          key={i}
          x={p.x - 2}
          y={p.y - 2}
          width={4}
          height={4}
          fill={color}
        />
      ))}

      {/* axis labels */}
      {showLabels &&
        axes.map((trait, i) => {
          const p = point(i, radius + 16);
          const a = angle(i);
          const anchor =
            Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
          return (
            <text
              key={trait}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={9.5}
              letterSpacing={0.5}
              fontFamily="var(--font-mono), monospace"
              fill="#57564c"
            >
              {TRAIT_META[trait].short}
            </text>
          );
        })}
    </svg>
  );
}
