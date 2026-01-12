/**
 * Type definitions for metadata configuration
 */

export interface MetadataConfig {
  /** Page title (appears in browser tab and search results) */
  title?: string;
  
  /** Meta description (appears in search results) */
  description?: string;
  
  /** Full URL of the page */
  url?: string;
  
  /** Canonical URL (for SEO, defaults to url if not provided) */
  canonical?: string;
  
  /** Open Graph image URL (for social media sharing) */
  image?: string;
  
  /** Open Graph image width in pixels */
  imageWidth?: number;
  
  /** Open Graph image height in pixels */
  imageHeight?: number;
  
  /** Open Graph type (website, article, etc.) */
  type?: 'website' | 'article' | 'profile';
  
  /** Site name for Open Graph */
  siteName?: string;
  
  /** Locale (e.g., 'en_US', 'pt_BR') */
  locale?: string;
  
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  /** Twitter handle (e.g., '@username') */
  twitterHandle?: string;
  
  /** Article author (for article type) */
  articleAuthor?: string;
  
  /** Article published time (ISO 8601) */
  articlePublishedTime?: string;
  
  /** Article modified time (ISO 8601) */
  articleModifiedTime?: string;
  
  /** Article section/category */
  articleSection?: string;
  
  /** Article tags */
  articleTags?: string[];
  
  /** Keywords for SEO */
  keywords?: string[];
  
  /** Robots meta tag */
  robots?: string;
  
  /** Additional meta tags */
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}
