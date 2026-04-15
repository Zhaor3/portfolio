'use client';

import { motion } from 'framer-motion';
import { reveal } from '@/lib/motion';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: Props) {
  return (
    <motion.div
      {...reveal({ amount: 0.5 })}
      className={`mb-14 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] uppercase text-[#86868b] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg text-[#6e6e73] max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
