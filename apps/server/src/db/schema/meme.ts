import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// TypeScript types for the meme JSON structure
export interface CoreArchitecture {
	centralConcept: string;
	keyNarratives: string;
	invariantElements: string;
	example: string;
}

export interface TransmissionMechanisms {
	primaryVectors: string;
	requiredResources: string;
	easeOfTransmission: string;
	example: string;
}

export interface SelectionDefense {
	environmentalFactors: string;
	defenseMechanisms: string;
	competitiveAdvantages: string;
	example: string;
}

export interface EvolutionPattern {
	commonMutations: string;
	adaptationCapabilities: string;
	stabilityVolatility: string;
	example: string;
}

export interface SocialNetworkEffects {
	feedbackLoops: string;
	groupIdentity: string;
	statusDynamics: string;
	example: string;
}

export interface EmotionalHooks {
	primaryEmotions: string;
	rewardMechanisms: string;
	motivationStructures: string;
	example: string;
}

export interface MemeData {
	title: string;
	description?: string;
	coreArchitecture: CoreArchitecture;
	transmissionMechanisms: TransmissionMechanisms;
	selectionDefense: SelectionDefense;
	evolutionPattern: EvolutionPattern;
	socialNetworkEffects: SocialNetworkEffects;
	emotionalHooks: EmotionalHooks;
}

// Database schema
export const meme = pgTable("meme", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	data: jsonb("data").notNull().$type<MemeData>(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	createdBy: text("created_by"),
});

export type Meme = typeof meme.$inferSelect;
export type NewMeme = typeof meme.$inferInsert;
