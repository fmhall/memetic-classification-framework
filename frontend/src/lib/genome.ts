/**
 * The Memetic Genome.
 *
 * Every meme in the framework is described qualitatively across six dimensions.
 * To make memes *behave* — to let them spread, compete, and evolve in the
 * Contagion Simulator — we distil those six dimensions into a numeric genome:
 * six traits in the range [0, 1] that map onto the dynamics of an epidemic.
 *
 * The genome is the bridge between the classification framework and a living
 * simulation. Each trait is sourced from one framework dimension:
 *
 *   contagion      ← Transmission Mechanisms  (how easily it jumps minds)
 *   resistance     ← Selection & Defense      (how well it holds a host)
 *   virulence      ← Selection & Defense      (how aggressively it converts rivals)
 *   adaptability   ← Evolution Pattern        (mutation rate / resilience)
 *   network        ← Social Network Effects   (gains strength in crowds)
 *   emotionalPull  ← Emotional Hooks          (base stickiness)
 *
 * Genomes are authored by hand from the framework text. Memes without an
 * explicit genome fall back to a deterministic profile derived from their name,
 * so the simulator never breaks when the catalog grows.
 */

export const TRAITS = [
  'contagion',
  'resistance',
  'virulence',
  'adaptability',
  'network',
  'emotionalPull',
] as const;

export type Trait = (typeof TRAITS)[number];

export type Genome = Record<Trait, number>;

export interface Strain {
  /** Numeric traits driving the simulation. */
  genome: Genome;
  /** Vivid display colour (hex) used across the lab. */
  color: string;
  /** A short Linnaean-style binomial, because memes deserve species names. */
  binomial: string;
  /** One-line behavioural summary. */
  tagline: string;
}

export const TRAIT_META: Record<
  Trait,
  { label: string; short: string; dimension: string; blurb: string }
> = {
  contagion: {
    label: 'Contagion',
    short: 'CON',
    dimension: 'Transmission Mechanisms',
    blurb: 'How readily the meme leaps from one mind to the next.',
  },
  resistance: {
    label: 'Resistance',
    short: 'RES',
    dimension: 'Selection & Defense',
    blurb: 'How stubbornly an infected host clings to the meme.',
  },
  virulence: {
    label: 'Virulence',
    short: 'VIR',
    dimension: 'Selection & Defense',
    blurb: 'How aggressively it overwrites rival memes already in a host.',
  },
  adaptability: {
    label: 'Adaptability',
    short: 'ADP',
    dimension: 'Evolution Pattern',
    blurb: 'How often it mutates to dodge resistance and exploit new niches.',
  },
  network: {
    label: 'Network Gain',
    short: 'NET',
    dimension: 'Social Network Effects',
    blurb: 'Extra spreading power when surrounded by fellow believers.',
  },
  emotionalPull: {
    label: 'Emotional Pull',
    short: 'EMO',
    dimension: 'Emotional Hooks',
    blurb: 'The baseline gravitational tug on an undecided mind.',
  },
};

/** Hand-authored genomes, keyed by lowercased meme name. */
const STRAINS: Record<string, Strain> = {
  'missionary religions': {
    color: '#b45309',
    binomial: 'Fides evangelica',
    tagline: 'Patient, organized, and built to outlast empires.',
    genome: {
      contagion: 0.55,
      resistance: 0.92,
      virulence: 0.7,
      adaptability: 0.45,
      network: 0.8,
      emotionalPull: 0.88,
    },
  },
  'capitalism and free markets': {
    color: '#15803d',
    binomial: 'Mercatus liber',
    tagline: 'Absorbs everything, rewards its own spread, never sleeps.',
    genome: {
      contagion: 0.82,
      resistance: 0.78,
      virulence: 0.85,
      adaptability: 0.7,
      network: 0.95,
      emotionalPull: 0.5,
    },
  },
  'techno-optimism': {
    color: '#0d9488',
    binomial: 'Progressus perpetuus',
    tagline: 'Explosively contagious in a boom, fragile in a bust.',
    genome: {
      contagion: 0.9,
      resistance: 0.55,
      virulence: 0.6,
      adaptability: 0.92,
      network: 0.72,
      emotionalPull: 0.78,
    },
  },
  'strange loops': {
    color: '#6d28d9',
    binomial: 'Recursio mirabilis',
    tagline: 'Hard to catch, impossible to shake once it takes hold.',
    genome: {
      contagion: 0.32,
      resistance: 0.96,
      virulence: 0.4,
      adaptability: 0.6,
      network: 0.35,
      emotionalPull: 0.82,
    },
  },
};

/** A small, stable palette for memes that arrive without an authored strain. */
const FALLBACK_COLORS = [
  '#ef4444',
  '#3b82f6',
  '#ec4899',
  '#84cc16',
  '#f97316',
  '#14b8a6',
];

/** Deterministic pseudo-random in [0,1] from a string + salt. */
function hash01(input: string, salt: number): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // xorshift mix
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return ((h >>> 0) % 100000) / 100000;
}

function fallbackStrain(name: string): Strain {
  const genome = {} as Genome;
  TRAITS.forEach((trait, i) => {
    // Bias toward the middle of the range so unknown memes feel "average".
    genome[trait] = 0.3 + hash01(name, i + 1) * 0.5;
  });
  const colorIdx = Math.floor(hash01(name, 99) * FALLBACK_COLORS.length);
  return {
    genome,
    color: FALLBACK_COLORS[colorIdx],
    binomial: 'Species incognita',
    tagline: 'An uncatalogued strain — traits estimated from first principles.',
  };
}

export function getStrain(name: string): Strain {
  return STRAINS[name.trim().toLowerCase()] ?? fallbackStrain(name);
}

/** True when a meme has a hand-authored genome (vs. a name-derived fallback). */
export function hasAuthoredStrain(name: string): boolean {
  return name.trim().toLowerCase() in STRAINS;
}

/**
 * Memetic Fitness Score — a single 0–100 number capturing how strong a strain
 * is overall. It is the geometric-ish blend of the traits that matter most for
 * persistence (resistance, emotional pull) and reach (contagion, network),
 * tempered by the fact that pure virulence burns out its own hosts.
 */
export function fitnessScore(genome: Genome): number {
  const reach = 0.5 * genome.contagion + 0.5 * genome.network;
  const grip = 0.6 * genome.resistance + 0.4 * genome.emotionalPull;
  const evolvability = genome.adaptability;
  // Virulence helps in competition but is self-limiting past a point.
  const aggression = genome.virulence * (1 - 0.4 * genome.virulence);
  const raw =
    0.32 * reach + 0.34 * grip + 0.18 * evolvability + 0.16 * (aggression + 0.2);
  return Math.round(Math.min(1, raw) * 100);
}

export interface StrainView extends Strain {
  id: number;
  name: string;
  fitness: number;
}

export function toStrainView(meme: { id: number; name: string }): StrainView {
  const strain = getStrain(meme.name);
  return {
    ...strain,
    id: meme.id,
    name: meme.name,
    fitness: fitnessScore(strain.genome),
  };
}

/** Default number of strains cultured together in the assay. */
export const ROSTER_MAX = 6;

/**
 * Choose a bounded, legible roster of strains for the assay from a catalog of
 * any size. Authored strains lead (they carry real, distinct genomes), then the
 * fittest fall-back strains fill any remaining slots. This keeps the chamber
 * meaningful whether the catalog holds four specimens or four hundred.
 */
export function defaultRoster(strains: StrainView[], max = ROSTER_MAX): StrainView[] {
  const authored = strains.filter((s) => hasAuthoredStrain(s.name));
  const rest = strains
    .filter((s) => !hasAuthoredStrain(s.name))
    .sort((a, b) => b.fitness - a.fitness);
  return [...authored, ...rest].slice(0, max);
}

/** Translate a hex colour to an rgba() string at the given alpha. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
