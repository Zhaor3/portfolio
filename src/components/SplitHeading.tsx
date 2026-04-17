'use client';

/**
 * Letter-by-letter heading reveal with blur→sharp, soft y-lift.
 *
 * Extracted from FeaturedShowcase so every section can share the same
 * marquee-style title animation. Each character is its own motion span
 * with a 35ms delay step, giving the heading a typewriter-meets-camera
 * feel on scroll-into-view. Re-triggers on every viewport crossing.
 */

import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
};

export default function SplitHeading({
  text,
  className = 'text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.02]',
}: Props) {
  const chars = text.split('');
  return (
    <h2 className={className}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.4, margin: '0px 0px -40px 0px' }}
          transition={{
            duration: 0.65,
            delay: i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </h2>
  );
}
