'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
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
  const actionLabel = project.live ? 'View live project' : 'View code on GitHub';

  return (
    <motion.article
      {...fadeUp({ delay: stagger(index), amount: 0.18 })}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_28px_65px_-30px_rgba(15,15,25,0.3)]"
    >
      <div className="relative overflow-hidden">
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
        {project.featured && (
          <span className="glass-subtle absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#1d1d1f]">
            <Sparkles className="h-3 w-3 text-[#6366f1]" aria-hidden />
            Selected
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-[#66666c] md:text-xs">
          {project.context && (
            <>
              <span className="font-medium text-[#52525b]">{project.context}</span>
              <span aria-hidden className="text-[#c8c8ce]">·</span>
            </>
          )}
          <span>{project.date}</span>
        </div>

        <h3 className="text-xl font-semibold leading-tight tracking-tight text-[#1d1d1f] md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#52525b] md:text-[15px]">
          {project.description}
        </p>

        {(project.role || project.outcome) && (
          <dl className="mt-5 grid gap-3 border-y border-black/[0.07] py-4 text-sm">
            {project.role && (
              <div className="grid grid-cols-[4.25rem_1fr] gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#66666c]">
                  My role
                </dt>
                <dd className="leading-snug text-[#1d1d1f]/85">{project.role}</dd>
              </div>
            )}
            {project.outcome && (
              <div className="grid grid-cols-[4.25rem_1fr] gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#66666c]">
                  Outcome
                </dt>
                <dd className="leading-snug text-[#1d1d1f]/85">{project.outcome}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/[0.06] bg-black/[0.04] px-2.5 py-1 text-[10px] text-[#52525b] md:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-black/10 bg-white/60 px-4 text-sm font-medium text-[#1d1d1f] transition-colors hover:border-[#6366f1]/30 hover:bg-white"
          >
            {project.github && <Github className="h-4 w-4" aria-hidden />}
            {actionLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        )}
      </div>
    </motion.article>
  );
}
