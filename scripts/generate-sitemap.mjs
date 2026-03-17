import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';

const siteOrigin = process.env.SITE_ORIGIN || 'https://wouterbus.com';
const distDir = path.resolve(process.cwd(), 'dist');

const client = createClient({
  projectId: 'zo87kq7g',
  dataset: 'projects',
  apiVersion: '2024-01-01',
  useCdn: true,
});

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(iso) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  const d = new Date(iso);
  return isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

function buildSitemap(urls) {
  const urlEntries = urls.map(
    (u) => `  <url>
    <loc>${escapeXml(siteOrigin + u.loc)}</loc>
    <lastmod>${formatDate(u.lastmod)}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;
}

async function main() {
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: new Date() },
    { loc: '/portfolio', priority: '0.9', changefreq: 'weekly', lastmod: new Date() },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: new Date() },
  ];

  let projectUrls = [];
  try {
    const query = `*[_type == "project"] | order(order asc, _updatedAt desc) { slug, _updatedAt }`;
    const projects = await client.fetch(query);
    projectUrls = (projects || []).map((p) => {
      const slug = p?.slug?.current;
      if (!slug) return null;
      return {
        loc: `/project/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: p._updatedAt || new Date(),
      };
    }).filter(Boolean);
  } catch (err) {
    console.warn('Could not fetch projects from Sanity, using static pages only:', err.message);
  }

  const urls = [...staticPages, ...projectUrls];
  const sitemap = buildSitemap(urls);

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`Sitemap generated: ${urls.length} URLs -> dist/sitemap.xml`);
}

main().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
