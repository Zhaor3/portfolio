'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Instagram, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { reveal } from '@/lib/motion';

const channels = [
  {
    label: 'Email',
    value: 'ruoxiangzhao@gmail.com',
    href: 'mailto:ruoxiangzhao@gmail.com',
    Icon: Mail,
  },
  {
    label: 'Phone',
    value: '+1 (973) 941-0240',
    href: 'tel:+19739410240',
    Icon: Phone,
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
  {
    label: 'Instagram',
    value: '@simonnn_z',
    href: 'https://www.instagram.com/simonnn_z',
    Icon: Instagram,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Get in touch"
        title="Let's build something."
        subtitle="Open to Summer 2026 internship conversations, research chats, and anything else at the intersection of mechanics, controls, and intelligent systems."
      />

      <motion.div
        {...reveal({ amount: 0.3 })}
        className="glass rounded-3xl p-6 md:p-10"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {channels.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener' : undefined}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-black/[0.03] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <Icon className="w-4 h-4 text-[#1d1d1f]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-widest uppercase text-[#86868b]">{label}</p>
                <p className="text-sm md:text-base text-[#1d1d1f] truncate">{value}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:rotate-12 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
