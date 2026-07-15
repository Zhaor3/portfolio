'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { reveal } from '@/lib/motion';

const facts = [
  {
    label: 'Next',
    value: 'M.S. Robotics · University of Michigan · August 2026',
  },
  {
    label: 'Foundation',
    value: 'B.S. Mechanical Engineering · Magna Cum Laude',
  },
  {
    label: 'Availability',
    value: 'Summer 2027 internships',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-16 bg-[var(--dark)] px-6 py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...reveal({ amount: 0.2, y: 14 })}
          className="flex items-center gap-3 border-t border-white/15 pt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50"
        >
          <span className="text-[var(--accent)]">01</span>
          <span>About</span>
          <span className="h-px flex-1 bg-white/10" aria-hidden />
          <span>Full-system engineering</span>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <motion.div
            {...reveal({ amount: 0.24, y: 18 })}
            className="lg:col-span-7"
          >
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6.25rem)] font-medium leading-[0.93] tracking-[-0.055em]">
              I work across the whole system
            </h2>
          </motion.div>

          <motion.div
            {...reveal({ delay: 0.08, amount: 0.24, y: 18 })}
            className="space-y-5 text-base leading-relaxed text-white/68 sm:text-lg lg:col-span-5 lg:pt-2"
          >
            <p>
              I’m Ruoxiang (Simon) Zhao, a mechanical engineer working at the
              intersection of robotics, controls, and intelligent software. I
              enjoy problems where the mechanism cannot be separated from the
              code that makes it useful.
            </p>
            <p>
              At Stella Robotics, RPI’s XAL Lab, and Tesla, I have designed
              tendon-routed robotic mechanisms, autonomous-vehicle actuation
              and sensing, and manufacturable thermal systems—from requirements
              and CAD through integration, tuning, and validation.
            </p>
          </motion.div>
        </div>

        <motion.dl
          {...reveal({ delay: 0.05, amount: 0.2, y: 16 })}
          className="mt-16 grid border-y border-white/15 sm:grid-cols-3 lg:mt-20"
        >
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`py-5 sm:px-5 sm:py-6 ${
                index > 0 ? 'border-t border-white/15 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/82">
                {fact.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...reveal({ delay: 0.08, amount: 0.16, y: 16 })}
          className="mt-14 grid gap-8 md:grid-cols-3 lg:mt-16"
        >
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-white/15 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                {group.title}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/75">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-14 flex justify-end border-t border-white/15 pt-5">
          <a
            href="#education"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white"
          >
            Continue to education
            <ArrowDownRight
              className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
