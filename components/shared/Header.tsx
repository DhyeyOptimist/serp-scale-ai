'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Navigation links configuration
const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Write For Us', href: '/write-for-us' },
  { label: 'Submit Tool', href: '/submit-tool', new: true },
];

export default function Header() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for smart sticky header
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Determine header background based on scroll position
  const headerBg = scrollY > 10 
    ? 'bg-white/80 backdrop-blur-md border-b border-gray-100/20' 
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${headerBg} pt-6 px-6`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold" style={{ color: '#6952EB' }}>
            Serp-Scale-AI
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          {navigationLinks.map((link, index) => {
            const active = isActive(link.href);
            
            // Add divider before Submit Tool button
            if (link.label === 'Submit Tool') {
              return (
                <div key={link.href} className="flex items-center space-x-8">
                  {/* Vertical Divider */}
                  <div 
                    className="h-6 w-px"
                    style={{ backgroundColor: '#BAC7DA' }}
                  />
                  
                  {/* Submit Tool Button */}
                  <div className="relative flex items-center">
                    <Link
                      href={link.href}
                      className="px-4 py-2 rounded-lg border transition-all duration-200 ease-in-out hover:translate-y-[-1px] font-medium"
                      style={{
                        borderColor: '#6952EB',
                        color: active ? '#6952EB' : '#6952EB',
                        backgroundColor: active ? 'rgba(105, 82, 235, 0.05)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                    {link.new && (
                      <div 
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: '#B3FF3B'
                        }}
                      >
                        <span className="text-white text-xs font-bold leading-none">•</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Regular navigation links with enhanced hover underline
            return (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="font-medium transition-all duration-200 ease-in-out hover:translate-y-[-1px] pb-1"
                  style={{
                    color: active ? '#6952EB' : '#141414',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#6952EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#141414';
                    }
                  }}
                >
                  {link.label}
                </Link>
                
                {/* Animated underline */}
                <div 
                  className="absolute bottom-0 left-1/2 h-px transition-all duration-300 ease-out transform -translate-x-1/2 group-hover:w-full w-0"
                  style={{ backgroundColor: '#6952EB' }}
                />
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}