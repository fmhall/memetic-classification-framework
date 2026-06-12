import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://memetic-classification-framework.vercel.app";
const SOCIAL_TITLE =
  "A Field Manual for the Classification & Culture of Living Memes";
const SOCIAL_DESCRIPTION =
  "An in-vitro assay of cultural strains — six-trait genomes, fitness scores, and propagation under glass.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Field Manual of Memetic Classification",
  description:
    "A technical manual for the classification, culture, and propagation of memes as living organisms.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6ef",
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
