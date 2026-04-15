'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { education } from '@/data/education';
import { fadeUp, stagger } from '@/lib/motion';

export default function Education() {
  return (
    <section id="education" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Education" title="Where I've learned." />

      <div className="space-y-5">
        {education.map((edu, i) => (
          <motion.article
            key={edu.school}
            {...fadeUp({ delay: stagger(i), amount: 0.3 })}
            className="glass rounded-3xl p-6 md:p-8 hover:border-black/15 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.15)] transition-all"
          >
            <div className="flex items-start gap-5">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-black/5 items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-[#1d1d1f]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                    {edu.school}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {edu.status === 'incoming' && (
                      <span className="text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                        Incoming
                      </span>
                    )}
                    <span className="text-xs md:text-sm text-[#86868b] whitespace-nowrap">
                      {edu.date}
                    </span>
                  </div>
                </div>
                <p className="text-[#6e6e73] mb-3">{edu.degree}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {edu.location && (
                    <span className="inline-flex items-center gap-1.5 text-[#86868b]">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  )}
                  {edu.gpa && (
                    <span className="text-[#1d1d1f]">
                      GPA <span className="font-medium">{edu.gpa}</span>
                    </span>
                  )}
                </div>

                {edu.honors && (
                  <p className="mt-3 text-sm text-[#1d1d1f]/80">
                    <span className="text-[#86868b]">Honors — </span>
                    {edu.honors}
                  </p>
                )}
                {edu.activities && edu.activities.length > 0 && (
                  <p className="mt-1 text-sm text-[#1d1d1f]/80">
                    <span className="text-[#86868b]">Activities — </span>
                    {edu.activities.join(' · ')}
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
