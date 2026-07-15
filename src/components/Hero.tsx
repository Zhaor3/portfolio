'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { withBase } from '@/lib/paths';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, y = 12) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      id="hero"
      className="relative z-10 px-6 pb-20 pt-28 md:flex md:min-h-[78svh] md:items-center md:pb-24 md:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl border-t border-black/10 pt-5 md:pt-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.aside
            {...reveal(0.02, 8)}
            className="flex flex-col justify-between gap-7 lg:col-span-3 lg:min-h-[31rem]"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Portfolio · 2026
              </p>
              <p className="mt-4 text-[clamp(2.65rem,3.5vw,4rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[var(--ink)]">
                <span className="block">Ruoxiang</span>
                <span className="block">
                  Zhao
                </span>
              </p>
              <p className="mt-5 max-w-[14rem] text-sm font-medium leading-relaxed text-[var(--ink)]">
                Mechanical engineer
                <br />
                Robotics builder
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden />
              Seeking Summer 2027 internships
            </div>
          </motion.aside>

          <div className="lg:col-span-9">
            <motion.h1
              {...reveal(0.08, 18)}
              className="max-w-5xl text-[clamp(3.25rem,7.25vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.065em] text-[var(--ink)]"
            >
              Mechanical systems,
              <br />
              made intelligent
            </motion.h1>

            <motion.div
              {...reveal(0.18, 14)}
              className="mt-10 grid gap-8 border-t border-black/10 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 lg:mt-12"
            >
              <div>
                <p className="max-w-2xl text-lg leading-relaxed tracking-[-0.015em] text-[var(--ink)] sm:text-xl">
                  I design and build robotic and autonomous systems—from
                  mechanism and fabrication through controls and software.
                </p>
                <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  <p>Incoming M.S. Robotics · University of Michigan</p>
                  <p>B.S. Mechanical Engineering · RPI · Magna Cum Laude</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1 md:items-end">
                <a
                  href="#about"
                  className="group inline-flex min-h-12 items-center gap-3 border-b border-black/15 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
                >
                  Start with About
                  <ArrowDown
                    className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden
                  />
                </a>
                <a
                  href={withBase('/resume.pdf')}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex min-h-12 items-center gap-3 border-b border-black/15 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  Résumé
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
