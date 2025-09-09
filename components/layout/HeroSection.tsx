'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced CSS animation entrance
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-in');
      
      elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = '0';
        htmlElement.style.transform = 'translateY(40px)';
        htmlElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
          htmlElement.style.opacity = '1';
          htmlElement.style.transform = 'translateY(0)';
        }, index * 200 + 300);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">      
      {/* Dynamic Aurora Background - Enhanced Visibility */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Primary Aurora Blob */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 animate-aurora-blob"
          style={{
            background: 'radial-gradient(circle, rgba(105, 82, 235, 0.8) 0%, rgba(179, 255, 59, 0.6) 50%, transparent 70%)',
            filter: 'blur(80px)',
            mixBlendMode: 'multiply',
            animation: 'blobAnimate 15s ease-in-out infinite alternate',
          }}
        />
        
        {/* Secondary Aurora Blob */}
        <div 
          className="absolute top-1/3 right-1/4 w-80 h-80 animate-aurora-blob-2"
          style={{
            background: 'radial-gradient(circle, rgba(179, 255, 59, 0.8) 0%, rgba(105, 82, 235, 0.6) 50%, transparent 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'multiply',
            animation: 'blobAnimate2 18s ease-in-out infinite alternate-reverse',
          }}
        />
        
        {/* Tertiary Aurora Blob */}
        <div 
          className="absolute bottom-1/4 left-1/3 w-72 h-72 animate-aurora-blob-3"
          style={{
            background: 'radial-gradient(circle, rgba(105, 82, 235, 0.7) 20%, rgba(179, 255, 59, 0.8) 60%, transparent 80%)',
            filter: 'blur(70px)',
            mixBlendMode: 'multiply',
            animation: 'blobAnimate3 22s ease-in-out infinite alternate',
          }}
        />
        
        {/* Additional subtle overlay for better visibility */}
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 animate-aurora-blob"
          style={{
            background: 'radial-gradient(circle, rgba(74, 144, 226, 0.5) 0%, transparent 60%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
            animationDelay: '5s',
            animation: 'blobAnimate 20s ease-in-out infinite alternate',
          }}
        />
        
        {/* Debug: Visible test element to confirm animation is working */}
        <div 
          className="absolute top-4 left-4 w-16 h-16 bg-purple-500 rounded-full animate-aurora-blob opacity-70"
          style={{
            animation: 'blobAnimate 5s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Foreground Content */}
      <div ref={contentRef} className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6" style={{ zIndex: 10 }}>
        {/* Main Headline */}
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span style={{ color: '#141414' }}>Your Guide to </span>
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
            Intelligent Tools
          </span>
          <span style={{ color: '#141414' }}>.</span>
        </h1>

        {/* Sub-headline */}
        <p className="animate-in text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover, compare, and implement the best AI solutions for any task. 
          <br className="hidden md:block" />
          Streamline your workflow with curated, intelligent tools.
        </p>

        {/* Search Bar */}
        <div className="animate-in max-w-3xl mx-auto pt-2">
          <form action="/search" method="GET">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search for AI tools, categories, or use cases..."
                className="w-full h-16 pl-16 pr-8 py-4 text-lg bg-white/95 backdrop-blur-md border-2 border-gray-200/80 rounded-3xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-300 hover:shadow-3xl hover:bg-white hover:border-gray-300/80 placeholder:text-gray-400"
                aria-label="Search for AI tools"
                autoComplete="off"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
