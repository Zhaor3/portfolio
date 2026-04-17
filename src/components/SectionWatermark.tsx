'use client';

/**
 * Reusable cropped-italic ghost watermark — a single huge outlined
 * serif word cropped off one edge of its parent section. Used across
 * the site so every section has a soft "engineering notebook" echo.
 *
 * Parent must be `position: relative` with `overflow: hidden`.
 */

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  /** The word to render, e.g. "motion", "shipped", "field". */
  text: string;
  /** Which edge to crop off. Default: bottom-right. */
  corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** CSS size, defaults to responsive clamp. */
  fontSize?: string;
  /** Outline stroke alpha. Default 0.06 for near-invisible atmosphere. */
  strokeAlpha?: number;
};

export default function SectionWatermark({
  text,
  corner = 'bottom-right',
  fontSize = 'clamp(8rem, 18vw, 20rem)',
  strokeAlpha = 0.04,
}: Props) {
  const reduce = useReducedMotion();

  const pos: React.CSSProperties = {};
  switch (corner) {
    case 'bottom-right':
      pos.right = '-6vw';
      pos.bottom = '-4rem';
      break;
    case 'bottom-left':
      pos.left = '-6vw';
      pos.bottom = '-4rem';
      break;
    case 'top-right':
      pos.right = '-6vw';
      pos.top = '-4rem';
      break;
    case 'top-left':
      pos.left = '-6vw';
      pos.top = '-4rem';
      break;
  }

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute select-none"
      style={{
        ...pos,
        fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize,
        lineHeight: 0.8,
        letterSpacing: '-0.04em',
        color: 'transparent',
        WebkitTextStroke: `1px rgba(15,15,25,${strokeAlpha})`,
        zIndex: 0,
      }}
    >
      {text}
    </motion.div>
  );
}
