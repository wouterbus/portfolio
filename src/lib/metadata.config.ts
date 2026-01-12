/**
 * Metadata configuration for the portfolio website
 * Contains default values for SEO, Open Graph, and Twitter Card metadata
 */

export const SITE_CONFIG = {
  name: 'Studio W',
  title: 'Studio W - Web Development & Design',
  description: 'Portfolio of Wouter Bus – Creative developer and designer crafting modern web experiences.',
  url: import.meta.env.VITE_SITE_URL || 'https://wouterbus.com',
  author: 'Wouter Bus',
  locale: 'en_US',
  siteName: 'Studio W',
  twitterHandle: '@wouterbus',
  defaultImage: '/cover-meta-data.png',
  defaultImageWidth: 1200,
  defaultImageHeight: 630,
  favicon: '/favicon.png',
  logo: '/logo_fav.svg',
} as const;

export const DEFAULT_METADATA = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  image: `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`,
  url: SITE_CONFIG.url,
  type: 'website' as const,
  siteName: SITE_CONFIG.siteName,
  locale: SITE_CONFIG.locale,
  twitterCard: 'summary_large_image' as const,
  twitterHandle: SITE_CONFIG.twitterHandle,
} as const;

/**
 * Generate full URL for images
 */
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('/')) {
    return `${SITE_CONFIG.url}${imagePath}`;
  }
  return `${SITE_CONFIG.url}/${imagePath}`;
}

/**
 * Generate full URL for pages
 * Handles both absolute URLs and relative paths
 */
export function getPageUrl(path: string = ''): string {
  if (!path) return SITE_CONFIG.url;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Handle relative paths
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Use window.location.origin in browser, fallback to SITE_CONFIG.url
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.url;
  return `${baseUrl}${cleanPath}`;
}
