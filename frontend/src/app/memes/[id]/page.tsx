import React from 'react';
import Link from 'next/link';
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
import MemeDetail from '@/components/MemeDetail';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MemePage({ params }: PageProps) {
  // Convert the id parameter to a number
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    notFound();
  }

  // Get the meme
  const memeResult = await db.select().from(memes).where(eq(memes.id, id));
  
  if (!memeResult || memeResult.length === 0) {
    notFound();
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to all memes
          </Link>
        </div>
        
        <MemeDetail meme={completeMeme} />
      </div>
    </div>
  );
}