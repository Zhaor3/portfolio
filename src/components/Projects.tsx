'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { projects, type Project, type ProjectCategory } from '@/data/projects';

type MediaSpec = {
  image?: string;
  fit?: 'cover' | 'contain';
  fitByImage?: Partial<Record<string, 'cover' | 'contain'>>;
  frame?: 'paper' | 'dark';
  blurredBackdrop?: boolean;
};

type CategorySpec = {
  category: ProjectCategory;
  number: string;
  title: string;
  description: string;
  projectIds: string[];
};

const categorySpecs: CategorySpec[] = [
  {
    category: 'Robotics & Autonomous Systems',
    number: '01',
    title: 'Robotics + autonomy',
    description:
      'Vehicle systems, sensing, actuation, and compact robotic mechanisms.',
    projectIds: [
      'canam-brake',
      'robotic-arm-4dof',
      'canam-wheel-speed',
      'cycloidal-gearbox',
    ],
  },
  {
    category: 'Mechanical Design & Controls',
    number: '02',
    title: 'Mechanisms + controls',
    description:
      'Mechanisms, control systems, circuits, and validated physical prototypes.',
    projectIds: [
      'capstone-dispenser',
      'beamng-ros2',
      'leaf-vacuum',
      'heartbeat-sensor',
    ],
  },
  {
    category: 'Software & Maker',
    number: '03',
    title: 'Software + making',
    description:
      'Embedded products, fabrication systems, vision, and agentic software.',
    projectIds: [
      'tokenjar',
      'voron-3d-printers',
      'geoagent',
      'daytradeagents',
    ],
  },
];

const mediaSpecs: Record<string, MediaSpec> = {
  'canam-brake': {
    image: 'canam-brake/actuator-installed.jpg',
    fitByImage: {
      'canam-brake/hero.jpg': 'contain',
    },
    blurredBackdrop: true,
  },
  'robotic-arm-4dof': {
    image: 'robotic-arm/arm-side.jpg',
  },
  'canam-wheel-speed': {
    image: 'canam-wheel-speed/sensor-parts.jpg',
    fit: 'contain',
    frame: 'paper',
    blurredBackdrop: true,
  },
  'cycloidal-gearbox': {
    image: 'cycloidal-gearbox/hero.jpg',
  },
  'capstone-dispenser': {
    image: 'capstone-dispenser/dashboard.png',
    fit: 'contain',
    frame: 'paper',
  },
  'beamng-ros2': {
    image: 'beamng-ros2/sim-plotjuggler.webp',
    fit: 'contain',
    frame: 'dark',
  },
  'leaf-vacuum': {
    image: 'leaf-vacuum/hero.jpg',
  },
  'heartbeat-sensor': {
    image: 'heartbeat-sensor/hero.jpg',
  },
  tokenjar: {
    image: 'tokenjar/hero.webp',
    fit: 'contain',
    frame: 'dark',
  },
  'voron-3d-printers': {
    image: 'voron/voron-2.jpg',
    fit: 'contain',
    frame: 'paper',
    blurredBackdrop: true,
  },
  geoagent: {
    image: 'geoagent/pipeline-processed.png',
    fit: 'contain',
    frame: 'dark',
  },
  daytradeagents: {
    image: 'daytradeagents/chart_preview.png',
    fit: 'contain',
    frame: 'dark',
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const media = mediaSpecs[project.id] ?? {};
  const preferredImage = media.image ?? project.images[0];
  const orderedImages = project.images.includes(preferredImage)
    ? [
        preferredImage,
        ...project.images.filter((image) => image !== preferredImage),
      ]
    : project.images;

  return (
    <motion.article
      id={`project-${project.id}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -35px 0px' }}
      transition={{
        duration: 0.58,
        delay: Math.min((index % 2) * 0.06, 0.06),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[1.4rem] border border-black/10 bg-[var(--surface)] transition-colors duration-300 hover:border-black/20"
    >
      <ImageCarousel
        images={orderedImages}
        alt={project.title}
        className="aspect-[4/3] w-full border-b border-black/10"
        fit={media.fit}
        fitByImage={media.fitByImage}
        frame={media.frame}
        blurredBackdrop={media.blurredBackdrop}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
          <span>{project.context ?? project.category}</span>
          <span>{project.date}</span>
        </div>

        <h4 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)] sm:text-2xl">
          {project.title}
        </h4>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink)]/80 sm:text-[15px]">
          {project.outcome ?? project.description}
        </p>

        {project.role && (
          <div className="mt-5 border-t border-black/10 pt-4 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
            <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              Role
            </span>
            {project.role}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tag}
              className={`rounded-full border border-black/10 px-2.5 py-1 text-[10px] text-[var(--muted)] ${
                tagIndex === 2 ? 'hidden sm:inline-flex' : 'inline-flex'
              }`}
            >
              {tag}
            </span>
          ))}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent-strong)]"
              aria-label={`View ${project.title} repository`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              Repository
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-16 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 border-t border-black/10 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              <span className="text-[var(--accent-strong)]">04 / 06</span>
              Projects
            </p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[var(--ink)]">
              Selected engineering work
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Twelve projects organized by discipline. Each card shows ownership
            and outcome. Swipe or select either image edge to browse; select
            the center to enlarge.
          </p>
        </div>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24 lg:space-y-28">
          {categorySpecs.map((categorySpec) => {
            const categoryProjects = categorySpec.projectIds
              .map((id) => projects.find((project) => project.id === id))
              .filter((project): project is Project => Boolean(project));

            return (
              <section
                key={categorySpec.category}
                aria-labelledby={`category-${categorySpec.number}`}
                className="grid gap-8 border-t border-black/10 pt-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-14"
              >
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                    {categorySpec.number} / 03
                  </p>
                  <h3
                    id={`category-${categorySpec.number}`}
                    className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--ink)]"
                  >
                    {categorySpec.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
                    {categorySpec.description}
                  </p>
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {categoryProjects.length} projects
                  </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
                  {categoryProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-20 flex justify-end border-t border-black/10 pt-5 md:mt-24">
          <a
            href="#vehicles"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--ink)]"
          >
            Continue to the garage
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
