import { getCollection, getEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

/** Page copy for a given page + language (src/content/pages/{lang}/{page}.json) */
export async function getPage<T = any>(locale: Locale, page: string): Promise<T & { seo: { title: string; description: string } }> {
  const entry = await getEntry('pages', `${locale}/${page}`);
  if (!entry) throw new Error(`Missing page copy: src/content/pages/${locale}/${page}.json`);
  return entry.data as any;
}

export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getSuites() {
  return (await getCollection('suites')).sort(byOrder);
}
