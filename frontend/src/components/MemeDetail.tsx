import React from 'react';
import {
  CoreArchitecture,
  TransmissionMechanisms,
  SelectionDefense,
  EvolutionPattern,
  SocialNetworkEffects,
  EmotionalHooks,
} from '@/db/schema';
import {
  TRAITS,
  TRAIT_META,
  getStrain,
  fitnessScore,
  type Trait,
} from '@/lib/genome';
import FitnessRadar from './FitnessRadar';
import { Figure } from './manual';

interface MemeDetailProps {
  meme: {
    id: number;
    name: string;
    description: string;
    coreArchitecture: CoreArchitecture | null;
    transmissionMechanisms: TransmissionMechanisms | null;
    selectionDefense: SelectionDefense | null;
    evolutionPattern: EvolutionPattern | null;
    socialNetworkEffects: SocialNetworkEffects | null;
    emotionalHooks: EmotionalHooks | null;
  };
}

interface SectionProps {
  no: string;
  title: string;
  trait: Trait;
  fields: Array<{ label: string; value: string }>;
  example: string;
}

function Section({ no, title, trait, fields, example }: SectionProps) {
  return (
    <div className="border border-line-strong bg-paper">
      <div className="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-1.5">
        <h3 className="flex items-baseline gap-2">
          <span className="font-mono-label text-[11px] text-blue">{no}</span>
          <span className="font-serif text-base font-semibold text-ink">{title}</span>
        </h3>
        <span className="font-mono-label rounded-none border border-blue px-1.5 py-0.5 text-[9px] uppercase text-blue">
          drives {TRAIT_META[trait].short}
        </span>
      </div>
      <dl className="divide-y divide-line">
        {fields.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[8.5rem_1fr] gap-2 px-3 py-2">
            <dt className="font-mono-label text-[10px] uppercase leading-snug text-ink-soft">
              {label}
            </dt>
            <dd className="font-serif text-[13.5px] leading-snug text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-line bg-paper-2 px-3 py-2">
        <span className="font-mono-label text-[9px] uppercase text-ink-faint">
          Obs. in the wild —
        </span>{' '}
        <span className="font-serif text-[13px] italic leading-snug text-ink-soft">
          {example}
        </span>
      </div>
    </div>
  );
}

function EmptySection({ no, title }: { no: string; title: string }) {
  return (
    <div className="border border-dashed border-line bg-paper">
      <div className="flex items-center gap-2 border-b border-dashed border-line px-3 py-1.5">
        <span className="font-mono-label text-[11px] text-ink-faint">{no}</span>
        <span className="font-serif text-base font-semibold text-ink-soft">{title}</span>
      </div>
      <p className="px-3 py-4 font-mono-label text-[11px] uppercase text-ink-faint">
        — no specimen data on record —
      </p>
    </div>
  );
}

export default function MemeDetail({ meme }: MemeDetailProps) {
  const strain = getStrain(meme.name);
  const fitness = fitnessScore(strain.genome);
  const { color } = strain;

  return (
    <div>
      {/* Datasheet header */}
      <div className="border-2 border-line-strong bg-paper">
        <div className="flex items-center justify-between border-b-2 border-line-strong bg-paper-2 px-4 py-2">
          <span className="font-mono-label text-[11px] uppercase text-blue">
            Specimen datasheet · No. {String(meme.id).padStart(3, '0')}
          </span>
          <span className="font-mono-label text-[10px] uppercase text-ink-faint">
            classification: viable
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
            <p
              className="font-mono-label text-[12px] italic"
              style={{ color }}
            >
              {strain.binomial}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {meme.name}
            </h1>
            <p className="mt-3 max-w-md font-serif text-[15px] leading-relaxed text-ink-soft">
              {meme.description}
            </p>

            <div className="mt-5 flex items-stretch gap-4">
              <div className="border border-line-strong px-3 py-2 text-center">
                <div className="font-mono-label text-3xl font-semibold leading-none text-blue tabular-nums">
                  {fitness}
                </div>
                <div className="font-mono-label mt-1 text-[9px] uppercase text-ink-faint">
                  fitness index
                </div>
              </div>
              <p className="flex max-w-[15rem] items-center font-serif text-[13.5px] italic leading-snug text-ink">
                {strain.tagline}
              </p>
            </div>
          </div>

          {/* radar plate */}
          <div className="flex items-center justify-center p-4">
            <Figure id="FIG. A" title="genome">
              <div className="px-2 py-1">
                <FitnessRadar genome={strain.genome} color={color} size={210} />
              </div>
            </Figure>
          </div>
        </div>

        {/* Genome readout — typeset bars */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 border-t-2 border-line-strong px-4 py-4 sm:grid-cols-3">
          {TRAITS.map((trait) => {
            const v = strain.genome[trait];
            return (
              <div key={trait} title={TRAIT_META[trait].blurb}>
                <div className="font-mono-label flex items-center justify-between text-[10px] uppercase">
                  <span className="text-ink-soft">{TRAIT_META[trait].label}</span>
                  <span className="tabular-nums text-ink">{Math.round(v * 100)}</span>
                </div>
                <div className="mt-1 h-2 border border-line bg-paper-2">
                  <div
                    className="h-full"
                    style={{ width: `${v * 100}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Framework dimensions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {meme.coreArchitecture ? (
          <Section
            no="§I"
            title="Core Architecture"
            trait="emotionalPull"
            fields={[
              { label: 'Central Concept', value: meme.coreArchitecture.centralConcept },
              { label: 'Key Narratives', value: meme.coreArchitecture.keyNarratives },
              { label: 'Invariant Elements', value: meme.coreArchitecture.invariantElements },
            ]}
            example={meme.coreArchitecture.example}
          />
        ) : (
          <EmptySection no="§I" title="Core Architecture" />
        )}

        {meme.transmissionMechanisms ? (
          <Section
            no="§II"
            title="Transmission Mechanisms"
            trait="contagion"
            fields={[
              { label: 'Primary Vectors', value: meme.transmissionMechanisms.primaryVectors },
              { label: 'Required Resources', value: meme.transmissionMechanisms.requiredResources },
              { label: 'Ease of Transmission', value: meme.transmissionMechanisms.easeOfTransmission },
            ]}
            example={meme.transmissionMechanisms.example}
          />
        ) : (
          <EmptySection no="§II" title="Transmission Mechanisms" />
        )}

        {meme.selectionDefense ? (
          <Section
            no="§III"
            title="Selection & Defense"
            trait="resistance"
            fields={[
              { label: 'Environmental Factors', value: meme.selectionDefense.environmentalFactors },
              { label: 'Defense Mechanisms', value: meme.selectionDefense.defenseMechanisms },
              { label: 'Competitive Advantage', value: meme.selectionDefense.competitiveAdvantage },
            ]}
            example={meme.selectionDefense.example}
          />
        ) : (
          <EmptySection no="§III" title="Selection & Defense" />
        )}

        {meme.evolutionPattern ? (
          <Section
            no="§IV"
            title="Evolution Pattern"
            trait="adaptability"
            fields={[
              { label: 'Mutations', value: meme.evolutionPattern.mutations },
              { label: 'Adaptation', value: meme.evolutionPattern.adaptation },
              { label: 'Stability', value: meme.evolutionPattern.stability },
            ]}
            example={meme.evolutionPattern.example}
          />
        ) : (
          <EmptySection no="§IV" title="Evolution Pattern" />
        )}

        {meme.socialNetworkEffects ? (
          <Section
            no="§V"
            title="Social Network Effects"
            trait="network"
            fields={[
              { label: 'Feedback Loops', value: meme.socialNetworkEffects.feedbackLoops },
              { label: 'Group Identity', value: meme.socialNetworkEffects.groupIdentity },
              { label: 'Status Dynamics', value: meme.socialNetworkEffects.statusDynamics },
            ]}
            example={meme.socialNetworkEffects.example}
          />
        ) : (
          <EmptySection no="§V" title="Social Network Effects" />
        )}

        {meme.emotionalHooks ? (
          <Section
            no="§VI"
            title="Emotional Hooks"
            trait="emotionalPull"
            fields={[
              { label: 'Primary Emotions', value: meme.emotionalHooks.primaryEmotions },
              { label: 'Reward Mechanisms', value: meme.emotionalHooks.rewardMechanisms },
              { label: 'Motivation', value: meme.emotionalHooks.motivation },
            ]}
            example={meme.emotionalHooks.example}
          />
        ) : (
          <EmptySection no="§VI" title="Emotional Hooks" />
        )}
      </div>
    </div>
  );
}
