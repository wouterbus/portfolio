# SEO Component

A comprehensive SEO component for managing metadata, Open Graph tags, and Twitter Cards. React 19 compatible - uses `useEffect` to update DOM directly (no external dependencies).

## Usage

### Basic Usage

```tsx
import SEO from '../../components/SEO/SEO';

function MyPage() {
  return (
    <>
      <SEO
        title="My Page Title"
        description="A description of my page"
        url="/my-page"
        image="/my-image.png"
      />
      {/* Your page content */}
    </>
  );
}
```

### With All Options

```tsx
import SEO from '../../components/SEO/SEO';

function ProjectPage({ project }) {
  return (
    <>
      <SEO
        title={`${project.title} - Studio W`}
        description={project.description}
        url={`/project/${project.slug}`}
        canonical={`/project/${project.slug}`}
        image={project.heroImage}
        imageWidth={1200}
        imageHeight={630}
        type="article"
        keywords={['web design', 'portfolio', 'react']}
        articleAuthor="Wouter Bus"
        articlePublishedTime={project.publishedAt}
        articleTags={project.tags}
      />
      {/* Your page content */}
    </>
  );
}
```

### Using Defaults

The component automatically uses default values from `metadata.config.ts` when `useDefaults` is `true` (default):

```tsx
// Uses all defaults
<SEO />

// Uses defaults but overrides title
<SEO title="Custom Title" />

// Disable defaults
<SEO useDefaults={false} title="Only This Title" />
```

## Props

All props are optional and extend `MetadataConfig`:

- `title` - Page title
- `description` - Meta description
- `url` - Full URL of the page
- `canonical` - Canonical URL (defaults to `url`)
- `image` - Open Graph/Twitter image URL
- `imageWidth` - Image width in pixels (default: 1200)
- `imageHeight` - Image height in pixels (default: 630)
- `type` - Open Graph type: 'website' | 'article' | 'profile' (default: 'website')
- `siteName` - Site name for Open Graph
- `locale` - Locale (e.g., 'en_US')
- `twitterCard` - Twitter card type
- `twitterHandle` - Twitter handle (e.g., '@username')
- `keywords` - Array of keywords
- `robots` - Robots meta tag
- `articleAuthor` - Article author (for article type)
- `articlePublishedTime` - ISO 8601 published time
- `articleModifiedTime` - ISO 8601 modified time
- `articleSection` - Article section/category
- `articleTags` - Array of article tags
- `additionalMetaTags` - Array of custom meta tags
- `useDefaults` - Whether to use default values (default: true)

## Configuration

Default values are configured in `src/lib/metadata.config.ts`. You can modify `SITE_CONFIG` to change defaults:

```ts
export const SITE_CONFIG = {
  name: 'Studio W',
  title: 'Studio W - Web Development & Design',
  description: 'Portfolio of Wouter Bus...',
  url: 'https://wouterbus.com',
  // ... more config
};
```

## Examples

### Home Page
```tsx
<SEO
  title="Studio W - Web Development & Design"
  description="Portfolio of Wouter Bus – Creative developer and designer crafting modern web experiences."
  url="/"
/>
```

### Portfolio Page
```tsx
<SEO
  title="Portfolio – Studio W"
  description="Explore selected works across Web Design, UI/UX, and Graphic Design."
  url="/portfolio"
  image="/cover-meta-data.png"
/>
```

### Project Detail Page
```tsx
<SEO
  title={`${project.title} – Studio W`}
  description={project.shortDescription}
  url={`/project/${project.slug}`}
  image={project.heroBanner}
  type="article"
  articleAuthor="Wouter Bus"
  keywords={project.tools}
/>
```
