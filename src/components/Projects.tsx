'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projects, projectCategories } from '@/data/projects';
import { fadeUp } from '@/lib/motion';

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects."
        subtitle="A mix of research, capstone, coursework, and personal builds across robotics, mechanical design, and software."
      />

      <div className="space-y-20">
        {projectCategories.map((category, catIdx) => {
          const items = projects.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              {/* Category header with counter */}
              <motion.div
                {...fadeUp({ amount: 0.5, y: 16, duration: 0.6 })}
                className="flex items-center gap-4 mb-8"
              >
                <h3 className="text-sm md:text-base font-semibold tracking-[0.05em] uppercase text-[#1d1d1f]">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-black/10" />
                <span className="text-xs text-[#86868b] tabular-nums">
                  {String(items.length).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Bento-style grid: featured items span two columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
                {items.map((p, i) => (
                  <div
                    key={p.id}
                    className={p.featured ? 'lg:col-span-2' : ''}
                  >
                    <ProjectCard project={p} index={catIdx * 4 + i} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
