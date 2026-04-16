'use client';

import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

/**
 * Horizontal image carousel with CSS scroll-snap for native-feeling swipe.
 *
 * - Touch/trackpad swipe works out of the box via scroll-snap.
 * - Dot indicators appear only when there are multiple images.
 * - Subtle arrow overlays on hover (desktop).
 * - Falls back to the soft gradient placeholder when an image fails.
 */
export default function ImageCarousel({ images, alt, className = '' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Derive active index from scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(idx, count - 1));
  }, [count]);

  // Programmatically scroll to a slide
  const goTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <div className={`relative group/carousel overflow-hidden ${className}`}>
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full scrollbar-hide"
        style={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {images.map((img, i) => (
          <div
            key={img}
            className="relative flex-shrink-0 w-full h-full"
            style={{
              scrollSnapAlign: 'start',
              background:
                'linear-gradient(135deg, #f5f5f7 0%, #e8e9ed 50%, #dfe1e7 100%)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.startsWith('http') ? img : `${basePath}/images/${img}`}
              alt={`${alt} — ${i + 1} of ${count}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
              className="absolute inset-0 h-full w-full object-cover select-none"
            />

            {/* Placeholder text shown when image is missing */}
            <noscript>
              <span className="absolute inset-0 flex items-center justify-center text-[#86868b] text-[10px] tracking-[0.3em] uppercase">
                {img}
              </span>
            </noscript>
          </div>
        ))}
      </div>

      {/* Image counter pill — only for multi-image */}
      {count > 1 && (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide tabular-nums">
          {active + 1} / {count}
        </div>
      )}

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 h-[6px] ${
                i === active
                  ? 'bg-white w-5 shadow-[0_0_6px_rgba(0,0,0,0.3)]'
                  : 'bg-white/50 w-[6px] hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow buttons — appear on hover, desktop only */}
      {count > 1 && active > 0 && (
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {count > 1 && active < count - 1 && (
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
