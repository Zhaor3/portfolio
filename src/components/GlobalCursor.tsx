'use client';

/**
 * Site-wide cursor atmosphere.
 *
 * Two fixed-to-viewport layers that follow the pointer:
 *  - Ink-bleed pool: a soft 420px radial using mix-blend-multiply, so it
 *    subtly darkens whatever's underneath (aurora, text, cards) instead of
 *    adding color. Gives the page a sense of "being illuminated" near the
 *    cursor without ever reading as a glow.
 *  - Cursor ring: a 22px hairline circle that grows to 56px over anything
 *    marked `data-cursor="expand"` or a native link/button. Default system
 *    cursor stays visible; the ring sits on top as an additional hint.
 *
 * Bails on touch devices (ring/pool feel wrong with finger input) and
 * honors prefers-reduced-motion (renders nothing).
 */

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

export default function GlobalCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const ringX = useMotionValue(-200);
  const ringY = useMotionValue(-200);
  const inkX = useMotionValue(-500);
  const inkY = useMotionValue(-500);

  const springRingX = useSpring(ringX, { stiffness: 500, damping: 35, mass: 0.3 });
  const springRingY = useSpring(ringY, { stiffness: 500, damping: 35, mass: 0.3 });
  const springInkX = useSpring(inkX, { stiffness: 90, damping: 22, mass: 0.8 });
  const springInkY = useSpring(inkY, { stiffness: 90, damping: 22, mass: 0.8 });

  const inkBg = useMotionTemplate`radial-gradient(420px circle at ${springInkX}px ${springInkY}px, rgba(99,102,241,0.10), rgba(99,102,241,0.035) 45%, transparent 75%)`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch =
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    const finePointer = window.matchMedia?.('(pointer: fine)').matches ?? true;
    setEnabled(!isTouch && finePointer);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;

    function onMove(e: MouseEvent) {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      inkX.set(e.clientX);
      inkY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const expand = !!(
        target &&
        target.closest('[data-cursor="expand"], a, button, [role="button"]')
      );
      setExpanded(expand);
    }

    function onLeave() {
      setVisible(false);
      setExpanded(false);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, reduce, ringX, ringY, inkX, inkY]);

  if (!enabled || reduce) return null;

  const size = expanded ? 56 : 22;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 mix-blend-multiply transition-opacity duration-700"
        style={{ background: inkBg, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[60] rounded-full border mix-blend-multiply"
        style={{
          left: springRingX,
          top: springRingY,
          x: '-50%',
          y: '-50%',
          width: size,
          height: size,
          borderColor: expanded ? 'rgba(99,102,241,0.45)' : 'rgba(15,15,25,0.35)',
          backgroundColor: expanded ? 'rgba(99,102,241,0.10)' : 'transparent',
          opacity: visible ? 1 : 0,
          transition:
            'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background-color 0.25s, border-color 0.25s, opacity 0.2s',
        }}
      />
    </>
  );
}
