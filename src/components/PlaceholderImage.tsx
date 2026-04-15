'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const ref = useRef<HTMLDivElement>(null);

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
          'linear-gradient(135deg, #f5f5f7 0%, #e8e9ed 50%, #dfe1e7 100%)',
      }}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <motion.img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ y, scale: 1.12 }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-[#86868b] text-[10px] md:text-xs tracking-[0.3em] uppercase text-center">
            {label ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
