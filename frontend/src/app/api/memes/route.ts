import { NextResponse } from 'next/server';
import { getAllMemes } from '@/db/queries';

export async function GET() {
  try {
    const allMemes = await getAllMemes();
    return NextResponse.json(allMemes);
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}
