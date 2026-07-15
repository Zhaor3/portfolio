'use client';

/**
 * Experimental interactive showcase section.
 *
 * Art direction: **Engineering Notebook** — thin drafting lines, dimension
 * marks, radial dials. Paired with the site-wide ink-bleed cursor
 * (GlobalCursor) and site-wide drafting frame (GlobalBlueprint).
 *
 * Section-local interaction layers (reduced-motion-safe):
 *   1. Dense local blueprint (dimension arrows, radial dial, callout)
 *   2. Parallax geometric shapes drift with mouse at 3 depths
 *   3. Scroll-linked heading (blur → sharp, y-offset)
 *   4. Split-letter title reveal
 *   5. Hairline underscore draws under heading on enter
 *   6. Asymmetric bento (1 hero + 2 small)
 *   7. Per-card spotlight + 3D tilt + scroll-linked vertical drift
 *   8. Magnetic Explore buttons
 *   9. Giant outlined ghost watermark ("motion" cropped off-edge)
 *   10. Counter-rotating thin blurred aura strips (not a ticker bar)
 */

import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

type ShowcaseItem = {
  id: string;
  number: string;
  label: string;
  date: string;
  title: string;
  description: string;
  image: string;
  meta: string[];
  href: string;
};

const items: ShowcaseItem[] = [
  {
    id: 'canam-brake',
    number: '01',
    label: 'RESEARCH',
    date: '2025–26 — XAL LAB',
    title: 'Can-Am X3 Brake Automation',
    description:
      'Closed-loop brake automation for autonomous control under slipping conditions. Presented to Toyota Research Institute.',
    image: 'canam-brake/hero.jpg',
    meta: ['ROS 2', 'Python', 'Mechatronics', 'Vehicle Dynamics'],
    href: '#project-canam-brake',
  },
  {
    id: 'tokenjar',
    number: '02',
    label: 'HARDWARE',
    date: '2026 — PERSONAL',
    title: 'TokenJar',
    description:
      'ESP32-S3 desk gadget showing live Anthropic + OpenAI spend on a 2" IPS LCD.',
    image: 'tokenjar/hero.webp',
    meta: ['ESP32-S3', 'C++', 'REST'],
    href: '#project-tokenjar',
  },
  {
    id: 'daytradeagents',
    number: '03',
    label: 'AI SYSTEM',
    date: '2026 — PERSONAL',
    title: 'DayTradeAgents',
    description:
      'Eleven LLM agents debate trades through a six-phase research pipeline.',
    image: 'daytradeagents/banner.png',
    meta: ['Multi-Agent', 'Claude', 'Python'],
    href: '#project-daytradeagents',
  },
];

// --- Magnetic CTA -------------------------------------------------------

function MagneticLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });
  const reduce = useReducedMotion();

  function handleMove(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.35);
    y.set(dy * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      data-cursor="expand"
    >
      {children}
    </motion.a>
  );
}

// --- Showcase card -----------------------------------------------------

function ShowcaseCard({
  item,
  variant,
  parallaxY,
}: {
  item: ShowcaseItem;
  variant: 'large' | 'small';
  parallaxY: ReturnType<typeof useTransform<number, string>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reduce = useReducedMotion();

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 160,
    damping: 18,
    mass: 0.4,
  });

  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx);
    my.set(ny);
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

  const isLarge = variant === 'large';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        y: parallaxY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full overflow-hidden rounded-3xl glass hover:border-black/10"
      data-cursor="expand"
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}/images/${item.image}`}
          alt={item.title}
          className="h-full w-full object-cover scale-[1.08] group-hover:scale-[1.14] transition-transform duration-[900ms] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(${isLarge ? '420px' : '300px'} circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.22), rgba(99,102,241,0.06) 35%, transparent 60%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 group-hover:ring-white/40 transition" />

      <div
        className={`relative z-10 flex h-full flex-col justify-between ${
          isLarge ? 'p-7 md:p-10' : 'p-6 md:p-7'
        }`}
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-white/80 uppercase drop-shadow-sm">
          <span className="text-white">{item.number}</span>
          <span className="h-px w-6 bg-white/40" />
          <span>{item.label}</span>
          <span className="text-white/50">·</span>
          <span className="text-white/60">{item.date}</span>
        </div>

        {isLarge ? (
          <div
            className="relative overflow-hidden rounded-2xl p-6 md:p-7"
            style={{
              background: 'rgba(15, 15, 25, 0.55)',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -12px rgba(0,0,0,0.35)',
            }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
              {item.title}
            </h3>

            <p className="mt-3 max-w-xl text-white/85 text-sm md:text-base">
              {item.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {item.meta.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/85 px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <MagneticLink
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#1d1d1f] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] hover:bg-white/95 transition-colors"
              >
                View details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticLink>
            </div>
          </div>
        ) : (
          <a
            href={item.href}
            className="group/card block relative overflow-hidden rounded-xl px-4 py-3 transition-colors hover:bg-black/40"
            style={{
              background: 'rgba(15, 15, 25, 0.45)',
              backdropFilter: 'blur(14px) saturate(140%)',
              WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px -14px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] text-white leading-[1.1]">
                {item.title}
              </h3>
              <ArrowUpRight className="h-4 w-4 text-white/70 flex-shrink-0 mt-0.5 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {item.meta.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/70 px-1.5 py-0.5 rounded-full border border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        )}
      </div>
    </motion.div>
  );
}

// --- Blueprint background ----------------------------------------------
//
// Inspired by drafting-table engineering drawings: hairlines, tick marks,
// dimension annotations, corner reticles, and a radial dial. Monochrome;
// reads as technical authorship without tipping into kitsch.

function BlueprintBackground() {
  const HAIR = 'rgba(15,15,25,0.10)';
  const HAIR_SOFT = 'rgba(15,15,25,0.06)';
  const ACCENT = 'rgba(99,102,241,0.35)';

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1400 1400"
      style={{
        maskImage:
          'radial-gradient(ellipse 80% 70% at center, rgba(0,0,0,0.95), transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at center, rgba(0,0,0,0.95), transparent 85%)',
      }}
    >
      {/* Top construction line + tick ruler */}
      <g>
        <line x1="80" y1="140" x2="1320" y2="140" stroke={HAIR} strokeWidth="0.6" />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 80 + i * 54;
          const long = i % 4 === 0;
          return (
            <line
              key={i}
              x1={x}
              y1="140"
              x2={x}
              y2={long ? 154 : 146}
              stroke={HAIR}
              strokeWidth="0.6"
            />
          );
        })}
        <text
          x="80"
          y="128"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="rgba(15,15,25,0.35)"
          letterSpacing="0.2em"
        >
          0000
        </text>
        <text
          x="1320"
          y="128"
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="rgba(15,15,25,0.35)"
          letterSpacing="0.2em"
        >
          1240
        </text>
      </g>

      {/* Bottom construction line */}
      <g>
        <line
          x1="80"
          y1="1260"
          x2="1320"
          y2="1260"
          stroke={HAIR}
          strokeWidth="0.6"
          strokeDasharray="4 6"
        />
        <text
          x="80"
          y="1280"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="rgba(15,15,25,0.30)"
          letterSpacing="0.2em"
        >
          § FEATURED · ENGR-01 · REV A
        </text>
      </g>

      {/* Top-left corner reticle */}
      <g transform="translate(60 60)">
        <line x1="0" y1="10" x2="20" y2="10" stroke={HAIR} strokeWidth="0.6" />
        <line x1="10" y1="0" x2="10" y2="20" stroke={HAIR} strokeWidth="0.6" />
        <circle cx="10" cy="10" r="3" stroke={HAIR} strokeWidth="0.5" fill="none" />
      </g>

      {/* Top-right corner reticle */}
      <g transform="translate(1320 60)">
        <line x1="0" y1="10" x2="20" y2="10" stroke={HAIR} strokeWidth="0.6" />
        <line x1="10" y1="0" x2="10" y2="20" stroke={HAIR} strokeWidth="0.6" />
        <circle cx="10" cy="10" r="3" stroke={HAIR} strokeWidth="0.5" fill="none" />
      </g>

      {/* Bottom-left corner reticle */}
      <g transform="translate(60 1320)">
        <line x1="0" y1="10" x2="20" y2="10" stroke={HAIR} strokeWidth="0.6" />
        <line x1="10" y1="0" x2="10" y2="20" stroke={HAIR} strokeWidth="0.6" />
        <circle cx="10" cy="10" r="3" stroke={HAIR} strokeWidth="0.5" fill="none" />
      </g>

      {/* Bottom-right corner reticle + origin label */}
      <g transform="translate(1320 1320)">
        <line x1="0" y1="10" x2="20" y2="10" stroke={HAIR} strokeWidth="0.6" />
        <line x1="10" y1="0" x2="10" y2="20" stroke={HAIR} strokeWidth="0.6" />
        <circle cx="10" cy="10" r="3" stroke={HAIR} strokeWidth="0.5" fill="none" />
      </g>

      {/* Large construction circle with diameter */}
      <g transform="translate(1080 860)">
        <circle cx="0" cy="0" r="170" stroke={HAIR} strokeWidth="0.6" fill="none" />
        <circle cx="0" cy="0" r="100" stroke={HAIR_SOFT} strokeWidth="0.5" fill="none" />
        <line x1="-170" y1="0" x2="170" y2="0" stroke={HAIR_SOFT} strokeWidth="0.5" />
        <line x1="0" y1="-170" x2="0" y2="170" stroke={HAIR_SOFT} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="2" fill={ACCENT} />
        <text
          x="180"
          y="4"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="rgba(15,15,25,0.35)"
          letterSpacing="0.15em"
        >
          ∅ 340
        </text>
      </g>

      {/* Radial dial (quarter-arc) with degree marks, top-right */}
      <g transform="translate(1200 260)">
        <path
          d="M 0 120 A 120 120 0 0 1 120 0"
          stroke={HAIR}
          strokeWidth="0.6"
          fill="none"
        />
        {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
          const rad = ((90 - deg) * Math.PI) / 180;
          const r1 = 120;
          const r2 = deg % 45 === 0 ? 108 : 114;
          return (
            <line
              key={deg}
              x1={Math.cos(rad) * r1}
              y1={120 - Math.sin(rad) * r1}
              x2={Math.cos(rad) * r2}
              y2={120 - Math.sin(rad) * r2}
              stroke={HAIR}
              strokeWidth="0.6"
            />
          );
        })}
        <text
          x="60"
          y="80"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fill="rgba(15,15,25,0.35)"
          letterSpacing="0.2em"
        >
          45°
        </text>
      </g>

      {/* Left-side vertical ruler strip */}
      <g>
        <line x1="130" y1="260" x2="130" y2="1100" stroke={HAIR} strokeWidth="0.5" />
        {Array.from({ length: 16 }).map((_, i) => {
          const y = 260 + i * 56;
          const long = i % 4 === 0;
          return (
            <line
              key={i}
              x1="130"
              y1={y}
              x2={long ? 120 : 126}
              y2={y}
              stroke={HAIR}
              strokeWidth="0.5"
            />
          );
        })}
        <text
          x="110"
          y="260"
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fill="rgba(15,15,25,0.30)"
          letterSpacing="0.2em"
        >
          H 840
        </text>
      </g>

      {/* Dimension line with arrowheads, mid-right */}
      <g transform="translate(1160 560)">
        <line x1="0" y1="0" x2="0" y2="160" stroke={HAIR} strokeWidth="0.5" />
        <path d="M -4 4 L 0 0 L 4 4" stroke={HAIR} strokeWidth="0.5" fill="none" />
        <path d="M -4 156 L 0 160 L 4 156" stroke={HAIR} strokeWidth="0.5" fill="none" />
        <text
          x="10"
          y="84"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fill="rgba(15,15,25,0.35)"
          letterSpacing="0.15em"
        >
          160.0
        </text>
      </g>

      {/* Small callout + leader line */}
      <g>
        <line
          x1="420"
          y1="300"
          x2="520"
          y2="240"
          stroke={HAIR}
          strokeWidth="0.5"
        />
        <circle cx="420" cy="300" r="3" stroke={HAIR} strokeWidth="0.5" fill="none" />
        <text
          x="525"
          y="236"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fill="rgba(15,15,25,0.32)"
          letterSpacing="0.15em"
        >
          A — hero
        </text>
      </g>

      {/* Scattered tick marks */}
      {[
        [300, 900],
        [560, 760],
        [760, 1060],
        [220, 520],
        [940, 420],
        [640, 220],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <line x1="-4" y1="0" x2="4" y2="0" stroke={HAIR_SOFT} strokeWidth="0.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke={HAIR_SOFT} strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}

// --- Parallax geometric shapes (3 depths) -----------------------------

function FloatingShapes({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  const x1 = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 60, damping: 18 });
  const y1 = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 60, damping: 18 });
  const x2 = useSpring(useTransform(mx, [-0.5, 0.5], [28, -28]), { stiffness: 55, damping: 20 });
  const y2 = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), { stiffness: 55, damping: 20 });
  const x3 = useSpring(useTransform(mx, [-0.5, 0.5], [-40, 40]), { stiffness: 45, damping: 22 });
  const y3 = useSpring(useTransform(my, [-0.5, 0.5], [-30, 30]), { stiffness: 45, damping: 22 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.svg
        style={{ x: x3, y: y3 }}
        className="absolute -left-20 top-[22%]"
        width="260"
        height="260"
        viewBox="0 0 260 260"
      >
        <circle cx="130" cy="130" r="120" stroke="rgba(15,15,25,0.08)" strokeWidth="1" fill="none" />
        <circle cx="130" cy="130" r="70" stroke="rgba(15,15,25,0.06)" strokeWidth="1" fill="none" />
      </motion.svg>

      <motion.svg
        style={{ x: x2, y: y2, rotate: 12 }}
        className="absolute right-[6%] top-[60%]"
        width="140"
        height="140"
        viewBox="0 0 140 140"
      >
        <rect x="10" y="10" width="120" height="120" stroke="rgba(15,15,25,0.09)" strokeWidth="1" fill="none" />
        <rect x="45" y="45" width="50" height="50" stroke="rgba(15,15,25,0.09)" strokeWidth="1" fill="none" />
      </motion.svg>

      <motion.svg
        style={{ x: x1, y: y1 }}
        className="absolute left-[46%] top-[12%]"
        width="46"
        height="46"
        viewBox="0 0 46 46"
      >
        <line x1="23" y1="2" x2="23" y2="44" stroke="rgba(99,102,241,0.35)" strokeWidth="1" />
        <line x1="2" y1="23" x2="44" y2="23" stroke="rgba(99,102,241,0.35)" strokeWidth="1" />
        <circle cx="23" cy="23" r="2" fill="rgba(99,102,241,0.5)" />
      </motion.svg>
    </div>
  );
}

// --- Aura typography (replaces big ticker) ----------------------------
//
// Two small whisper-thin text strips counter-rotating very slowly with a
// slight blur, sitting just above an enormous outlined-serif watermark
// cropped off the bottom-right edge. Reads as ambient atmosphere, not a
// banner of words.

function AuraStrips({ reduce }: { reduce: boolean | null }) {
  const row1 = 'Design · Precision · Control · Iteration · Motion · Rigor · Craft ·';
  const row2 = 'simulate · build · ship · debug · refine · measure · tune ·';

  return (
    <div
      aria-hidden
      className="relative mt-24 md:mt-32 select-none"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      {/* Row 1 — italic serif drifting right, 16px, ultra-low opacity */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ x: '0%' }}
          animate={reduce ? { x: '0%' } : { x: '-50%' }}
          transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap text-[#1d1d1f]"
          style={{
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontStyle: 'italic',
            fontSize: 15,
            letterSpacing: '0.08em',
            opacity: 0.12,
            filter: 'blur(0.4px)',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pr-12">
              {row1}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — mono drifting left, smaller, lowercase */}
      <div className="overflow-hidden mt-4">
        <motion.div
          initial={{ x: '-50%' }}
          animate={reduce ? { x: '-50%' } : { x: '0%' }}
          transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#1d1d1f',
            opacity: 0.18,
            filter: 'blur(0.3px)',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pr-10">
              {row2}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function GhostWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute select-none"
      style={{
        right: '-6vw',
        bottom: '-4rem',
        fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(9rem, 20vw, 22rem)',
        lineHeight: 0.8,
        letterSpacing: '-0.04em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(15,15,25,0.04)',
        zIndex: 0,
      }}
    >
      motion
    </div>
  );
}

// --- Main section ------------------------------------------------------

export default function FeaturedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mxNorm = useMotionValue(0);
  const myNorm = useMotionValue(0);
  const stillY = useMotionValue('0%');

  useEffect(() => {
    if (reduce) return;
    const node = sectionRef.current;
    if (!node) return;

    function handleMove(e: MouseEvent) {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      mxNorm.set((e.clientX - rect.left) / rect.width - 0.5);
      myNorm.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
      mxNorm.set(0);
      myNorm.set(0);
    }

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, [mxNorm, myNorm, reduce]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0.6, 1]);
  const headingBlur = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['blur(14px)', 'blur(0px)']
  );
  const cardHeroY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const cardAY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const cardBY = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);

  // Watermark drifts very slowly on scroll — adds a breathing feel.
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative z-10 overflow-hidden px-6 py-28 md:py-40"
    >
      {/* 1 — Blueprint SVG */}
      <BlueprintBackground />

      {/* 2 — Ghost watermark (massive outlined "motion" cropped off corner) */}
      <motion.div
        style={{ x: reduce ? 0 : watermarkX }}
        className="absolute inset-0 pointer-events-none"
      >
        <GhostWatermark />
      </motion.div>

      {/* 3 — Parallax floating shapes */}
      <FloatingShapes mx={mxNorm} my={myNorm} />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          style={{
            y: reduce ? 0 : headingY,
            opacity: reduce ? 1 : headingOpacity,
            filter: reduce ? 'none' : headingBlur,
          }}
        >
          <SectionHeader
            eyebrow="Featured"
            title="Selected work"
            subtitle="Three projects that show how I move from engineering problem to working system"
            index={1}
            total={7}
            status="3 case studies"
          />
        </motion.div>

        {/* Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
          <div className="md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-[580px]">
            <ShowcaseCard
              item={items[0]}
              variant="large"
              parallaxY={reduce ? stillY : cardHeroY}
            />
          </div>
          <div className="min-h-[240px] md:min-h-[282px]">
            <ShowcaseCard
              item={items[1]}
              variant="small"
              parallaxY={reduce ? stillY : cardAY}
            />
          </div>
          <div className="min-h-[240px] md:min-h-[282px]">
            <ShowcaseCard
              item={items[2]}
              variant="small"
              parallaxY={reduce ? stillY : cardBY}
            />
          </div>
        </div>

        {/* Aura strips — replaces the big ticker marquee */}
        <AuraStrips reduce={!!reduce} />
      </div>
    </section>
  );
}
