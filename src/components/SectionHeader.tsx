'use client';

/**
 * Unified section header — applies the "engineering notebook" chrome
 * that FeaturedShowcase pioneered to every section on the site.
 *
 * Structure:
 *   § EYEBROW  ────────  NN / TT    ← mono label + hairline + counter
 *   Title, letter-by-letter reveal   ← SplitHeading
 *   ─────── (gradient hairline)      ← underlines the title
 *   subtitle paragraph (optional)
 *
 * Props stay backwards compatible. Pass `index` and `total` to render
 * the counter; omit to hide it. `align` defaults to left (the Featured
 * style); pass `"center"` for contact/hero-adjacent sections.
 */

import { motion } from 'framer-motion';
import { reveal } from '@/lib/motion';
import SplitHeading from './SplitHeading';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** 1-based section index; renders "01" when set. */
  index?: number;
  /** Total section count for the "NN / TT" counter. Required with `index`. */
  total?: number;
  /** Live-status chip text rendered on the right side of the eyebrow row. */
  status?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  index,
  total,
  status,
}: Props) {
  const isCenter = align === 'center';
  const showCounter = typeof index === 'number' && typeof total === 'number';

  return (
    <motion.div
      {...reveal({ amount: 0.4 })}
      className={`mb-14 md:mb-20 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {(eyebrow || showCounter) && (
        <div
          className={`mb-4 flex items-center gap-3 ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          {eyebrow && (
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#86868b] uppercase">
              §&nbsp;{eyebrow}
            </span>
          )}
          <span className="h-px w-12 bg-black/15" />
          {showCounter && (
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#86868b] tabular-nums">
              {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
          {status && (
            <>
              <span className="hidden md:block h-px w-8 bg-black/15" />
              <span className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#86868b] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {status}
              </span>
            </>
          )}
        </div>
      )}

      <SplitHeading
        text={title}
        className={
          isCenter
            ? 'text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.05]'
            : 'text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.02]'
        }
      />

      <motion.div
        initial={{ scaleX: 0, originX: isCenter ? 0.5 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-6 h-px w-48 bg-gradient-to-r from-[#1d1d1f] via-[#6366f1] to-transparent ${
          isCenter ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-[#6e6e73] text-base md:text-lg ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
