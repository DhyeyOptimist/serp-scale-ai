'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className = '' }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          key={`empty-${index}`}
          className="w-4 h-4 text-gray-300"
        />
      ))}
      
      <span className="text-sm text-foreground/70 ml-2">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}