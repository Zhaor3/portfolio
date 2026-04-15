'use client';

import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

/**
 * Image that falls back to a soft neutral gradient with a stylized label when
 * the real asset is missing. Useful while building out the site before Simon
 * drops photos into /public/images/.
 */
export default function PlaceholderImage({ src, alt, label, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedSrc = src.startsWith('http') ? src : `${basePath}${src}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(135deg, #f5f5f7 0%, #e8e9ed 50%, #dfe1e7 100%)',
      }}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-[#86868b] text-[10px] md:text-xs tracking-[0.3em] uppercase text-center">
            {label ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
