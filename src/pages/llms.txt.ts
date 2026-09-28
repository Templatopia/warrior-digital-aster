/** llms.txt — a plain-language summary for AI assistants and answer engines, generated from content. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../config/site.json';
import { byOrder } from '../lib/content';

export const GET: APIRoute = async ({ site: url }) => {
  const base = url!.toString().replace(/\/$/, '');
  const suites = (await getCollection('suites')).sort(byOrder);
  const amenities = (await getCollection('amenities')).sort(byOrder);
  const places = (await getCollection('places')).sort(byOrder);
  const faqs = (await getCollection('faqs')).sort(byOrder);
  const a = site.address;
  const body = `# ${site.name}

> ${site.description.en}

- Address: ${a.street}, ${a.city}, ${a.region} ${a.postalCode}
- Neighbourhood: ${site.neighbourhood}
- Leasing office: ${site.phone} · ${site.email} · ${site.hours.map((h) => `${h.label.en} ${h.opens}–${h.closes}`).join(', ')}
- Building: ${site.stats.storeys} storeys, ${site.stats.suites} rental suites, pets allowed (up to 2)
- Rents from: $${site.stats.priceFrom.toLocaleString('en-CA')} CAD/month
- Current offer: ${site.promo.enabled ? `${site.promo.text.en} ${site.promo.terms.en}` : 'none'}

## Floorplans
${suites.map((s) => `- ${s.data.name}: ${s.data.beds === 0 ? 'Studio' : `${s.data.beds} bed`}, ${s.data.baths} bath, ${s.data.sqft} sq ft, from $${s.data.priceFrom.toLocaleString('en-CA')}/month, ${s.data.availability === 'now' ? 'available now' : s.data.availability === 'waitlist' ? 'waitlist' : `available ${s.data.availability}`}`).join('\n')}

## Amenities (included, no amenity fees)
${amenities.map((x) => `- ${x.data.name.en} (${x.data.location.en}): ${x.data.blurb.en}`).join('\n')}

## Nearby (walking time from the lobby)
${places.map((p) => `- ${p.data.name} (${p.data.category}): ${p.data.walkMinutes} min`).join('\n')}

## FAQ
${faqs.map((f) => `- ${f.data.question.en} ${f.data.answer.en}`).join('\n')}

## Pages
- [Suites & floorplans](${base}/en/suites/)
- [Amenities](${base}/en/amenities/)
- [Neighbourhood](${base}/en/neighbourhood/)
- [Lifestyle](${base}/en/lifestyle/)
- [Gallery](${base}/en/gallery/)
- [Book a tour](${base}/en/contact/)
- French version: ${base}/fr/
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
