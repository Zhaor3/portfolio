'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24"
    >
      <div className="max-w-5xl w-full text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-sm rounded-full glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[#1d1d1f]">Seeking Summer 2026 Internship</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.035em] mb-6 leading-[1.02]"
        >
          <span className="text-[#1d1d1f]">Hi, I&apos;m </span>
          <span className="text-aura">Ruoxiang Zhao</span>
        </motion.h1>

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
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="group w-full sm:w-auto btn-ghost px-7 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 min-w-[180px]"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Quick stats row — adds more personality and detail */}
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

        {/* Scroll hint — hidden on small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-[#86868b]">
            <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#86868b]/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
