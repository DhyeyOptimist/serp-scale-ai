// This file ensures that the build process can statically analyze
// the page without requiring data fetching

// Helper function to create a placeholder response that won't crash the build
export function getStaticBuildPlaceholder() {
  return {
    data: {
      name: "Placeholder Tool",
      description: "This is a placeholder for build time only.",
      slug: "placeholder",
      url: "https://example.com",
      category: "Other",
      is_featured: false,
      rating: 0,
      logo: "",
      tags: []
    },
    error: null
  };
}
