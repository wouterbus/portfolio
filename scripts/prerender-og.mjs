import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
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

const builder = imageUrlBuilder(client);

function urlFor(source) {
  try {
    return builder.image(source);
  } catch {
    return { width: () => ({ height: () => ({ fit: () => ({ url: () => '' }) }) }) };
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderOgHtml({ title, description, image, url }) {
  const safeTitle = escapeHtml(title || 'Studio W - Web Development & Design');
  const safeDesc = escapeHtml(description || 'Studio W – Portfolio project');
  const safeImage = image || `${siteOrigin}/cover-meta-data.png`;
  const safeUrl = url || siteOrigin;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <link rel="canonical" href="${safeUrl}" />
    <meta name="description" content="${safeDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta http-equiv="refresh" content="0; url=${safeUrl}" />
  </head>
  <body>
    <noscript>
      <p>This page redirects to <a href="${safeUrl}">${safeUrl}</a>.</p>
    </noscript>
  </body>
</html>`;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  const query = `*[_type == "project"]{ title, slug, shortDescription, shortDescriptionEn, shortDescriptionPt, heroBanner, thumbnail }`;
  const projects = await client.fetch(query);

  const projectDir = path.join(distDir, 'prerender', 'project');
  await ensureDir(projectDir);

  for (const p of projects || []) {
    const slug = p?.slug?.current;
    if (!slug) continue;
    const preferredImage = p.thumbnail || p.heroBanner;
    let imageUrl = '';
    try {
      imageUrl = urlFor(preferredImage).width(1200).height(630).fit('crop').url();
    } catch {}
    const description = p.shortDescriptionEn || p.shortDescriptionPt || p.shortDescription || '';
    const pageUrl = `${siteOrigin}/project/${slug}`;
    const html = renderOgHtml({ title: p.title, description, image: imageUrl, url: pageUrl });

    const outDir = path.join(projectDir, slug);
    await ensureDir(outDir);
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
  }
}

main().catch((err) => {
  console.error('OG prerender failed:', err);
  process.exit(1);
});


