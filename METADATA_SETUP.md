# Metadata Setup Documentation

This document describes the metadata system created for the portfolio website.

## Files Created

### 1. Configuration Files

#### `src/lib/metadata.config.ts`
Contains default metadata configuration and utility functions:
- `SITE_CONFIG` - Site-wide configuration constants
- `DEFAULT_METADATA` - Default metadata values
- `getImageUrl()` - Helper to generate full image URLs
- `getPageUrl()` - Helper to generate full page URLs

#### `src/types/metadata.ts`
TypeScript type definitions for metadata configuration:
- `MetadataConfig` interface - Complete type definition for all metadata options

### 2. Components

#### `src/components/SEO/SEO.tsx`
Main SEO component (React 19 compatible, no external dependencies):
- Manages all meta tags, Open Graph, and Twitter Card tags
- Uses `useEffect` to update DOM directly
- Supports article metadata for blog/project pages
- Automatically uses defaults from config
- Fully typed with TypeScript

#### `src/components/SEO/index.ts`
Barrel export for easier imports

#### `src/components/SEO/README.md`
Complete documentation with usage examples

### 3. Examples & Documentation

#### `src/lib/metadata.examples.ts`
Code examples showing how to use the SEO component in different scenarios

#### `METADATA_SETUP.md` (this file)
Overview documentation

## Setup

No setup required! The SEO component works out of the box - just import and use it in your components.

## Usage

### Basic Example

```tsx
import SEO from '../components/SEO/SEO';

function MyPage() {
  return (
    <>
      <SEO
        title="My Page Title"
        description="Page description"
        url="/my-page"
        image="/my-image.png"
      />
      {/* Your content */}
    </>
  );
}
```

### Migration from `updateSeo`

The old `updateSeo` function can be replaced with the SEO component:

**Before:**
```tsx
import { updateSeo } from '../../lib/seo';

useEffect(() => {
  updateSeo({
    title: 'Portfolio – Studio W',
    description: 'Explore selected works...',
    url: `${window.location.origin}/portfolio`,
    image: `${window.location.origin}/cover-meta-data.png`,
  });
}, []);
```

**After:**
```tsx
import SEO from '../../components/SEO/SEO';

function Portfolio() {
  return (
    <>
      <SEO
        title="Portfolio – Studio W"
        description="Explore selected works..."
        url="/portfolio"
        image="/cover-meta-data.png"
      />
      {/* Content */}
    </>
  );
}
```

## Features

- ✅ Full Open Graph support
- ✅ Twitter Card support
- ✅ Article metadata for project pages
- ✅ Automatic URL generation
- ✅ Default values from config
- ✅ TypeScript support
- ✅ Custom meta tags support
- ✅ Canonical URLs
- ✅ Keywords and robots meta tags

## Configuration

Edit `src/lib/metadata.config.ts` to change default values:

```ts
export const SITE_CONFIG = {
  name: 'Studio W',
  title: 'Studio W - Web Development & Design',
  description: 'Portfolio of Wouter Bus...',
  url: 'https://wouterbus.com',
  // ... more config
};
```

## Default Cover Image

The default cover image is set to `/cover-meta-data.png` which should be in your `public` folder.

## Next Steps

1. Replace `updateSeo` calls in existing pages with the SEO component
2. Update pages to use the new SEO component:
   - `src/pages/Home/Home.tsx`
   - `src/pages/Portfolio/Portfolio.tsx`
   - `src/pages/Contact/Contact.tsx`
   - `src/pages/ProjectDetail/ProjectDetail.tsx`
3. Test metadata in social media preview tools
4. Verify Open Graph images are displaying correctly

## Testing

Test your metadata using:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
