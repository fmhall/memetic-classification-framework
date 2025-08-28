import type { RouterClient } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db, meme } from "@/db";
import { protectedProcedure, publicProcedure } from "../lib/orpc";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	// Get all memes (most recent first)
	getMemes: publicProcedure.handler(async () => {
		const memes = await db.query.meme.findMany({
			orderBy: [desc(meme.createdAt)],
		});
		return memes;
	}),
	// Get a single meme by ID
	getMeme: publicProcedure
		.input(z.object({ id: z.number() }))
		.handler(async ({ input }) => {
			const foundMeme = await db.query.meme.findFirst({
				where: eq(meme.id, input.id),
			});
			if (!foundMeme) {
				throw new Error("Meme not found");
			}
			return foundMeme;
		}),
	// Create a new meme
	createMeme: publicProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string().optional(),
				data: z.object({
					title: z.string(),
					description: z.string().optional(),
					coreArchitecture: z.object({
						centralConcept: z.string(),
						keyNarratives: z.string(),
						invariantElements: z.string(),
						example: z.string(),
					}),
					transmissionMechanisms: z.object({
						primaryVectors: z.string(),
						requiredResources: z.string(),
						easeOfTransmission: z.string(),
						example: z.string(),
					}),
					selectionDefense: z.object({
						environmentalFactors: z.string(),
						defenseMechanisms: z.string(),
						competitiveAdvantages: z.string(),
						example: z.string(),
					}),
					evolutionPattern: z.object({
						commonMutations: z.string(),
						adaptationCapabilities: z.string(),
						stabilityVolatility: z.string(),
						example: z.string(),
					}),
					socialNetworkEffects: z.object({
						feedbackLoops: z.string(),
						groupIdentity: z.string(),
						statusDynamics: z.string(),
						example: z.string(),
					}),
					emotionalHooks: z.object({
						primaryEmotions: z.string(),
						rewardMechanisms: z.string(),
						motivationStructures: z.string(),
						example: z.string(),
					}),
				}),
			}),
		)
		.handler(async ({ input }) => {
			const [newMeme] = await db
				.insert(meme)
				.values({
					title: input.title,
					description: input.description,
					data: input.data,
				})
				.returning();
			return newMeme;
		}),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
