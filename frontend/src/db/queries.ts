import { eq } from 'drizzle-orm';
import { db } from './index';
import {
  memes, coreArchitecture, transmissionMechanisms, selectionDefense,
  evolutionPattern, socialNetworkEffects, emotionalHooks,
  type Meme, type CompleteMeme,
} from './schema';

export async function getAllMemes(): Promise<Meme[]> {
  return db.select().from(memes);
}

export async function getCompleteMeme(id: number): Promise<CompleteMeme | null> {
  const memeResult = await db.select().from(memes).where(eq(memes.id, id));
  if (memeResult.length === 0) return null;

  const [coreArch, transmission, selection, evolution, socialNetwork, emotional] =
    await Promise.all([
      db.select().from(coreArchitecture).where(eq(coreArchitecture.memeId, id)),
      db.select().from(transmissionMechanisms).where(eq(transmissionMechanisms.memeId, id)),
      db.select().from(selectionDefense).where(eq(selectionDefense.memeId, id)),
      db.select().from(evolutionPattern).where(eq(evolutionPattern.memeId, id)),
      db.select().from(socialNetworkEffects).where(eq(socialNetworkEffects.memeId, id)),
      db.select().from(emotionalHooks).where(eq(emotionalHooks.memeId, id)),
    ]);

  return {
    ...memeResult[0],
    coreArchitecture: coreArch[0] ?? null,
    transmissionMechanisms: transmission[0] ?? null,
    selectionDefense: selection[0] ?? null,
    evolutionPattern: evolution[0] ?? null,
    socialNetworkEffects: socialNetwork[0] ?? null,
    emotionalHooks: emotional[0] ?? null,
  };
}
