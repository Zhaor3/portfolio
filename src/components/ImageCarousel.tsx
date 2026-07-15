'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useReducedMotion } from 'framer-motion';
import Lightbox from './Lightbox';

type ImageFit = 'cover' | 'contain';
type Frame = 'neutral' | 'paper' | 'dark';
type InteractionZone = 'previous' | 'view' | 'next' | null;

type Props = {
  images: string[];
  alt: string;
  className?: string;
  fit?: ImageFit;
  fitByImage?: Partial<Record<string, ImageFit>>;
  frame?: Frame;
  blurredBackdrop?: boolean;
};

const frameClasses: Record<Frame, string> = {
  neutral: 'bg-[#d8d5cd]',
  paper: 'bg-[#e5e1d8]',
  dark: 'bg-[#191a17]',
};

/**
 * Arrowless inline gallery: swipe, click/tap either edge to browse, or select
 * the center to enlarge. Keyboard users can browse with Left/Right and open
 * the active image with Enter or Space.
 */
export default function ImageCarousel({
  images,
  alt,
  className = '',
  fit = 'cover',
  fitByImage,
  frame = 'neutral',
  blurredBackdrop = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const pulseTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hoverZone, setHoverZone] = useState<InteractionZone>(null);
  const [edgePulse, setEdgePulse] = useState<'previous' | 'next' | null>(null);
  const reduceMotion = useReducedMotion();
  const count = images.length;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const resolveImage = useCallback(
    (image: string) =>
      image.startsWith('http') ? image : `${basePath}/images/${image}`,
    [basePath],
  );

  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element || element.clientWidth === 0) return;

    const index = Math.round(element.scrollLeft / element.clientWidth);
    setActive(Math.max(0, Math.min(index, count - 1)));
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const element = scrollRef.current;
      if (!element || count === 0) return;

      const nextIndex = Math.max(0, Math.min(index, count - 1));
      setActive(nextIndex);
      element.scrollTo({
        left: nextIndex * element.clientWidth,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    },
    [count, reduceMotion],
  );

  useEffect(
    () => () => {
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
      }
    },
    [],
  );

  const showEdgePulse = (direction: 'previous' | 'next') => {
    if (reduceMotion) return;

    setEdgePulse(direction);
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
    }
    pulseTimerRef.current = window.setTimeout(() => {
      setEdgePulse(null);
      pulseTimerRef.current = null;
    }, 260);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (count > 1) goTo(active - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (count > 1) goTo(active + 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setLightboxOpen(true);
    }
  };

  const getInteractionZone = (
    clientX: number,
    element: HTMLDivElement,
  ): Exclude<InteractionZone, null> => {
    if (count === 1) return 'view';

    const bounds = element.getBoundingClientRect();
    const position = (clientX - bounds.left) / bounds.width;
    if (position < 0.3) return 'previous';
    if (position > 0.7) return 'next';
    return 'view';
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return;
    if (event.pointerType !== 'mouse') return;
    setHoverZone(getInteractionZone(event.clientX, event.currentTarget));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return;
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (distance > 10) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    // React portal events from the lightbox still bubble through this component.
    // Only react to clicks whose DOM target is inside the inline gallery itself.
    if (!event.currentTarget.contains(event.target as Node)) return;
    if (suppressClickRef.current) return;

    const zone = getInteractionZone(event.clientX, event.currentTarget);
    if (zone === 'previous') {
      if (active > 0) {
        showEdgePulse('previous');
        goTo(active - 1);
      }
    } else if (zone === 'next') {
      if (active < count - 1) {
        showEdgePulse('next');
        goTo(active + 1);
      }
    } else {
      setLightboxOpen(true);
    }
  };

  if (count === 0) return null;

  return (
    <div
      className={`group/carousel relative overflow-hidden ${frameClasses[frame]} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} image gallery, image ${active + 1} of ${count}. Select either edge to browse or the center to enlarge.`}
      aria-keyshortcuts="ArrowLeft ArrowRight Enter Space"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHoverZone(null)}
      style={{
        cursor:
          hoverZone === 'previous'
            ? active > 0
              ? 'w-resize'
              : 'default'
            : hoverZone === 'next'
              ? active < count - 1
                ? 'e-resize'
                : 'default'
              : 'zoom-in',
      }}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex h-full overscroll-x-contain"
        style={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {images.map((image, index) => {
          const imageFit = fitByImage?.[image] ?? fit;
          const source = resolveImage(image);

          return (
            <div
              key={`${image}-${index}`}
              className={`relative h-full w-full flex-shrink-0 overflow-hidden ${frameClasses[frame]}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
            >
              {imageFit === 'contain' && blurredBackdrop && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={source}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-[-8%] h-[116%] w-[116%] scale-110 object-cover opacity-25 blur-2xl saturate-75"
                />
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source}
                alt={`${alt} — ${index + 1} of ${count}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
                className={`relative z-[1] h-full w-full select-none ${
                  imageFit === 'contain'
                    ? 'object-contain p-3 sm:p-4'
                    : 'object-cover'
                }`}
              />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div
          className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[9px] tabular-nums tracking-[0.12em] text-white backdrop-blur-md"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </div>
      )}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-[9] w-[34%] bg-gradient-to-r from-[var(--accent)]/45 via-[var(--accent)]/10 to-transparent transition-all duration-300 motion-reduce:hidden ${
          edgePulse === 'previous'
            ? 'translate-x-0 opacity-100'
            : '-translate-x-6 opacity-0'
        }`}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-[9] w-[34%] bg-gradient-to-l from-[var(--accent)]/45 via-[var(--accent)]/10 to-transparent transition-all duration-300 motion-reduce:hidden ${
          edgePulse === 'next'
            ? 'translate-x-0 opacity-100'
            : 'translate-x-6 opacity-0'
        }`}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-[30%] bg-gradient-to-r from-black/25 via-black/5 to-transparent transition-opacity duration-200 motion-reduce:transition-none ${
          hoverZone === 'previous' && active > 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className={`absolute left-2.5 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none ${
            hoverZone === 'previous' && active > 0
              ? 'translate-x-0 opacity-100'
              : '-translate-x-2 opacity-0'
          }`}
        >
          Prev
        </span>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 motion-reduce:transition-none ${
          hoverZone === 'view' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="rounded-full border border-white/10 bg-black/45 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
          Open
        </span>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-[30%] bg-gradient-to-l from-black/25 via-black/5 to-transparent transition-opacity duration-200 motion-reduce:transition-none ${
          hoverZone === 'next' && active < count - 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none ${
            hoverZone === 'next' && active < count - 1
              ? 'translate-x-0 opacity-100'
              : 'translate-x-2 opacity-0'
          }`}
        >
          Next
        </span>
      </div>

      <Lightbox
        images={images}
        alt={alt}
        startIndex={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
