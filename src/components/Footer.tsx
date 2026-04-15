'use client';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 px-6 pt-16 pb-12 max-w-7xl mx-auto">
      <div className="border-t border-black/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#86868b]">
        <p>© {year} Ruoxiang Zhao · Built with Next.js & Tailwind.</p>
        <p>
          <a
            href="#hero"
            className="hover:text-[#1d1d1f] transition-colors"
          >
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}
