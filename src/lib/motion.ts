/**
 * Shared scroll-reveal animation helpers.
 *
 * The site uses Framer Motion's `whileInView` pattern for scroll-triggered
 * animations. This module centralizes the reveal spec so every section has
 * the same feel, and so the spec can be upgraded in one place.
 *
 * Design goals:
 * - **One-shot reveals** keep the page calm and immediately scannable on
 *   return scrolls.
 * - **Directional movement** makes the interface feel intentional without
 *   repaint-heavy blur filters or repetitive card scaling.
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
 * Standard reveal: short lift with a fast editorial settle.
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
    y = 24,
    duration = 0.7,
    ease = EXPO_OUT,
  } = opts;

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount, margin: '0px 0px -40px 0px' },
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
    duration = 0.6,
    ease = EXPO_OUT,
  } = opts;

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount, margin: '0px 0px -30px 0px' },
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
 *   <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
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
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EXPO_OUT as unknown as number[],
    },
  },
};
