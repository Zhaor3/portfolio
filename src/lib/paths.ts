/**
 * Base path helpers.
 *
 * The site is deployed to GitHub Pages as a *project site* at
 * `https://zhaor3.github.io/portfolio/`, so every absolute link to a static
 * asset (the resume PDF, images, etc.) needs to be prefixed with `/portfolio`.
 *
 * Next.js's `basePath` config automatically prefixes *Next routes* and its
 * own `<Image>` / `<Link>` components, but a raw `<a href="/resume.pdf">`
 * is just HTML — Next doesn't touch it and it ends up pointing at
 * `https://zhaor3.github.io/resume.pdf`, which 404s.
 *
 * The deploy workflow writes `NEXT_PUBLIC_BASE_PATH=/portfolio` into the
 * build environment (see `.github/workflows/deploy.yml`). Because the var is
 * prefixed `NEXT_PUBLIC_`, Next.js inlines it into client bundles at build
 * time, so this file works in both server and client components.
 *
 * In dev the var is empty, so `withBase('/resume.pdf')` just returns
 * `/resume.pdf` — nothing to special-case.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefix a site-absolute path with the current deployment's base path.
 *
 * @example
 *   withBase('/resume.pdf')           // → '/portfolio/resume.pdf' in prod, '/resume.pdf' in dev
 *   withBase('/images/canam-brake.jpg') // → '/portfolio/images/canam-brake.jpg'
 */
export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
