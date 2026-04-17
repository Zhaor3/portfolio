'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import SectionWatermark from './SectionWatermark';
import { experience } from '@/data/experience';
import { fadeUp, stagger } from '@/lib/motion';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto overflow-hidden"
    >
      <SectionWatermark text="field" corner="bottom-right" />

      <div className="relative">
      <SectionHeader
        eyebrow="Experience"
        title="Research, internships, and teams."
        index={3}
        total={7}
      />

      <div className="relative">
        {/* Vertical rail */}
        <div
          aria-hidden
          className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-black/10"
        />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              {...fadeUp({ delay: stagger(i), amount: 0.25 })}
              className="relative pl-12 md:pl-16"
            >
              {/* Dot */}
              <div className="absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center">
                <Briefcase className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#1d1d1f]" />
              </div>

              <div className="glass rounded-3xl p-6 md:p-8 hover:border-black/15 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.15)] transition-all">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                      {exp.role}
                    </h3>
                    <p className="text-[#6e6e73] mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-xs md:text-sm text-[#86868b] whitespace-nowrap">
                      {exp.date}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#86868b]">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[#1d1d1f]/80 leading-relaxed mt-3">{exp.summary}</p>

                {exp.details && exp.details.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {exp.details.map((d, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#6e6e73] pl-4 relative leading-relaxed"
                      >
                        <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-[#86868b]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-black/[0.04] text-[#1d1d1f]/75 border border-black/[0.06]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
