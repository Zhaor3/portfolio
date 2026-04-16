'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = {
  images: string[];
  alt: string;
  startIndex?: number;
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen image lightbox with smooth Framer Motion transitions.
 * Supports keyboard (Esc, ←, →) and click-to-close on backdrop.
 */
export default function Lightbox({ images, alt, startIndex = 0, open, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Reset index when lightbox opens with a new startIndex
  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : count - 1)), [count]);
  const next = useCallback(() => setIndex((i) => (i < count - 1 ? i + 1 : 0)), [count]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, prev, next]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const resolveImg = (img: string) =>
    img.startsWith('http') ? img : `${basePath}/images/${img}`;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter pill */}
          {count > 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wide tabular-nums">
              {index + 1} / {count}
            </div>
          )}

          {/* Image */}
          <motion.img
            key={images[index]}
            src={resolveImg(images[index])}
            alt={`${alt} — ${index + 1} of ${count}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[1] max-w-[90vw] max-h-[85vh] object-contain rounded-lg select-none"
            draggable={false}
          />

          {/* Arrow navigation */}
          {count > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
