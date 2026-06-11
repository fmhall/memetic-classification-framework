import React from 'react';
import Link from 'next/link';
import { getCompleteMeme } from '@/db/queries';
import MemeDetail from '@/components/MemeDetail';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MemePage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    notFound();
  }

  const completeMeme = await getCompleteMeme(id);
  if (!completeMeme) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <div className="mb-5">
        <Link
          href="/"
          className="font-mono-label snap inline-flex items-center gap-1.5 border border-line px-2.5 py-1 text-[10px] uppercase text-ink-soft hover:border-blue hover:text-blue"
        >
          ← Return to index
        </Link>
      </div>

      <MemeDetail meme={completeMeme} />
    </div>
  );
}
