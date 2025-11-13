export interface SeoConfig {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
}

function setTag(name: string, content: string, selector: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.startsWith('meta[name=')) {
      el.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      el.setAttribute('property', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function updateSeo(config: SeoConfig) {
  if (config.title) {
    document.title = config.title;
    setTag('og:title', config.title, "meta[property='og:title']");
    setTag('twitter:title', config.title, "meta[name='twitter:title']");
  }
  if (config.description) {
    setTag('description', config.description, "meta[name='description']");
    setTag('og:description', config.description, "meta[property='og:description']");
    setTag('twitter:description', config.description, "meta[name='twitter:description']");
  }
  const url = config.url || config.canonical;
  if (url) {
    setTag('og:url', url, "meta[property='og:url']");
    setLink('canonical', url);
  }
  if (config.image) {
    setTag('og:image', config.image, "meta[property='og:image']");
    setTag('twitter:image', config.image, "meta[name='twitter:image']");
    setTag('twitter:card', 'summary_large_image', "meta[name='twitter:card']");
  }
}


