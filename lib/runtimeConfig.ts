// This file configures which routes should use Edge Runtime vs Node.js

export const edgeConfig = {
  // Runtime settings
  runtime: 'nodejs', // Default to Node.js for most routes

  // Specific route configurations can be added here if needed
  // Example: '/api/something': { runtime: 'edge' }
};

// Helper function to determine if a route should use Edge Runtime
export function shouldUseEdge(pathname: string): boolean {
  // List of paths that should use the Edge Runtime
  const edgePaths: string[] = [
    // Add edge-compatible paths here if needed
  ];
  
  // Check if the pathname matches any edge path patterns
  return edgePaths.some(path => pathname.startsWith(path));
}
