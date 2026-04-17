'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { withBase } from '@/lib/paths';
import SectionWatermark from './SectionWatermark';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Watermark has a very light scroll-linked drift — content is left alone
  // so the scroll feel stays predictable (no "stuck during fade" sensation).
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative z-10 min-h-[88vh] flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden"
    >
      {/* Cropped italic watermark — surname echo in the lower-left margin */}
      <motion.div style={{ y: watermarkY }} className="absolute inset-0 pointer-events-none">
        <SectionWatermark
          text="Zhao"
          corner="bottom-left"
          fontSize="clamp(8rem, 16vw, 18rem)"
          strokeAlpha={0.04}
        />
      </motion.div>

      <div className="relative max-w-5xl w-full text-center">
        {/* Eyebrow — matches Featured / section-header language */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#86868b] uppercase">
            §&nbsp;Index
          </span>
          <span className="h-px w-12 bg-black/15" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#86868b] tabular-nums">
            00 / 07
          </span>
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-sm rounded-full glass mx-auto"
          data-cursor="expand"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[#1d1d1f]">Seeking Summer 2026 Internship</span>
        </motion.div>

        {/* Headline — letter-by-letter reveal on first render */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.035em] mb-6 leading-[1.15] pb-[0.1em]"
        >
          <span className="text-[#1d1d1f]">Hi, I&apos;m </span>
          <motion.span
            className="text-aura inline-block"
            style={{ paddingBottom: '0.12em' }}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            Ruoxiang Zhao
          </motion.span>
        </motion.h1>

        {/* Gradient hairline under headline — matches SectionHeader underscore */}
        <motion.div
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-px w-48 bg-gradient-to-r from-transparent via-[#6366f1] to-transparent"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-[#52525b] mb-4 font-normal"
        >
          Mechanical Engineer
          <span className="text-[#86868b] mx-3">·</span>
          Robotics
          <span className="text-[#86868b] mx-3">·</span>
          Autonomous Vehicles
        </motion.p>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#86868b] mb-12 max-w-2xl mx-auto"
        >
          Incoming M.S. Robotics @ University of Michigan
          <span className="text-[#c8c8ce] mx-2">·</span>
          RPI &apos;26
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="#projects"
            className="group w-full sm:w-auto btn-primary px-7 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 min-w-[180px]"
            data-cursor="expand"
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={withBase('/resume.pdf')}
            target="_blank"
            rel="noopener"
            className="group w-full sm:w-auto btn-ghost px-7 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 min-w-[180px]"
            data-cursor="expand"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm"
        >
          {[
            { label: 'GPA', value: '3.87 / 4.0' },
            { label: "Dean's List", value: '7 semesters' },
            { label: 'Tesla', value: "Intern '25" },
            { label: 'Research', value: 'XAL Lab' },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-subtle rounded-full px-4 py-2 flex items-center gap-2"
            >
              <span className="text-[#86868b] uppercase tracking-widest text-[10px]">
                {s.label}
              </span>
              <span className="text-[#1d1d1f] font-medium">{s.value}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll hint — hidden on small screens, pinned to section bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[#86868b] pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#86868b]/60 to-transparent" />
      </motion.div>
    </section>
  );
}

