import { NextRequest, NextResponse } from 'next/server';
import { getCompleteMeme } from '@/db/queries';

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

    const completeMeme = await getCompleteMeme(id);

    if (!completeMeme) {
      return NextResponse.json(
        { error: 'Meme not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(completeMeme);
  } catch (error) {
    console.error('Error fetching meme:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meme' },
      { status: 500 }
    );
  }
}
