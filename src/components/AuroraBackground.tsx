'use client';

/**
 * Aura Glass background — soft pastel washes that give the page atmosphere
 * without shouting. Each blob sits below 35% alpha so typography stays crisp.
 *
 * Palette inspired by 2026 portfolio trends: soft lavender, sky blue, mint, and
 * peach — a "hybrid" where flat white is the base and the aurora is the accent.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: '#f7f8fc' }}
    >
      {/* Soft base gradient — warm top-left, cool bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 15% 0%, rgba(255,240,235,0.7) 0%, rgba(255,240,235,0) 60%), radial-gradient(ellipse 80% 70% at 100% 100%, rgba(230,235,255,0.6) 0%, rgba(230,235,255,0) 65%)',
        }}
      />

      {/* Pastel aurora blobs — lavender, sky, mint, peach */}
      <div
        className="absolute -top-32 -left-32 h-[760px] w-[760px] rounded-full animate-aurora-1"
        style={{
          background:
            'radial-gradient(circle, rgba(196, 181, 253, 0.45) 0%, rgba(196, 181, 253, 0) 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-[-10%] right-[-15%] h-[820px] w-[820px] rounded-full animate-aurora-2"
        style={{
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.38) 0%, rgba(147, 197, 253, 0) 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute top-[30%] left-[35%] h-[640px] w-[640px] rounded-full animate-aurora-3"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 243, 208, 0.32) 0%, rgba(167, 243, 208, 0) 65%)',
          filter: 'blur(44px)',
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[5%] h-[720px] w-[720px] rounded-full animate-aurora-4"
        style={{
          background:
            'radial-gradient(circle, rgba(253, 186, 186, 0.34) 0%, rgba(253, 186, 186, 0) 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-[15%] left-[-10%] h-[580px] w-[580px] rounded-full animate-aurora-2"
        style={{
          background:
            'radial-gradient(circle, rgba(221, 214, 254, 0.4) 0%, rgba(221, 214, 254, 0) 65%)',
          filter: 'blur(44px)',
          animationDelay: '-10s',
        }}
      />

      {/* Subtle grain to break up banding */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Light vignette — keeps edges slightly darker for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(230,230,240,0.4)_100%)]" />
    </div>
  );
}
