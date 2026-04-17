'use client';

/**
 * Site-wide atmospheric base layer.
 *
 * Art direction: **engineering paper**. Warm off-white ground with a
 * few restrained indigo/lavender washes and scattered drafting
 * construction geometry. Paired with GlobalBlueprint (drafting chrome)
 * and GlobalCursor (ink-bleed pool), this is the bottom layer of a
 * three-layer atmosphere.
 *
 * Scroll behavior: each atmospheric layer parallaxes at a different
 * rate so the whole page feels "in motion" when you scroll. Guarded
 * by useReducedMotion — if the user prefers reduced motion we skip
 * the parallax entirely.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function AuroraBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Each layer moves at a different rate — deepest (smallest translation)
  // layers feel "farther away." Null transforms on reduce so the browser
  // skips the compositing work entirely.
  const y1 = useTransform(scrollY, [0, 4000], [0, -220]);
  const y2 = useTransform(scrollY, [0, 4000], [0, -140]);
  const y3 = useTransform(scrollY, [0, 4000], [0, -340]);
  const y4 = useTransform(scrollY, [0, 4000], [0, -180]);
  const y5 = useTransform(scrollY, [0, 4000], [0, -260]);
  const geomY = useTransform(scrollY, [0, 4000], [0, -120]);
  const geomRot = useTransform(scrollY, [0, 4000], [0, 12]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: '#f7f6f2' }}
    >
      {/* Paper warmth — faint cream graded across the sheet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 15% -10%, rgba(255,248,235,0.55) 0%, rgba(255,248,235,0) 55%), radial-gradient(ellipse 100% 90% at 110% 110%, rgba(235,238,250,0.6) 0%, rgba(235,238,250,0) 60%)',
        }}
      />

      {/* Lavender/indigo wash — top-left, drifts up fastest */}
      <motion.div
        style={{ y: reduce ? 0 : y1 }}
        className="absolute -top-40 -left-40 h-[880px] w-[880px] rounded-full animate-aurora-1"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(196,190,255,0.28) 0%, rgba(196,190,255,0) 62%)',
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* Slate-violet wash — right side, slower drift */}
      <motion.div
        style={{ y: reduce ? 0 : y2 }}
        className="absolute top-[-8%] right-[-20%] h-[920px] w-[920px] rounded-full animate-aurora-2"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,185,220,0.30) 0%, rgba(180,185,220,0) 62%)',
            filter: 'blur(70px)',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* Cool slate mid-plate — anchors the middle, deepest layer */}
      <motion.div
        style={{ y: reduce ? 0 : y3 }}
        className="absolute top-[35%] left-[30%] h-[700px] w-[700px] rounded-full animate-aurora-3"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(205,210,230,0.24) 0%, rgba(205,210,230,0) 65%)',
            filter: 'blur(55px)',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* Warm lower-right — pulls the eye down-page */}
      <motion.div
        style={{ y: reduce ? 0 : y4 }}
        className="absolute bottom-[-15%] right-[3%] h-[760px] w-[760px] rounded-full animate-aurora-4"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(230,220,200,0.25) 0%, rgba(230,220,200,0) 62%)',
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* Indigo accent — small, low-left */}
      <motion.div
        style={{ y: reduce ? 0 : y5 }}
        className="absolute bottom-[18%] left-[-8%] h-[560px] w-[560px] rounded-full animate-aurora-2"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(155,165,235,0.22) 0%, rgba(155,165,235,0) 62%)',
            filter: 'blur(55px)',
            mixBlendMode: 'multiply',
            animationDelay: '-12s',
          }}
        />
      </motion.div>

      {/* Scattered construction geometry — slow scroll drift + tiny rotation */}
      <motion.svg
        aria-hidden
        style={{ y: reduce ? 0 : geomY, rotate: reduce ? 0 : geomRot }}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g
          style={{
            opacity: 0.09,
            maskImage:
              'radial-gradient(ellipse 75% 65% at 50% 45%, black, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 65% at 50% 45%, black, transparent 90%)',
          }}
        >
          <g fill="none" stroke="rgba(15,15,25,1)" strokeWidth="0.08" vectorEffect="non-scaling-stroke">
            <circle cx="18" cy="22" r="14" />
            <circle cx="18" cy="22" r="8" strokeDasharray="0.4 0.6" />
            <circle cx="82" cy="18" r="11" />
            <circle cx="88" cy="54" r="9" />
            <circle cx="88" cy="54" r="4.5" />
            <circle cx="14" cy="78" r="10" />
            <circle cx="14" cy="78" r="5" strokeDasharray="0.4 0.6" />
            <circle cx="78" cy="86" r="13" />
          </g>
          <g stroke="rgba(15,15,25,1)" strokeWidth="0.08" vectorEffect="non-scaling-stroke">
            {[
              [50, 8],
              [38, 42],
              [62, 68],
              [26, 58],
              [72, 34],
              [48, 92],
              [6, 48],
              [94, 78],
            ].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx} ${cy})`}>
                <line x1="-1.4" y1="0" x2="1.4" y2="0" />
                <line x1="0" y1="-1.4" x2="0" y2="1.4" />
              </g>
            ))}
          </g>
          <g fill="rgba(99,102,241,0.45)">
            <circle cx="18" cy="22" r="0.35" />
            <circle cx="88" cy="54" r="0.35" />
            <circle cx="14" cy="78" r="0.35" />
          </g>
        </g>
      </motion.svg>

      {/* Grain — breaks up gradient banding, near-invisible */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette — keeps edges slightly darker so the center reads focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(210,208,200,0.45)_100%)]" />
    </div>
  );
}
