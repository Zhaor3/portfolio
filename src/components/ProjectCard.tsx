'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import PlaceholderImage from './PlaceholderImage';
import ImageCarousel from './ImageCarousel';
import type { Project } from '@/data/projects';
import { fadeUp, stagger } from '@/lib/motion';

type Props = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const href = project.live || project.github;
  const hasMultipleImages = project.images.length > 1;

  const sharedClasses =
    'group relative glass rounded-3xl overflow-hidden hover:border-black/15 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] transition-all h-full flex flex-col';

  const motionProps = {
    ...fadeUp({ delay: stagger(index), amount: 0.2 }),
    whileHover: { y: -6 },
  };

  return (
    <motion.article {...motionProps} className={sharedClasses}>
      {/* Image area — not linked, so carousel/lightbox clicks work freely */}
      {hasMultipleImages ? (
        <ImageCarousel
          images={project.images}
          alt={project.title}
          className="aspect-[16/10] w-full"
        />
      ) : (
        <PlaceholderImage
          src={`/images/${project.images[0]}`}
          alt={project.title}
          label={`placeholder · ${project.images[0]}`}
          className="aspect-[16/10] w-full"
        />
      )}

      {/* Subtle GitHub chip — positioned below carousel counter to avoid overlap */}
      {project.github && !hasMultipleImages && (
        <div className="absolute top-4 right-4 glass-subtle rounded-full px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] md:text-[11px] font-medium text-[#1d1d1f]/80">
          <Github className="w-3 h-3" />
          <span className="tracking-wide">GitHub</span>
        </div>
      )}

      {/* Text area — links to project URL when available */}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 md:p-7 flex-1 flex flex-col no-underline cursor-pointer hover:bg-black/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3 mb-3 text-[10px] md:text-xs tracking-[0.18em] uppercase">
            {project.context && (
              <>
                <span className="text-[#1d1d1f]/70 font-medium">{project.context}</span>
                <span className="text-[#d0d0d5]">·</span>
              </>
            )}
            <span className="text-[#86868b]">{project.date}</span>
            {project.github && (
              <>
                <span className="text-[#d0d0d5]">·</span>
                <span className="inline-flex items-center gap-1 text-[#86868b]">
                  <Github className="w-3 h-3" />
                  GitHub
                </span>
              </>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] leading-tight tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:rotate-12 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>

          <p className="text-sm md:text-[15px] text-[#6e6e73] leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-black/[0.04] text-[#1d1d1f]/75 border border-black/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>
      ) : (
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-[10px] md:text-xs tracking-[0.18em] uppercase">
            {project.context && (
              <>
                <span className="text-[#1d1d1f]/70 font-medium">{project.context}</span>
                <span className="text-[#d0d0d5]">·</span>
              </>
            )}
            <span className="text-[#86868b]">{project.date}</span>
          </div>

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] leading-tight tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-sm md:text-[15px] text-[#6e6e73] leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-black/[0.04] text-[#1d1d1f]/75 border border-black/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
