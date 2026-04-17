'use client';

/**
 * Site-wide engineering blueprint skeleton.
 *
 * Fixed to the viewport (not the document) so drafting reference marks
 * remain on screen as the user scrolls — like looking at the world through
 * a drafting overlay. Much sparser than FeaturedShowcase's local blueprint:
 * just the structural "frame" (corner reticles, top/bottom rulers, a
 * sprinkling of tick marks and one dimension label). Dense technical
 * annotations stay local to FeaturedShowcase.
 *
 * Z-index: sits above AuroraBackground (-10) but below all content. Aurora
 * still shows through the transparent gaps; blueprint adds an engineer's
 * overlay on top.
 */

export default function GlobalBlueprint() {
  const HAIR = 'rgba(15,15,25,0.09)';
  const HAIR_SOFT = 'rgba(15,15,25,0.06)';

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Top ruler — faint ticks across the viewport */}
        <g>
          <line x1="40" y1="24" x2="1400" y2="24" stroke={HAIR} strokeWidth="0.5" />
          {Array.from({ length: 28 }).map((_, i) => {
            const x = 40 + i * 50;
            const long = i % 5 === 0;
            return (
              <line
                key={i}
                x1={x}
                y1="24"
                x2={x}
                y2={long ? 34 : 28}
                stroke={HAIR}
                strokeWidth="0.5"
              />
            );
          })}
        </g>

        {/* Bottom ruler (dashed) */}
        <g>
          <line
            x1="40"
            y1="876"
            x2="1400"
            y2="876"
            stroke={HAIR_SOFT}
            strokeWidth="0.5"
            strokeDasharray="3 6"
          />
          <text
            x="40"
            y="894"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="9"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            § PORTFOLIO · R. ZHAO · 2026 · REV A
          </text>
          <text
            x="1400"
            y="894"
            textAnchor="end"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="9"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            SHEET 01 / 01
          </text>
        </g>

        {/* Four corner reticles */}
        {[
          { x: 24, y: 24 },
          { x: 1416, y: 24 },
          { x: 24, y: 876 },
          { x: 1416, y: 876 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x - 10} ${p.y - 10})`}>
            <line x1="0" y1="10" x2="20" y2="10" stroke={HAIR} strokeWidth="0.5" />
            <line x1="10" y1="0" x2="10" y2="20" stroke={HAIR} strokeWidth="0.5" />
            <circle cx="10" cy="10" r="3" stroke={HAIR} strokeWidth="0.4" fill="none" />
          </g>
        ))}

        {/* Tiny title block (bottom-right) */}
        <g transform="translate(1260 836)">
          <rect x="0" y="0" width="140" height="30" stroke={HAIR_SOFT} strokeWidth="0.5" fill="none" />
          <line x1="0" y1="15" x2="140" y2="15" stroke={HAIR_SOFT} strokeWidth="0.4" />
          <line x1="70" y1="0" x2="70" y2="30" stroke={HAIR_SOFT} strokeWidth="0.4" />
          <text
            x="6"
            y="11"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="7"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            SCALE
          </text>
          <text
            x="76"
            y="11"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="7"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            1 : 1
          </text>
          <text
            x="6"
            y="26"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="7"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            UNIT
          </text>
          <text
            x="76"
            y="26"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="7"
            fill="rgba(15,15,25,0.30)"
            letterSpacing="0.25em"
          >
            MM
          </text>
        </g>

        {/* Left-edge vertical tick strip */}
        <g>
          <line x1="40" y1="80" x2="40" y2="820" stroke={HAIR_SOFT} strokeWidth="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 80 + i * 68;
            const long = i % 4 === 0;
            return (
              <line
                key={i}
                x1={long ? 30 : 36}
                y1={y}
                x2="40"
                y2={y}
                stroke={HAIR_SOFT}
                strokeWidth="0.4"
              />
            );
          })}
        </g>

        {/* Right-edge vertical tick strip */}
        <g>
          <line x1="1400" y1="80" x2="1400" y2="820" stroke={HAIR_SOFT} strokeWidth="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 80 + i * 68;
            const long = i % 4 === 0;
            return (
              <line
                key={i}
                x1="1400"
                y1={y}
                x2={long ? 1410 : 1404}
                y2={y}
                stroke={HAIR_SOFT}
                strokeWidth="0.4"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
