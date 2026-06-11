import React from 'react';
import {
  CoreArchitecture,
  TransmissionMechanisms,
  SelectionDefense,
  EvolutionPattern,
  SocialNetworkEffects,
  EmotionalHooks,
} from '@/db/schema';

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
  title: string;
  fields: Array<{ label: string; value: string }>;
  example: string;
}

function Section({ title, fields, example }: SectionProps) {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      {fields.map(({ label, value }) => (
        <div key={label} className="mb-3">
          <span className="font-semibold text-gray-700">{label}: </span>
          <span className="text-gray-600">{value}</span>
        </div>
      ))}
      <div className="mt-4 bg-gray-50 rounded-md p-3">
        <span className="font-semibold text-gray-700 text-sm">Example: </span>
        <span className="text-sm text-gray-600 italic">{example}</span>
      </div>
    </div>
  );
}

function EmptySection({ title }: { title: string }) {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 italic">No data available</p>
    </div>
  );
}

export default function MemeDetail({ meme }: MemeDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{meme.name}</h1>
        <p className="text-xl text-gray-600">{meme.description}</p>
      </div>

      {meme.coreArchitecture ? (
        <Section
          title="Core Architecture"
          fields={[
            { label: 'Central Concept', value: meme.coreArchitecture.centralConcept },
            { label: 'Key Narratives', value: meme.coreArchitecture.keyNarratives },
            { label: 'Invariant Elements', value: meme.coreArchitecture.invariantElements },
          ]}
          example={meme.coreArchitecture.example}
        />
      ) : (
        <EmptySection title="Core Architecture" />
      )}

      {meme.transmissionMechanisms ? (
        <Section
          title="Transmission Mechanisms"
          fields={[
            { label: 'Primary Vectors', value: meme.transmissionMechanisms.primaryVectors },
            { label: 'Required Resources', value: meme.transmissionMechanisms.requiredResources },
            { label: 'Ease of Transmission', value: meme.transmissionMechanisms.easeOfTransmission },
          ]}
          example={meme.transmissionMechanisms.example}
        />
      ) : (
        <EmptySection title="Transmission Mechanisms" />
      )}

      {meme.selectionDefense ? (
        <Section
          title="Selection & Defense"
          fields={[
            { label: 'Environmental Factors', value: meme.selectionDefense.environmentalFactors },
            { label: 'Defense Mechanisms', value: meme.selectionDefense.defenseMechanisms },
            { label: 'Competitive Advantage', value: meme.selectionDefense.competitiveAdvantage },
          ]}
          example={meme.selectionDefense.example}
        />
      ) : (
        <EmptySection title="Selection & Defense" />
      )}

      {meme.evolutionPattern ? (
        <Section
          title="Evolution Pattern"
          fields={[
            { label: 'Mutations', value: meme.evolutionPattern.mutations },
            { label: 'Adaptation', value: meme.evolutionPattern.adaptation },
            { label: 'Stability', value: meme.evolutionPattern.stability },
          ]}
          example={meme.evolutionPattern.example}
        />
      ) : (
        <EmptySection title="Evolution Pattern" />
      )}

      {meme.socialNetworkEffects ? (
        <Section
          title="Social Network Effects"
          fields={[
            { label: 'Feedback Loops', value: meme.socialNetworkEffects.feedbackLoops },
            { label: 'Group Identity', value: meme.socialNetworkEffects.groupIdentity },
            { label: 'Status Dynamics', value: meme.socialNetworkEffects.statusDynamics },
          ]}
          example={meme.socialNetworkEffects.example}
        />
      ) : (
        <EmptySection title="Social Network Effects" />
      )}

      {meme.emotionalHooks ? (
        <Section
          title="Emotional Hooks"
          fields={[
            { label: 'Primary Emotions', value: meme.emotionalHooks.primaryEmotions },
            { label: 'Reward Mechanisms', value: meme.emotionalHooks.rewardMechanisms },
            { label: 'Motivation', value: meme.emotionalHooks.motivation },
          ]}
          example={meme.emotionalHooks.example}
        />
      ) : (
        <EmptySection title="Emotional Hooks" />
      )}
    </div>
  );
}
