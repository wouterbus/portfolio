import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zo87kq7g',
  dataset: 'projects',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: undefined, // We don't need a token for public read access
});

// Global loading tracker for Sanity fetches
type Listener = (inFlight: number) => void;
const listeners = new Set<Listener>();
export const loadingTracker = {
  inFlight: 0,
  subscribe(cb: Listener) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
};

const notify = () => {
  for (const cb of listeners) cb(loadingTracker.inFlight);
};

const originalFetch = client.fetch.bind(client);
(client as any).fetch = (query: any, params?: any, options?: any) => {
  loadingTracker.inFlight += 1;
  notify();
  const p = (originalFetch as any)(query, params, options) as Promise<any>;
  return p.finally(() => {
    loadingTracker.inFlight = Math.max(0, loadingTracker.inFlight - 1);
    notify();
  });
};

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
