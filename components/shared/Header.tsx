'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation links configuration
const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Submit Tool', href: '/submit-tool', new: true },
  { label: 'Write For Us', href: '/write-for-us' },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full pt-6 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold" style={{ color: '#6952EB' }}>
            Serp-Scale-AI
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          {navigationLinks.map((link) => {
            const active = isActive(link.href);
            
            // Special styling for Submit Tool button
            if (link.label === 'Submit Tool') {
              return (
                <div key={link.href} className="relative flex items-center">
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
                    <span 
                      className="ml-2 px-2 py-1 text-xs font-bold rounded-md"
                      style={{ 
                        backgroundColor: '#6952EB', 
                        color: 'white' 
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
              );
            }

            // Regular navigation links
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-all duration-200 ease-in-out hover:translate-y-[-1px]"
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
            );
          })}
        </nav>
      </div>
    </header>
  );
}