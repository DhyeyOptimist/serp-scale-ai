'use client';

'use client';

interface CategoryTagProps {
  category: string;
  onClick?: () => void;
}

export default function CategoryTag({ category, onClick }: CategoryTagProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-card border border-secondary/30 text-foreground/80 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-pointer"
    >
      {category}
    </button>
  );
}