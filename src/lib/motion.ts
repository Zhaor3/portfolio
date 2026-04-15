/**
 * Shared scroll-reveal animation helpers.
 *
 * The site uses Framer Motion's `whileInView` pattern for scroll-triggered
 * animations. This module centralizes the reveal spec so every section has
 * the same feel, and so the spec can be upgraded in one place.
 *
 * Design goals:
 * - **Re-triggers on every scroll** (`once: false`) — users expect the
 *   animation to play each time an element crosses the viewport, not just
 *   the first time. A one-shot reveal feels dead on re-scroll.
 * - **Blur → sharp** — blur-to-focus is the dominant 2025/2026 portfolio
 *   reveal pattern (see: Linear, Vercel, Framer, Apple product pages). It
 *   adds perceived depth that pure opacity+y can't.
 * - **Subtle scale** — 0.96 → 1. Cards feel like they're settling into
 *   place rather than flying in. Pairs well with the blur.
 * - **Expo-out easing** — `[0.16, 1, 0.3, 1]` decelerates fast, giving a
 *   "snap into place" feel without being abrupt.
 */

import type { Transition, Variants } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

type RevealOpts = {
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Fraction of the element that must be in view to trigger. 0..1. */
  amount?: number;
  /** Initial y offset in pixels. Negative values animate from above. */
  y?: number;
  /** Initial x offset in pixels. Used by `revealFromSide`. */
  x?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Override the easing curve. */
  ease?: readonly [number, number, number, number];
};

/**
 * Standard reveal: blur → sharp, soft lift, subtle scale.
 * Re-triggers every time the element crosses the viewport.
 *
 * @example
 *   <motion.div {...reveal()}>            // basic
 *   <motion.div {...reveal({ delay: 0.1 })}> // staggered
 *   <motion.div {...reveal({ amount: 0.5 })}> // wait until 50% in view
 */
export function reveal(opts: RevealOpts = {}) {
  const {
    delay = 0,
    amount = 0.2,
    y = 36,
    duration = 0.85,
    ease = EXPO_OUT,
  } = opts;

  return {
    initial: { opacity: 0, y, scale: 0.96, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    viewport: { once: false, amount, margin: '0px 0px -60px 0px' },
    transition: {
      duration,
      delay,
      ease: ease as unknown as number[],
    } as Transition,
  };
}

/**
 * Lighter reveal without the blur — use on text-heavy blocks where heavy
 * filter animation can feel slow, or on small UI chrome like counters.
 */
export function fadeUp(opts: RevealOpts = {}) {
  const {
    delay = 0,
    amount = 0.3,
    y = 20,
    duration = 0.7,
    ease = EXPO_OUT,
  } = opts;

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount, margin: '0px 0px -40px 0px' },
    transition: {
      duration,
      delay,
      ease: ease as unknown as number[],
    } as Transition,
  };
}

/**
 * Compute a staggered delay for list items. Caps the total stagger so the
 * last item in a long list doesn't wait forever.
 *
 * @example
 *   items.map((item, i) => (
 *     <motion.div {...reveal({ delay: stagger(i) })} />
 *   ))
 */
export function stagger(index: number, step = 0.08, cap = 0.4): number {
  return Math.min(index * step, cap);
}

/**
 * Variants for a parent container that staggers its direct motion children.
 * Use together with `childVariants` when you want a single `whileInView`
 * trigger to cascade into multiple children without per-child delay math.
 *
 * @example
 *   <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}>
 *     {items.map(item => <motion.li key={item.id} variants={childVariants} />)}
 *   </motion.ul>
 */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: EXPO_OUT as unknown as number[],
    },
  },
};
