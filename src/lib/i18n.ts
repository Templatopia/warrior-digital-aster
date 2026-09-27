import site from '../config/site.json';
import { ui, type Locale, type UiKey } from '../i18n/ui';

export const locales = site.locales as Locale[];
export const defaultLocale = site.defaultLocale as Locale;

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui[defaultLocale][key];
}

/** Pick the right language from a { en, fr } field */
export function l(field: { en: string; fr: string }, locale: Locale): string {
  return field[locale] ?? field[defaultLocale];
}

/** Site page sequence — drives the nav, the footer and the "Next page" link at the bottom of each page. */
export const pageOrder = ['home', 'suites', 'amenities', 'neighbourhood', 'lifestyle', 'gallery', 'contact'] as const;
export type PageKey = (typeof pageOrder)[number];

export function pagePath(locale: Locale, page: PageKey | 'privacy' | 'accessibility' | 'terms' | 'thanks'): string {
  return page === 'home' ? `/${locale}/` : `/${locale}/${page}/`;
}

export function nextPage(page: PageKey): PageKey {
  const i = pageOrder.indexOf(page);
  return pageOrder[(i + 1) % pageOrder.length];
}

export function otherLocale(locale: Locale): Locale {
  return locales.find((x) => x !== locale) ?? defaultLocale;
}

/** Swap the language segment of a path: /en/suites/ → /fr/suites/ */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split('/');
  if (locales.includes(parts[1] as Locale)) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join('/') || '/';
}

export function formatPrice(n: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

export function formatDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' }): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', { ...opts, timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));
}

export const localeTag: Record<Locale, string> = { en: 'en-CA', fr: 'fr-CA' };
