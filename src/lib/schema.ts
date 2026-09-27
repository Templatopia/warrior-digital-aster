/** JSON-LD builders (SEO / AEO). Everything is generated from site.json + content collections. */
import type { CollectionEntry } from 'astro:content';
import site from '../config/site.json';
import { l, pagePath, t, type PageKey } from './i18n';
import type { Locale } from '../i18n/ui';

const base = site.url.replace(/\/$/, '');
const address = { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: site.address.country };
const hours = site.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => ({ Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' })[d]), opens: h.opens, closes: h.closes }));

export function buildingSchema(locale: Locale, amenities: CollectionEntry<'amenities'>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    '@id': `${base}/#building`,
    name: site.name,
    description: l(site.description, locale),
    url: `${base}${pagePath(locale, 'home')}`,
    telephone: site.phone,
    email: site.email,
    address,
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
    numberOfAccommodationUnits: site.stats.suites,
    petsAllowed: site.petsAllowed,
    amenityFeature: amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: l(a.data.name, locale), value: true })),
    containedInPlace: { '@type': 'Place', name: site.neighbourhood },
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=75',
  };
}

export function leasingOfficeSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${base}/#leasing-office`,
    name: `${site.name} — ${t(locale, 'footer.office')}`,
    url: `${base}${pagePath(locale, 'contact')}`,
    telephone: site.phone,
    email: site.email,
    address,
    openingHoursSpecification: hours,
    parentOrganization: { '@type': 'Organization', name: site.landlord.name, url: site.landlord.url },
  };
}

export function breadcrumbSchema(locale: Locale, page: PageKey | 'privacy' | 'accessibility' | 'terms', name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: `${base}${pagePath(locale, 'home')}` },
      { '@type': 'ListItem', position: 2, name, item: `${base}${pagePath(locale, page)}` },
    ],
  };
}

export function faqSchema(locale: Locale, faqs: CollectionEntry<'faqs'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: l(f.data.question, locale), acceptedAnswer: { '@type': 'Answer', text: l(f.data.answer, locale) } })),
  };
}

export function floorPlanSchema(locale: Locale, suites: CollectionEntry<'suites'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fr' ? 'Plans d’appartements' : 'Floorplans',
    itemListElement: suites.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'FloorPlan',
        name: s.data.name,
        numberOfBedrooms: s.data.beds,
        numberOfBathroomsTotal: s.data.baths,
        floorSize: { '@type': 'QuantitativeValue', value: s.data.sqft, unitCode: 'FTK' },
        isPlanForApartment: { '@type': 'Apartment', containedInPlace: { '@id': `${base}/#building` } },
        offers: { '@type': 'Offer', price: s.data.priceFrom, priceCurrency: 'CAD', availability: s.data.availability === 'waitlist' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock' },
      },
    })),
  };
}
