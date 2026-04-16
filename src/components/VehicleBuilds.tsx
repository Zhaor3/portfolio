'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import PlaceholderImage from './PlaceholderImage';
import ImageCarousel from './ImageCarousel';
import { vehicles } from '@/data/vehicles';
import { fadeUp, stagger } from '@/lib/motion';

export default function VehicleBuilds() {
  return (
    <section id="vehicles" className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="The Garage"
        title="Cars I've built, broken, and loved."
        subtitle="Personal builds and daily drivers. Wrenching on cars is how I got into mechanical engineering in the first place."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {vehicles.map((v, i) => (
          <motion.figure
            key={v.id}
            {...fadeUp({ delay: stagger(i), amount: 0.2 })}
            whileHover={{ y: -4 }}
            className="group glass rounded-3xl overflow-hidden hover:border-black/15 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] transition-all"
          >
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
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
