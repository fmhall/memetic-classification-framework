import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { 
  memes, 
  coreArchitecture, 
  transmissionMechanisms, 
  selectionDefense, 
  evolutionPattern, 
  socialNetworkEffects, 
  emotionalHooks 
} from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // Get the meme
    const memeResult = await db.select().from(memes).where(eq(memes.id, id));
    
    if (!memeResult || memeResult.length === 0) {
      return NextResponse.json(
        { error: 'Meme not found' },
        { status: 404 }
      );
    }
    
    const meme = memeResult[0];

    // Get all components
    const coreArchResults = await db.select().from(coreArchitecture).where(eq(coreArchitecture.memeId, id));
    const transmissionResults = await db.select().from(transmissionMechanisms).where(eq(transmissionMechanisms.memeId, id));
    const selectionResults = await db.select().from(selectionDefense).where(eq(selectionDefense.memeId, id));
    const evolutionResults = await db.select().from(evolutionPattern).where(eq(evolutionPattern.memeId, id));
    const socialNetworkResults = await db.select().from(socialNetworkEffects).where(eq(socialNetworkEffects.memeId, id));
    const emotionalResults = await db.select().from(emotionalHooks).where(eq(emotionalHooks.memeId, id));
    
    const coreArch = coreArchResults.length > 0 ? coreArchResults[0] : null;
    const transmission = transmissionResults.length > 0 ? transmissionResults[0] : null;
    const selection = selectionResults.length > 0 ? selectionResults[0] : null;
    const evolution = evolutionResults.length > 0 ? evolutionResults[0] : null;
    const socialNetwork = socialNetworkResults.length > 0 ? socialNetworkResults[0] : null;
    const emotional = emotionalResults.length > 0 ? emotionalResults[0] : null;

    // Combine all data
    const completeMeme = {
      ...meme,
      coreArchitecture: coreArch,
      transmissionMechanisms: transmission,
      selectionDefense: selection,
      evolutionPattern: evolution,
      socialNetworkEffects: socialNetwork,
      emotionalHooks: emotional
    };

    return NextResponse.json(completeMeme);
  } catch (error) {
    console.error('Error fetching meme:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meme' },
      { status: 500 }
    );
  }
}