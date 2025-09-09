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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 blob-animate"
          style={{
            background: 'radial-gradient(circle, #6952EB 0%, #B3FF3B 70%)',
            filter: 'blur(100px)',
            opacity: 0.3,
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-80 h-80 blob-animate"
          style={{
            background: 'radial-gradient(circle, #B3FF3B 0%, #6952EB 70%)',
            filter: 'blur(120px)',
            opacity: 0.2,
            animationDelay: '-10s',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-72 h-72 blob-animate"
          style={{
            background: 'radial-gradient(circle, #6952EB 20%, #B3FF3B 80%)',
            filter: 'blur(90px)',
            opacity: 0.25,
            animationDelay: '-5s',
          }}
        />
      </div>

      {/* Foreground Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Main Headline */}
        <h1 className="animate-in text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span style={{ color: '#141414' }}>Your Guide to </span>
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
            Intelligent Tools
          </span>
          <span style={{ color: '#141414' }}>.</span>
        </h1>

        {/* Sub-headline */}
        <p className="animate-in text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover, compare, and implement the best AI solutions for any task. 
          <br className="hidden md:block" />
          Streamline your workflow with curated, intelligent tools.
        </p>

        {/* Search Bar */}
        <div className="animate-in max-w-3xl mx-auto">
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
                className="w-full h-20 pl-16 pr-8 py-6 text-lg bg-white/95 backdrop-blur-md border-2 border-gray-200/80 rounded-3xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-300 hover:shadow-3xl hover:bg-white hover:border-gray-300/80 placeholder:text-gray-400"
                aria-label="Search for AI tools"
                autoComplete="off"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </form>
        </div>

        {/* Call-to-action buttons */}
        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <a
            href="/tools"
            className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
          >
            <span className="flex items-center gap-2">
              Explore All Tools
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a
            href="/submit-tool"
            className="group px-10 py-5 border-2 border-purple-600/80 text-purple-600 font-semibold rounded-2xl hover:bg-purple-50 hover:border-purple-700 transition-all duration-300 backdrop-blur-sm bg-white/50"
          >
            <span className="flex items-center gap-2">
              Submit Your Tool
              <span className="px-2 py-1 text-xs font-bold rounded-md bg-lime-400 text-gray-800">
                NEW
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
