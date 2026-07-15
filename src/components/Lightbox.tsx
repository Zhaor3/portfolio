'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const count = images.length;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Reset index when lightbox opens with a new startIndex
  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : count - 1)), [count]);
  const next = useCallback(() => setIndex((i) => (i < count - 1 ? i + 1 : 0)), [count]);

  // Keyboard navigation and modal focus trap
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.getAttribute('aria-hidden') !== 'true');

        if (focusable.length === 0) {
          e.preventDefault();
          dialog.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose, prev, next]);

  // Move focus into the dialog, then restore it to the invoking control.
  useEffect(() => {
    if (!open) return;

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      returnFocusRef.current?.focus();
    };
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  const resolveImg = (img: string) =>
    img.startsWith('http') ? img : `${basePath}/images/${img}`;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} image viewer`}
          tabIndex={-1}
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter pill */}
          {count > 1 && (
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wide tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {index + 1} / {count}
            </div>
          )}

          {/* Image */}
          <motion.img
            key={images[index]}
            src={resolveImg(images[index])}
            alt={`${alt} — ${index + 1} of ${count}`}
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.92 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-[1] max-w-[90vw] max-h-[85vh] object-contain rounded-lg select-none"
            draggable={false}
          />

          {/* Arrow navigation */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
