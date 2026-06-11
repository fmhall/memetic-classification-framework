import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Field Manual of Memetic Classification",
  description:
    "A technical manual for the classification, culture, and propagation of memes as living organisms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${mono.variable}`}>
        {/* registration / trim bar */}
        <div className="h-1.5 w-full bg-blue" />

        <header className="border-b border-line-strong bg-paper">
          <div className="mx-auto flex max-w-5xl items-stretch justify-between px-5 sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 border-r border-line py-2.5 pr-5"
            >
              <span className="font-mono-label text-[10px] uppercase leading-tight text-ink-soft">
                Doc.
                <br />
                MX-06
              </span>
              <span className="font-serif text-base font-semibold tracking-tight text-ink">
                Field Manual of <span className="italic">Memetic Classification</span>
              </span>
            </Link>
            <nav className="flex items-stretch font-mono-label text-[11px] uppercase">
              <Link
                href="/"
                className="snap flex items-center border-l border-line px-4 text-ink-soft hover:bg-blue hover:text-paper"
              >
                Index
              </Link>
              <a
                href="https://github.com/fmhall/memetic-classification-framework"
                target="_blank"
                className="snap flex items-center border-l border-line px-4 text-ink-soft hover:bg-blue hover:text-paper"
              >
                Source
              </a>
            </nav>
          </div>
        </header>

        {children}

        {/* colophon */}
        <footer className="mt-20 border-t border-line-strong">
          <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 font-mono-label text-[10px] uppercase text-ink-faint">
              <div className="leading-relaxed">
                <div className="text-ink-soft">Field Manual of Memetic Classification</div>
                <div>Revised printing · No. MX-06 · Non-circulating</div>
              </div>
              <div className="text-right leading-relaxed">
                <div>Set in Newsreader &amp; IBM Plex Mono</div>
                <div>© MCMLXXXIV — present · all specimens viable</div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
