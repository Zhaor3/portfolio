'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * A restrained engineering-paper field. The trajectory draws once on load;
 * everything else is static so project imagery remains the visual focus.
 */
export default function AuroraBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 92% 5%, rgba(228,91,50,0.075), transparent 28%), linear-gradient(145deg, #f7f5ef 0%, #f2f0e9 55%, #eeece5 100%)',
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[112vh] opacity-[0.36]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(23,23,22,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,22,0.055) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.2) 68%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.2) 68%, transparent 100%)',
        }}
      />

      <svg
        className="absolute right-[-10%] top-[7%] h-[38rem] w-[72rem] max-w-[92vw] opacity-[0.34]"
        viewBox="0 0 1100 560"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M24 412C177 391 238 226 405 228C574 230 603 367 754 337C891 310 900 163 1072 105"
          stroke="rgba(228,91,50,0.44)"
          strokeWidth="1.25"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <path
          d="M24 430C186 410 244 252 407 252C574 252 623 386 767 359C912 331 928 193 1072 132"
          stroke="rgba(23,23,22,0.12)"
          strokeWidth="0.75"
          strokeDasharray="5 10"
        />
        <circle cx="405" cy="228" r="5" fill="#e45b32" />
        <circle cx="754" cy="337" r="4" fill="#f2f0e9" stroke="rgba(23,23,22,0.35)" />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.13] mix-blend-multiply"
        style={{
          backgroundImage:
            'repeating-linear-gradient(118deg, rgba(23,23,22,0.028) 0px, rgba(23,23,22,0.028) 1px, transparent 1px, transparent 5px)',
        }}
      />
    </div>
  );
}
