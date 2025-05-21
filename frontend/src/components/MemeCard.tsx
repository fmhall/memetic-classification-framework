import React from 'react';
import Link from 'next/link';
import { Meme } from '@/db/schema';

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  return (
    <Link href={`/memes/${meme.id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:border-indigo-200 hover:translate-y-[-2px]">
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{meme.name}</h2>
          <p className="text-gray-600 flex-grow mb-4">{meme.description}</p>
          <div className="mt-auto">
            <span className="inline-flex items-center text-sm font-medium text-indigo-600 group">
              View Details
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}