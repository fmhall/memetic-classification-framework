import React from 'react';
import { db } from '@/db';
import { memes } from '@/db/schema';
import MemeCard from '@/components/MemeCard';

export default async function Home() {
  const allMemes = await db.select().from(memes);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Memetic Classification Framework
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Explore memes classified using the six-component framework for understanding memetic spread and evolution.
          </p>
          <div className="mt-8 flex justify-center">
            <a 
              href="https://github.com/fmhall/memetic-classification-framework" 
              target="_blank"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Learn More About The Framework
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </div>
    </main>
  );
}
