'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { featuredSkills, skillGroups } from '@/data/skills';
import { withBase } from '@/lib/paths';

const bio = [
  'I am a Mechanical Engineering student at Rensselaer Polytechnic Institute and an incoming M.S. in Robotics student at the University of Michigan, with interests in robotics, autonomous vehicles, control systems, and product development.',
  'My background combines hands-on mechanical engineering with programming, prototyping, and system thinking. I enjoy taking projects from concept to implementation through CAD, fabrication, testing, and control development. Through research and engineering projects I have developed experience in Python, ROS, MATLAB, vehicle dynamics, and practical problem-solving in multidisciplinary environments.',
  'I am most motivated by work that brings together mechanics, controls, and intelligent systems to solve real-world problems. I am currently seeking opportunities to continue building my skills in robotics, autonomous systems, and advanced engineering design.',
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="About"
        title="Mechanics, controls, and intelligent systems."
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 space-y-5"
        >
          {bio.map((para, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed text-[#1d1d1f]/80">
              {para}
            </p>
          ))}
          <div className="pt-4">
            <a
              href={withBase('/resume.pdf')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] hover:gap-3 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Resume
              <span aria-hidden className="text-[#86868b]">→</span>
            </a>
          </div>
        </motion.div>

        {/* Featured skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-3xl p-7">
            <p className="text-xs tracking-[0.25em] uppercase text-[#86868b] mb-4">
              Top Skills
            </p>
            <ul className="space-y-3">
              {featuredSkills.map((skill) => (
                <li
                  key={skill}
                  className="text-[#1d1d1f] font-medium flex items-center gap-3"
                >
                  <span className="w-1 h-1 rounded-full bg-[#1d1d1f]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Full skills grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#86868b] mb-8 text-center">
          Full toolkit
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="glass rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-[#1d1d1f] mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full bg-black/[0.04] text-[#1d1d1f]/80 border border-black/[0.06]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
