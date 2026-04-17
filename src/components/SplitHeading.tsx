'use client';

/**
 * Word-level heading reveal with blur→sharp lift.
 *
 * Previously split by character, which made headings slow to resolve
 * and let per-character inline-blocks break mid-word at narrow widths.
 * Now we split by word: each word is one inline-block span so it
 * always wraps as a unit, and a tighter per-word stagger keeps the
 * whole heading readable quickly on scroll-in.
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
  const words = text.split(' ');
  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          <motion.span
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.4, margin: '0px 0px -40px 0px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </h2>
  );
}
