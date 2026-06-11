import React from 'react';
import { getAllMemes } from '@/db/queries';
import { toStrainView, defaultRoster } from '@/lib/genome';
import SpecimenCatalog from '@/components/SpecimenCatalog';
import AssaySection from '@/components/AssaySection';
import { SectionHead } from '@/components/manual';

export default async function Home() {
  const allMemes = await getAllMemes();
  const strains = allMemes.map(toStrainView);
  const roster = defaultRoster(strains);

  return (
    <main className="mx-auto max-w-5xl px-5 pb-8 sm:px-8">
      {/* Masthead — title block of a technical manual */}
      <section className="grid gap-6 border-b-2 border-line-strong py-10 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10">
        <div>
          <p className="font-mono-label mb-3 text-[11px] uppercase text-blue">
            Part I · §0 — Frontispiece &amp; scope
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            A Field Manual for the
            <br />
            Classification &amp; Culture
            <br />
            of <span className="italic text-blue">Living Memes</span>
          </h1>
          <p className="mt-5 max-w-xl font-serif text-[15px] leading-relaxed text-ink-soft">
            A meme is a unit of cultural transmission — a self-replicating idea that
            survives by its fitness to spread through human minds. This manual catalogues
            specimens across six diagnostic dimensions, renders each into a numeric genome,
            and propagates them under glass to observe which ideas saturate a population.
          </p>
        </div>

        {/* spec block */}
        <dl className="font-mono-label min-w-[12rem] border border-line-strong text-[10px] uppercase">
          {[
            ['Document', 'MX-06'],
            ['Specimens', `${strains.length} catalogued`],
            ['Dimensions', '6 diagnostic'],
            ['Method', 'In-vitro assay'],
            ['Status', 'All viable'],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`flex justify-between gap-4 px-2.5 py-1.5 ${
                i === 0 ? '' : 'border-t border-line'
              }`}
            >
              <dt className="text-ink-faint">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Editorial preamble with drop cap */}
      <section className="grid gap-8 border-b border-line py-8 sm:grid-cols-2">
        <p className="dropcap font-serif text-[15px] leading-relaxed text-ink">
          Memes live and die by evolutionary fitness. They compete for the scarcest
          resources — attention and conviction — and, like organisms, they mutate, defend
          themselves against criticism, and absorb beneficial traits from rivals. Each
          specimen in the catalogue below is rendered into a six-trait genome; a handful
          can then be loaded into the propagation assay (§2) and set loose in a shared
          culture of host minds to see which idea saturates the population.
        </p>
        <div className="font-mono-label flex flex-col justify-center gap-2 border-l border-line pl-6 text-[11px] uppercase text-ink-soft">
          <div className="text-blue">Diagnostic dimensions —</div>
          {[
            'I. Core architecture',
            'II. Transmission mechanisms',
            'III. Selection &amp; defense',
            'IV. Evolution pattern',
            'V. Social-network effects',
            'VI. Emotional hooks',
          ].map((d, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              <span dangerouslySetInnerHTML={{ __html: d }} />
            </div>
          ))}
        </div>
      </section>

      {/* §1 — Specimen catalogue · the centerpiece */}
      <section className="py-8">
        <SectionHead
          no="§1"
          title="Specimen Catalogue"
          right={`${strains.length} catalogued`}
        />
        <SpecimenCatalog strains={strains} />
      </section>

      {/* §2 — Propagation assay */}
      <section className="py-8">
        <SectionHead
          no="§2"
          title="The Propagation Assay"
          right="live · interactive"
        />
        <AssaySection catalog={strains} initialRoster={roster.map((s) => s.id)} />
      </section>
    </main>
  );
}
