import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'Serp-Scale-AI - Modern SEO & Content Scaling Platform',
  description: 'Advanced AI-powered platform for scaling SEO content and search engine optimization.',
  keywords: ['SEO', 'AI', 'Content Scaling', 'Search Engine Optimization', 'SERP'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}