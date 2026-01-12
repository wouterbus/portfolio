/**
 * Example usage of the SEO component
 * These examples show how to use the SEO component in different scenarios
 */

import SEO from '../components/SEO/SEO';

// Example 1: Home Page
export function HomePageExample() {
  return (
    <>
      <SEO
        title="Studio W - Web Development & Design"
        description="Portfolio of Wouter Bus – Creative developer and designer crafting modern web experiences."
        url="/"
        image="/cover-meta-data.png"
      />
      {/* Page content */}
    </>
  );
}

// Example 2: Portfolio Page
export function PortfolioPageExample() {
  return (
    <>
      <SEO
        title="Portfolio – Studio W"
        description="Explore selected works across Web Design, UI/UX, and Graphic Design."
        url="/portfolio"
        image="/cover-meta-data.png"
        keywords={['portfolio', 'web design', 'ui/ux', 'graphic design']}
      />
      {/* Page content */}
    </>
  );
}

// Example 3: Contact Page
export function ContactPageExample() {
  return (
    <>
      <SEO
        title="Contact – Studio W"
        description="Get in touch with Studio W. Let's create something amazing together."
        url="/contact"
      />
      {/* Page content */}
    </>
  );
}

// Example 4: Project Detail Page (Article Type)
export function ProjectDetailPageExample({ project }: { project: any }) {
  return (
    <>
      <SEO
        title={`${project.title} – Studio W`}
        description={project.shortDescription || project.description}
        url={`/project/${project.slug}`}
        canonical={`/project/${project.slug}`}
        image={project.heroBanner || project.thumbnail}
        type="article"
        articleAuthor="Wouter Bus"
        articlePublishedTime={project.publishedAt}
        articleSection={project.category}
        articleTags={project.tools || []}
        keywords={project.tools || []}
      />
      {/* Page content */}
    </>
  );
}

// Example 5: Using Defaults Only
export function DefaultsOnlyExample() {
  return (
    <>
      <SEO />
      {/* Page content - will use all default values from metadata.config.ts */}
    </>
  );
}

// Example 6: Custom Meta Tags
export function CustomMetaTagsExample() {
  return (
    <>
      <SEO
        title="Custom Page"
        description="A page with custom meta tags"
        additionalMetaTags={[
          { name: 'theme-color', content: '#000000' },
          { property: 'og:image:alt', content: 'Custom image alt text' },
        ]}
      />
      {/* Page content */}
    </>
  );
}

// Example 7: Migration from updateSeo
// OLD WAY (using updateSeo):
/*
import { updateSeo } from '../../lib/seo';

useEffect(() => {
  updateSeo({
    title: 'Portfolio – Studio W',
    description: 'Explore selected works...',
    url: `${window.location.origin}/portfolio`,
    canonical: `${window.location.origin}/portfolio`,
    image: `${window.location.origin}/cover-meta-data.png`,
  });
}, []);
*/

// NEW WAY (using SEO component):
/*
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
      {/* Page content */}
    </>
  );
}
*/
