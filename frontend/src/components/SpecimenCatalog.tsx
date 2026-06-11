'use client';

import React, { useMemo, useState } from 'react';
import { type StrainView } from '@/lib/genome';
import MemeCard from './MemeCard';

/**
 * The specimen catalogue — built to stay navigable from four specimens to four
 * hundred. Filters by name/binomial, re-orders on demand, and reveals plates in
 * pages so we never paint hundreds of radar diagrams at once.
 */

type SortKey = 'catalog' | 'fitness' | 'name';

const PAGE = 24;

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'catalog', label: 'No.' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'name', label: 'A–Z' },
];

export default function SpecimenCatalog({ strains }: { strains: StrainView[] }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('catalog');
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? strains.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.binomial.toLowerCase().includes(q),
        )
      : strains.slice();
    if (sort === 'fitness') list.sort((a, b) => b.fitness - a.fitness);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => a.id - b.id);
    return list;
  }, [strains, query, sort]);

  // Paging resets to the first page whenever the result set changes shape
  // (see the search/order handlers below), so we never strand the reader deep
  // in a list that just shrank under them.
  const search = (q: string) => {
    setQuery(q);
    setVisible(PAGE);
  };
  const order = (k: SortKey) => {
    setSort(k);
    setVisible(PAGE);
  };

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  return (
    <div>
      {/* control strip */}
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 border border-line-strong bg-paper px-3 py-2">
        <label className="flex min-w-[12rem] flex-1 items-center gap-2">
          <span className="font-mono-label text-[10px] uppercase text-ink-faint">
            Find
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="name or binomial…"
            className="w-full border-b border-line bg-transparent py-0.5 font-serif text-[14px] text-ink placeholder:text-ink-faint focus:border-blue focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-2">
          <span className="font-mono-label text-[10px] uppercase text-ink-faint">
            Order
          </span>
          {SORTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => order(key)}
              className={`snap border px-2 py-0.5 font-mono-label text-[10px] uppercase ${
                sort === key
                  ? 'border-blue bg-blue text-paper'
                  : 'border-line text-ink-soft hover:border-blue hover:text-blue'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="font-mono-label text-[10px] uppercase tabular-nums text-ink-faint">
          {filtered.length} / {strains.length} on file
        </span>
      </div>

      {shown.length === 0 ? (
        <div className="border border-dashed border-line bg-paper px-4 py-12 text-center font-mono-label text-[11px] uppercase text-ink-faint">
          — no specimen matches the query —
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((strain) => (
            <MemeCard key={strain.id} strain={strain} />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE)}
            className="snap border border-line-strong bg-paper px-5 py-2 font-mono-label text-[11px] uppercase text-ink hover:bg-ink hover:text-paper"
          >
            Reveal {Math.min(PAGE, remaining)} more — {remaining} held back
          </button>
        </div>
      )}
    </div>
  );
}
