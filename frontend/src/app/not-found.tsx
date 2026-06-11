import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <div className="border-2 border-line-strong bg-paper">
        <div className="flex items-center justify-between border-b-2 border-line-strong bg-paper-2 px-4 py-2">
          <span className="font-mono-label text-[11px] uppercase text-blue">
            Errata · specimen not located
          </span>
          <span className="font-mono-label text-[10px] uppercase text-ink-faint">
            err. 404
          </span>
        </div>
        <div className="p-6">
          <p className="font-mono-label text-[64px] font-semibold leading-none text-blue">
            404
          </p>
          <h1 className="mt-3 font-serif text-2xl font-semibold text-ink">
            No such culture in the collection.
          </h1>
          <p className="mt-2 max-w-md font-serif text-[14px] leading-relaxed text-ink-soft">
            This meme never took hold in the population — no host in the archive carries
            it, and the referenced plate could not be retrieved.
          </p>
          <Link
            href="/"
            className="font-mono-label snap mt-6 inline-block border border-blue bg-blue px-4 py-2 text-[11px] uppercase text-paper hover:bg-ink hover:border-ink"
          >
            ← Return to index
          </Link>
        </div>
      </div>
    </div>
  );
}
