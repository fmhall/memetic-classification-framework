import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const memes = sqliteTable('memes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const coreArchitecture = sqliteTable('core_architecture', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  centralConcept: text('central_concept').notNull(),
  keyNarratives: text('key_narratives').notNull(),
  invariantElements: text('invariant_elements').notNull(),
  example: text('example').notNull(),
});

export const transmissionMechanisms = sqliteTable('transmission_mechanisms', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  primaryVectors: text('primary_vectors').notNull(),
  requiredResources: text('required_resources').notNull(),
  easeOfTransmission: text('ease_of_transmission').notNull(),
  example: text('example').notNull(),
});

export const selectionDefense = sqliteTable('selection_defense', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  environmentalFactors: text('environmental_factors').notNull(),
  defenseMechanisms: text('defense_mechanisms').notNull(),
  competitiveAdvantage: text('competitive_advantage').notNull(),
  example: text('example').notNull(),
});

export const evolutionPattern = sqliteTable('evolution_pattern', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  mutations: text('mutations').notNull(),
  adaptation: text('adaptation').notNull(),
  stability: text('stability').notNull(),
  example: text('example').notNull(),
});

export const socialNetworkEffects = sqliteTable('social_network_effects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  feedbackLoops: text('feedback_loops').notNull(),
  groupIdentity: text('group_identity').notNull(),
  statusDynamics: text('status_dynamics').notNull(),
  example: text('example').notNull(),
});

export const emotionalHooks = sqliteTable('emotional_hooks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memeId: integer('meme_id').notNull().references(() => memes.id),
  primaryEmotions: text('primary_emotions').notNull(),
  rewardMechanisms: text('reward_mechanisms').notNull(),
  motivation: text('motivation').notNull(),
  example: text('example').notNull(),
});

// Types for our data
export type Meme = typeof memes.$inferSelect;
export type CoreArchitecture = typeof coreArchitecture.$inferSelect;
export type TransmissionMechanisms = typeof transmissionMechanisms.$inferSelect;
export type SelectionDefense = typeof selectionDefense.$inferSelect;
export type EvolutionPattern = typeof evolutionPattern.$inferSelect;
export type SocialNetworkEffects = typeof socialNetworkEffects.$inferSelect;
export type EmotionalHooks = typeof emotionalHooks.$inferSelect;

// Complete meme type with all components
export type CompleteMeme = Meme & {
  coreArchitecture: CoreArchitecture | null;
  transmissionMechanisms: TransmissionMechanisms | null;
  selectionDefense: SelectionDefense | null;
  evolutionPattern: EvolutionPattern | null;
  socialNetworkEffects: SocialNetworkEffects | null;
  emotionalHooks: EmotionalHooks | null;
};