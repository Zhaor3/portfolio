'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SectionWatermark from './SectionWatermark';
import AmbientMarquee from './AmbientMarquee';
import ProjectCard from './ProjectCard';
import { projects, projectCategories, type ProjectCategory } from '@/data/projects';
import { fadeUp } from '@/lib/motion';

const categoryMeta: Record<ProjectCategory, { numeral: string; caption: string }> = {
  'Robotics & Autonomous Systems': {
    numeral: 'I',
    caption: 'Closed-loop control, actuation, and embedded sensing.',
  },
  'Mechanical Design & Controls': {
    numeral: 'II',
    caption: 'Mechanisms, capstone, and award-winning team builds.',
  },
  'Software & Maker': {
    numeral: 'III',
    caption: 'Hardware-adjacent code and personal fabrication.',
  },
};

/* Small drafting reticle — echoes AuroraBackground construction geometry. */
function Reticle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="w-8 h-8 md:w-10 md:h-10 shrink-0 text-[#1d1d1f]/55"
      fill="none"
    >
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="0.6" />
      <circle
        cx="20"
        cy="20"
        r="8"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="1 1.5"
      />
      <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="0.6" />
      <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="0.6" />
      <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="20" cy="20" r="0.9" fill="#6366f1" />
    </svg>
  );
}

/* Fold-marker row — drafting "cut here" between categories. */
function FoldMarker({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 px-2"
      aria-hidden
    >
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#86868b]">
        §&nbsp;Fold
      </span>
      <span
        className="flex-1 h-px"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(15,15,25,0.25) 0 6px, transparent 6px 12px)',
        }}
      />
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#86868b] tabular-nums">
        {label}
      </span>
    </motion.div>
  );
}

export default function Projects() {
  const activeCategories = projectCategories.filter(
    (c) => projects.filter((p) => p.category === c).length > 0,
  );

  return (
    <section
      id="projects"
      className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionWatermark text="projects" corner="bottom-right" />

      {/* Corner drafting reticle — upper-right ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 right-6 md:top-28 md:right-10 opacity-60"
      >
        <Reticle />
      </div>

      <div className="relative">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects."
          subtitle="A mix of research, capstone, coursework, and personal builds across robotics, mechanical design, and software."
          index={5}
          total={7}
        />

        <div className="space-y-16 md:space-y-20">
          {activeCategories.map((category, catIdx) => {
            const items = projects.filter((p) => p.category === category);
            const meta = categoryMeta[category];
            return (
              <div key={category}>
                {/* Fold marker between categories (not before the first) */}
                {catIdx > 0 && (
                  <div className="mb-12 md:mb-16">
                    <FoldMarker
                      label={`${String(catIdx).padStart(2, '0')} / ${String(
                        activeCategories.length,
                      ).padStart(2, '0')}`}
                    />
                  </div>
                )}

                {/* Category header — numeral + title + caption + reticle */}
                <motion.div
                  {...fadeUp({ amount: 0.5, y: 16, duration: 0.6 })}
                  className="mb-8 md:mb-10"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <Reticle />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#86868b]">
                          §&nbsp;{meta.numeral}
                        </span>
                        <h3 className="text-base md:text-lg font-semibold tracking-tight text-[#1d1d1f]">
                          {category}
                        </h3>
                        <span className="font-mono text-[11px] text-[#86868b] tabular-nums ml-auto">
                          {String(items.length).padStart(2, '0')} pc
                        </span>
                      </div>
                      <p className="text-sm text-[#6e6e73] mt-1.5 max-w-xl">{meta.caption}</p>
                      <div
                        className="mt-3 h-px"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, rgba(99,102,241,0.35), rgba(15,15,25,0.12) 40%, transparent 90%)',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Bento grid — featured items span 2 of 3 cols, crossing small ↔ large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
                  {items.map((p, i) => (
                    <div key={p.id} className={p.featured ? 'lg:col-span-2' : ''}>
                      <ProjectCard project={p} index={catIdx * 4 + i} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <AmbientMarquee
          serif="Research · Hardware · Software · Build · Test · Iterate · Ship ·"
          mono="design · fabricate · simulate · validate · document ·"
        />
      </div>
    </section>
  );
}
