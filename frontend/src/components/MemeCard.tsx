import React from 'react';
import Link from 'next/link';
import { type StrainView } from '@/lib/genome';
import FitnessRadar from './FitnessRadar';

interface MemeCardProps {
  strain: StrainView;
}

export default function MemeCard({ strain }: MemeCardProps) {
  const plateNo = `PL. ${String(strain.id).padStart(3, '0')}`;
  return (
    <Link href={`/memes/${strain.id}`} className="group block">
      <figure className="snap flex h-full flex-col border border-line-strong bg-paper hover:border-blue">
        {/* plate header */}
        <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
          <span className="font-mono-label text-[10px] uppercase text-blue">
            {plateNo}
          </span>
          <span className="font-mono-label text-[10px] uppercase text-ink-faint">
            specimen
          </span>
        </div>

        {/* diagram */}
        <div className="relative flex items-center justify-center bg-paper py-3">
          <div
            className="absolute left-3 top-3 h-2.5 w-2.5 border border-ink"
            style={{ backgroundColor: strain.color }}
          />
          <FitnessRadar
            genome={strain.genome}
            color={strain.color}
            size={168}
            showLabels={false}
          />
        </div>

        {/* identification block */}
        <figcaption className="flex flex-1 flex-col border-t border-line px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-serif text-lg font-semibold leading-tight text-ink">
                {strain.name}
              </h3>
              <p
                className="font-mono-label text-[10px] italic"
                style={{ color: strain.color }}
              >
                {strain.binomial}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-mono-label text-xl font-semibold leading-none text-blue tabular-nums">
                {strain.fitness}
              </div>
              <div className="font-mono-label text-[8px] uppercase text-ink-faint">
                fitness
              </div>
            </div>
          </div>

          <p className="mt-2 font-serif text-[13px] leading-snug text-ink-soft">
            {strain.tagline}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-dotted border-line pt-2 font-mono-label text-[10px] uppercase">
            <span className="text-ink-faint">datasheet</span>
            <span className="snap inline-flex items-center gap-1 text-ink-soft group-hover:text-blue">
              examine
              <span className="group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
