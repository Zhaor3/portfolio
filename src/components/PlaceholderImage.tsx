'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Lightbox from './Lightbox';

type Props = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

/**
 * Image that falls back to a soft neutral gradient with a stylized label when
 * the real asset is missing. Useful while building out the site before Simon
 * drops photos into /public/images/.
 *
 * Also adds subtle scroll-linked parallax: as the image moves through the
 * viewport, its inner `<img>` shifts vertically by ±6%. Paired with a scale
 * of 1.12 so the extra 6% overhang on each side absorbs the translate without
 * ever exposing empty space at the edges. This is the 2025/2026 premium
 * portfolio image treatment (Linear / Vercel / Apple product pages all use
 * something very similar).
 */
export default function PlaceholderImage({ src, alt, label, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Track scroll progress from "element enters bottom of viewport" (0) to
  // "element leaves top of viewport" (1). Mapping that into a ±6% y offset
  // on the inner image gives a gentle parallax that tracks page scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedSrc = src.startsWith('http') ? src : `${basePath}${src}`;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(135deg, #f6f4ee 0%, #e8e5dd 50%, #dcd8cf 100%)',
      }}
    >
      {!failed && (
        <button
          type="button"
          aria-label={`Open ${alt} in image viewer`}
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.focus();
            setLightboxOpen(true);
          }}
          className="absolute inset-0 block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
            style={{ y: reduceMotion ? 0 : y, scale: 1.12 }}
            className="h-full w-full object-cover"
          />
        </button>
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-[#66666c] text-[10px] md:text-xs tracking-[0.3em] uppercase text-center">
            {label ?? alt}
          </span>
        </div>
      )}

      {/* Full-screen lightbox */}
      {!failed && (
        <Lightbox
          images={[src.replace(/^\/images\//, '')]}
          alt={alt}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
