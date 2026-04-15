'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#vehicles', label: 'Garage' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.4, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.08]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="backdrop-blur-xl backdrop-saturate-150"
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) => `rgba(251, 251, 253, ${v})`,
            ),
            borderBottom: useTransform(
              borderOpacity,
              (v) => `1px solid rgba(0, 0, 0, ${v})`,
            ),
          }}
        >
          <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Brand */}
            <a
              href="#hero"
              className="font-semibold tracking-tight text-[#1d1d1f] hover:opacity-80 transition-opacity"
            >
              Ruoxiang Zhao
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full btn-primary"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>

              {/* Mobile trigger */}
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="md:hidden p-2 -mr-2 text-[#1d1d1f]"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-16 left-4 right-4 z-50 md:hidden rounded-3xl glass-strong p-6"
        >
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-medium text-[#1d1d1f] py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-black/10">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
}
