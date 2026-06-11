import { NextResponse } from 'next/server';
import { db } from '@/db';
import { memes } from '@/db/schema';

export async function GET() {
  try {
    const allMemes = await db.select().from(memes);
    return NextResponse.json(allMemes);
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}