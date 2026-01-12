import { useEffect } from 'react';
import type { MetadataConfig } from '../../types/metadata';
import { DEFAULT_METADATA, SITE_CONFIG, getImageUrl, getPageUrl } from '../../lib/metadata.config';

interface SEOProps extends MetadataConfig {
  /** Whether to use default metadata for missing values */
  useDefaults?: boolean;
}

/**
 * Helper function to set or update a meta tag
 */
function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (!content) return;
  const selector = `meta[${attribute}='${name}']`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Helper function to set or update a link tag
 */
function setLinkTag(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Helper function to remove meta tags by selector
 */
function removeMetaTags(selector: string) {
  document.head.querySelectorAll<HTMLMetaElement>(selector).forEach(el => el.remove());
}

/**
 * SEO Component - React 19 compatible (no external dependencies)
 * Manages all meta tags, Open Graph, and Twitter Card tags using useEffect
 */
export default function SEO({
  title,
  description,
  url,
  canonical,
  image,
  imageWidth,
  imageHeight,
  type = 'website',
  siteName,
  locale,
  twitterCard = 'summary_large_image',
  twitterHandle,
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  articleSection,
  articleTags,
  keywords,
  robots,
  additionalMetaTags,
  useDefaults = true,
}: SEOProps) {
  // Use defaults for missing values if useDefaults is true
  const finalTitle = title || (useDefaults ? DEFAULT_METADATA.title : '');
  const finalDescription = description || (useDefaults ? DEFAULT_METADATA.description : '');
  const finalUrl = url || (useDefaults ? DEFAULT_METADATA.url : '');
  const finalCanonical = canonical || finalUrl;
  const finalImage = image ? getImageUrl(image) : (useDefaults ? DEFAULT_METADATA.image : '');
  const finalImageWidth = imageWidth || SITE_CONFIG.defaultImageWidth;
  const finalImageHeight = imageHeight || SITE_CONFIG.defaultImageHeight;
  const finalSiteName = siteName || (useDefaults ? DEFAULT_METADATA.siteName : '');
  const finalLocale = locale || (useDefaults ? DEFAULT_METADATA.locale : '');
  const finalTwitterCard = twitterCard || DEFAULT_METADATA.twitterCard;
  const finalTwitterHandle = twitterHandle || (useDefaults ? DEFAULT_METADATA.twitterHandle : '');

  // Generate full URLs
  const fullUrl = finalUrl ? getPageUrl(finalUrl) : '';
  const fullCanonical = finalCanonical ? getPageUrl(finalCanonical) : '';

  useEffect(() => {
    // Set document title
    if (finalTitle) {
      document.title = finalTitle;
    }

    // Basic Meta Tags
    if (finalDescription) {
      setMetaTag('description', finalDescription);
    }
    if (keywords && keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }
    if (robots) {
      setMetaTag('robots', robots);
    }

    // Canonical URL
    if (fullCanonical) {
      setLinkTag('canonical', fullCanonical);
    }

    // Open Graph Tags
    if (fullUrl) setMetaTag('og:url', fullUrl, 'property');
    if (finalTitle) setMetaTag('og:title', finalTitle, 'property');
    if (finalDescription) setMetaTag('og:description', finalDescription, 'property');
    if (finalImage) setMetaTag('og:image', finalImage, 'property');
    if (finalImageWidth) setMetaTag('og:image:width', String(finalImageWidth), 'property');
    if (finalImageHeight) setMetaTag('og:image:height', String(finalImageHeight), 'property');
    if (type) setMetaTag('og:type', type, 'property');
    if (finalSiteName) setMetaTag('og:site_name', finalSiteName, 'property');
    if (finalLocale) setMetaTag('og:locale', finalLocale, 'property');

    // Article-specific Open Graph Tags
    if (type === 'article') {
      if (articleAuthor) setMetaTag('article:author', articleAuthor, 'property');
      if (articlePublishedTime) setMetaTag('article:published_time', articlePublishedTime, 'property');
      if (articleModifiedTime) setMetaTag('article:modified_time', articleModifiedTime, 'property');
      if (articleSection) setMetaTag('article:section', articleSection, 'property');
      if (articleTags) {
        // Remove old article tags first
        removeMetaTags("meta[property^='article:tag']");
        articleTags.forEach(tag => setMetaTag('article:tag', tag, 'property'));
      }
    }

    // Twitter Card Tags
    if (finalTwitterCard) setMetaTag('twitter:card', finalTwitterCard);
    if (finalTwitterHandle) {
      setMetaTag('twitter:site', finalTwitterHandle);
      setMetaTag('twitter:creator', finalTwitterHandle);
    }
    if (finalTitle) setMetaTag('twitter:title', finalTitle);
    if (finalDescription) setMetaTag('twitter:description', finalDescription);
    if (finalImage) setMetaTag('twitter:image', finalImage);

    // Additional Meta Tags
    if (additionalMetaTags) {
      additionalMetaTags.forEach(tag => {
        if (tag.name) {
          setMetaTag(tag.name, tag.content, 'name');
        } else if (tag.property) {
          setMetaTag(tag.property, tag.content, 'property');
        }
      });
    }
  }, [
    finalTitle,
    finalDescription,
    fullUrl,
    fullCanonical,
    finalImage,
    finalImageWidth,
    finalImageHeight,
    type,
    finalSiteName,
    finalLocale,
    finalTwitterCard,
    finalTwitterHandle,
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
    articleSection,
    articleTags,
    keywords,
    robots,
    additionalMetaTags,
  ]);

  // This component doesn't render anything
  return null;
}
