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
import SectionHeader from './SectionHeader';
import PlaceholderImage from './PlaceholderImage';
import ImageCarousel from './ImageCarousel';
import SectionWatermark from './SectionWatermark';
import AmbientMarquee from './AmbientMarquee';
import { vehicles } from '@/data/vehicles';
import { fadeUp, stagger } from '@/lib/motion';

function VehicleCard({
  v,
  i,
}: {
  v: (typeof vehicles)[number];
  i: number;
}) {
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
    <motion.figure
      ref={ref}
      {...fadeUp({ delay: stagger(i), amount: 0.2 })}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      className="group relative glass rounded-3xl overflow-hidden hover:border-black/15 hover:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow]"
      data-cursor="expand"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.14), rgba(99,102,241,0.04) 35%, transparent 65%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#6366f1]/0 group-hover:ring-[#6366f1]/20 transition z-[6]" />

      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="relative">
          {v.images.length > 1 ? (
            <ImageCarousel
              images={v.images}
              alt={v.name}
              className="aspect-[4/3] w-full"
            />
          ) : (
            <PlaceholderImage
              src={`/images/${v.images[0]}`}
              alt={v.name}
              label={`placeholder · ${v.images[0]}`}
              className="aspect-[4/3] w-full"
            />
          )}
          {v.current && (
            <span className="absolute top-3 left-3 z-10 text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/90 text-[#1d1d1f] border border-black/10 backdrop-blur-sm">
              Current
            </span>
          )}
        </div>
        <figcaption className="p-6">
          <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f] mb-1">
            {v.name}
          </h3>
          <p className="text-xs text-[#86868b] mb-2 uppercase tracking-widest">
            {v.period}
          </p>
          <p className="text-sm text-[#6e6e73] leading-relaxed">{v.notes}</p>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function VehicleBuilds() {
  return (
    <section
      id="vehicles"
      className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionWatermark text="garage" corner="bottom-left" />

      <div className="relative">
        <SectionHeader
          eyebrow="The Garage"
          title="Cars I've built, broken, and loved."
          subtitle="Personal builds and daily drivers. Wrenching on cars is how I got into mechanical engineering in the first place."
          index={6}
          total={7}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} v={v} i={i} />
          ))}
        </div>

        <AmbientMarquee
          serif="Wrench · Tune · Drive · Track · Rebuild · Tinker · Repeat ·"
          mono="bolt · torque · tune · test · repeat ·"
        />
      </div>
    </section>
  );
}
