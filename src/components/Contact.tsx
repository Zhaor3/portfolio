'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import SectionWatermark from './SectionWatermark';
import { reveal } from '@/lib/motion';

const primaryChannels = [
  {
    label: 'Email',
    value: 'ruoxiangzhao@gmail.com',
    href: 'mailto:ruoxiangzhao@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'ruoxiang-zhao-012108272',
    href: 'https://www.linkedin.com/in/ruoxiang-zhao-012108272',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '@Zhaor3',
    href: 'https://github.com/Zhaor3',
    Icon: Github,
  },
];

const secondaryChannels = [
  { label: 'Phone', value: '+1 (973) 941-0240', href: 'tel:+19739410240' },
  {
    label: 'Instagram',
    value: '@simonnn_z',
    href: 'https://www.instagram.com/simonnn_z',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 px-6 py-24 md:py-32 max-w-5xl mx-auto overflow-hidden"
    >
      <SectionWatermark text="hello" corner="bottom-left" fontSize="clamp(12rem, 24vw, 30rem)" />

      <div className="relative">
      <SectionHeader
        eyebrow="Get in touch"
        title="Let's build something"
        subtitle="Open to Summer 2027 internship conversations and opportunities at the intersection of robotics, mechanical design, controls, and intelligent systems"
        index={6}
        total={6}
        align="center"
      />

      <motion.div
        {...reveal({ amount: 0.3 })}
        className="glass rounded-3xl p-6 md:p-10"
      >
        <div className="grid gap-3 md:grid-cols-3">
          {primaryChannels.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener' : undefined}
              className="group flex min-h-24 items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-black/[0.03]"
            >
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <Icon className="w-4 h-4 text-[#1d1d1f]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-widest uppercase text-[#66666c]">{label}</p>
                <p className="text-sm md:text-base text-[#1d1d1f] truncate">{value}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#66666c] group-hover:text-[#1d1d1f] group-hover:rotate-12 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-black/[0.08] pt-5 text-sm text-[#66666c]">
          {secondaryChannels.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener' : undefined}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 transition-colors hover:text-[#1d1d1f]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{label}</span>
              <span className="text-[#1d1d1f]">{value}</span>
            </a>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
