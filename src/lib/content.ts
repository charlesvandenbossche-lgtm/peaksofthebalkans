import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

export type Article = CollectionEntry<'articles'>;

// Photos live in src/assets/img/ (preferred) or directly in src/ (fallback).
const images = import.meta.glob<{ default: ImageMetadata }>(['../assets/img/*.jpg', '../*.jpg'], { eager: true });
export function getImage(slot: string): ImageMetadata {
  const hit = images[`../assets/img/${slot}.jpg`] ?? images[`../${slot}.jpg`];
  if (!hit) throw new Error(`Unknown image slot "${slot}" — add src/assets/img/${slot}.jpg`);
  return hit.default;
}

export const langOf = (a: Article) => a.id.split('/')[0] as Lang;
export const slugOf = (a: Article) => a.id.split('/').slice(1).join('/');

export async function articlesFor(lang: Lang) {
  const all = await getCollection('articles', (a) => !a.data.draft && langOf(a) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function latestFor(lang: Lang, n = 4) {
  const all = await articlesFor(lang);
  const date = (a: Article) => (a.data.updatedDate ?? a.data.pubDate).getTime();
  return [...all].sort((a, b) => date(b) - date(a)).slice(0, n);
}

/** Languages in which a translation of this slug exists. */
export async function translationsOf(slug: string) {
  const all = await getCollection('articles', (a) => !a.data.draft && slugOf(a) === slug);
  return all.map(langOf);
}

export function readingTime(body = '') {
  return Math.max(2, Math.round(body.split(/\s+/).length / 220));
}
