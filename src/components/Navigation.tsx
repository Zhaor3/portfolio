'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/paths';

const links = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#education', id: 'education', label: 'Education' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#vehicles', id: 'vehicles', label: 'Garage' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.4, 0.88]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.1]);
  const backgroundColor = useTransform(
    bgOpacity,
    (value) => `rgba(242, 240, 233, ${value})`,
  );
  const borderBottom = useTransform(
    borderOpacity,
    (value) => `1px solid rgba(15, 15, 25, ${value})`,
  );
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.25,
  });

  useEffect(() => {
    const sectionIds = ['hero', ...links.map((link) => link.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0, 0.1, 0.35, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="backdrop-blur-xl backdrop-saturate-150"
          style={{ backgroundColor, borderBottom }}
        >
          <nav
            aria-label="Primary navigation"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
          >
            <a
              href="#hero"
              className="rounded-md text-xs font-medium tracking-[-0.01em] text-[var(--ink)] transition-opacity hover:opacity-70 sm:text-[13px]"
              aria-label="Ruoxiang Zhao, back to top"
            >
              Ruoxiang Zhao
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative inline-flex min-h-11 items-center rounded-full px-3 text-sm transition-colors ${
                        isActive
                          ? 'bg-black/[0.05] text-[var(--ink)]'
                          : 'text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={withBase('/resume.pdf')}
                target="_blank"
                rel="noopener"
                className="btn-primary hidden min-h-11 items-center gap-1.5 rounded-full px-4 text-sm sm:inline-flex"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden />
                View Résumé
              </a>

              <button
                ref={triggerRef}
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="primary-mobile-menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-black/[0.05] lg:hidden"
                onClick={() => setOpen((current) => !current)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          <motion.div
            aria-hidden
            className="h-[2px] origin-left bg-gradient-to-r from-[var(--ink)] via-[var(--accent)] to-[var(--accent)]"
            style={{ scaleX: progress }}
          />
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#1d1d1f]/10 backdrop-blur-[2px] lg:hidden"
              onPointerDown={() => setOpen(false)}
            />
            <motion.div
              ref={drawerRef}
              id="primary-mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong fixed inset-x-4 top-20 z-50 rounded-3xl p-4 lg:hidden"
            >
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          aria-current={isActive ? 'location' : undefined}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium transition-colors ${
                            isActive
                              ? 'bg-black/[0.05] text-[var(--ink)]'
                              : 'text-[var(--muted)] hover:bg-black/[0.03] hover:text-[var(--ink)]'
                          }`}
                        >
                          {link.label}
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                          )}
                        </a>
                      </li>
                    );
                  })}
                  <li className="mt-2 border-t border-black/10 pt-3">
                    <a
                      href={withBase('/resume.pdf')}
                      target="_blank"
                      rel="noopener"
                      onClick={() => setOpen(false)}
                      className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 font-medium"
                    >
                      <FileText className="h-4 w-4" aria-hidden />
                      View Résumé
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
