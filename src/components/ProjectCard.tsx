'use client';

import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });

  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });

  function handleMove(e: ReactMouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    if (!reduce) {
      mx.set(nx);
      my.set(ny);
    }
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
    setSpot((s) => ({ ...s, visible: false }));
  }

  return (
    <motion.article
      ref={ref}
      {...fadeUp({ delay: stagger(index), amount: 0.2 })}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      className="group relative glass rounded-3xl overflow-hidden hover:border-black/15 hover:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] h-full flex flex-col"
      data-cursor="expand"
    >
      {/* Spotlight — follows cursor, fades out on leave */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.14), rgba(99,102,241,0.04) 35%, transparent 65%)`,
        }}
      />

      {/* Inner ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#6366f1]/0 group-hover:ring-[#6366f1]/20 transition z-[6]" />

      <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col h-full">
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
          <div className="absolute top-4 right-4 glass-subtle rounded-full px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] md:text-[11px] font-medium text-[#1d1d1f]/80 z-10">
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
              <ArrowUpRight className="w-5 h-5 text-[#86868b] group-hover:text-[#6366f1] group-hover:rotate-12 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />
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
      </div>
    </motion.article>
  );
}
