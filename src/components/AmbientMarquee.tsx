'use client';

/**
 * Reusable ambient text strip — tasteful counter-rotating italic serif
 * + mono thin text rows that drift slowly with ultra-low opacity.
 * Extracted from FeaturedShowcase's AuraStrips so every section can
 * carry the same "in motion" feel.
 *
 * Reads as atmosphere, not a banner. Reduced-motion-safe.
 */

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  /** Italic serif row (top). Keep it short — it repeats 6x. */
  serif: string;
  /** Mono row (bottom). Keep it short — it repeats 6x. */
  mono: string;
  /** Extra top margin class. Default 'mt-24 md:mt-32'. */
  className?: string;
};

export default function AmbientMarquee({
  serif,
  mono,
  className = 'mt-20 md:mt-28',
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`relative select-none ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      {/* Row 1 — italic serif drifting right */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ x: '0%' }}
          animate={reduce ? { x: '0%' } : { x: '-50%' }}
          transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap text-[#1d1d1f]"
          style={{
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontStyle: 'italic',
            fontSize: 15,
            letterSpacing: '0.08em',
            opacity: 0.12,
            filter: 'blur(0.4px)',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pr-12">
              {serif}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — mono drifting left */}
      <div className="overflow-hidden mt-4">
        <motion.div
          initial={{ x: '-50%' }}
          animate={reduce ? { x: '-50%' } : { x: '0%' }}
          transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#1d1d1f',
            opacity: 0.18,
            filter: 'blur(0.3px)',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pr-10">
              {mono}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
