import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zo87kq7g',
  dataset: 'projects',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: undefined, // We don't need a token for public read access
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
