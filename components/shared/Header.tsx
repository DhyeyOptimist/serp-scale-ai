'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">
            Serp-Scale-AI
          </h1>
        </Link>
      </div>
    </header>
  );
}