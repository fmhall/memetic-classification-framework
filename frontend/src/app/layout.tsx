import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memetic Classification Framework",
  description: "Explore memes classified using the six-component framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-indigo-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <a href="/" className="text-xl font-bold">Memetic Classification Framework</a>
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="/" className="hover:text-indigo-200">Home</a></li>
                  <li><a href="https://github.com/fmhall/memetic-classification-framework" target="_blank" className="hover:text-indigo-200">GitHub</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p>© {new Date().getFullYear()} Memetic Classification Framework</p>
              <p className="mt-2 text-gray-400 text-sm">
                A framework for understanding how memes spread and evolve
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
