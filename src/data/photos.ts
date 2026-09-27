/**
 * Demo photography registry.
 * Demo images come from Unsplash (free licence, https://unsplash.com/license) and are served from its CDN.
 * For a client build, drop real photos into src/assets/photos/ and point `src` at the imported file:
 *   import lobby from '../assets/photos/lobby.jpg';  →  lobby: { src: lobby, alt: { … } }
 * The <Photo> component handles both.
 */
import type { ImageMetadata } from 'astro';

export type PhotoSrc = ImageMetadata | `unsplash:${string}`;
export interface PhotoEntry {
  src: PhotoSrc;
  alt: { en: string; fr: string };
}

export const photos = {
  heroLiving: { src: 'unsplash:1600210491892-03d54c0aaf87', alt: { en: 'Bright living room with arched windows and a fireplace', fr: 'Salon lumineux avec fenêtres cintrées et foyer' } },
  loungeChairs: { src: 'unsplash:1524758631624-e2822e304c36', alt: { en: 'Lounge with sculptural chairs and a floor lamp', fr: 'Salon avec fauteuils sculpturaux et lampadaire' } },
  wallClock: { src: 'unsplash:1533090161767-e6ffed986c88', alt: { en: 'Minimal white wall with a wooden clock and a plant', fr: 'Mur blanc épuré avec horloge en bois et plante' } },
  torontoSkyline: { src: 'unsplash:1517090504586-fde19ea6066f', alt: { en: 'Toronto skyline seen from a waterfront park', fr: 'Le centre-ville de Toronto vu d’un parc riverain' } },
  suiteLivingWarm: { src: 'unsplash:1618221195710-dd6b41faaea6', alt: { en: 'Warm living room with a grey sofa and leather ottomans', fr: 'Salon chaleureux avec canapé gris et poufs en cuir' } },
  fitness: { src: 'unsplash:1571902943202-507ec2618e8f', alt: { en: 'Fitness studio with cardio machines and city views', fr: 'Salle de sport avec appareils cardio et vue sur la ville' } },
  communityDinner: { src: 'unsplash:1528605248644-14dd04022da1', alt: { en: 'Residents sharing a long dinner table', fr: 'Des résidents partagent une grande table' } },
  buildingTower: { src: 'unsplash:1545324418-cc1a3fa10c00', alt: { en: 'Residential tower with balconies at dusk', fr: 'Tour résidentielle avec balcons au crépuscule' } },
  livingGrey: { src: 'unsplash:1600121848594-d8644e57abab', alt: { en: 'Living room with grey sofas and a pendant light', fr: 'Salon avec canapés gris et suspension' } },
  bedroomWhite: { src: 'unsplash:1600607687644-c7171b42498f', alt: { en: 'White bedroom with floor-to-ceiling doors', fr: 'Chambre blanche avec portes pleine hauteur' } },
  kitchenWhite: { src: 'unsplash:1484154218962-a197022b5858', alt: { en: 'White kitchen with an island and black pendants', fr: 'Cuisine blanche avec îlot et suspensions noires' } },
  bedroomDark: { src: 'unsplash:1616594039964-ae9021a400a0', alt: { en: 'Primary bedroom with an upholstered bed', fr: 'Chambre principale avec lit capitonné' } },
  cafe: { src: 'unsplash:1554118811-1e0d58224f24', alt: { en: 'Neighbourhood café with plants and communal tables', fr: 'Café de quartier avec plantes et grandes tables' } },
  dining: { src: 'unsplash:1617806118233-18e1de247200', alt: { en: 'Dining area with green velvet chairs', fr: 'Salle à manger avec chaises en velours vert' } },
  openLiving: { src: 'unsplash:1600607687939-ce8a6c25118c', alt: { en: 'Open-plan suite with oak panelling and a kitchen', fr: 'Appartement à aire ouverte avec boiseries et cuisine' } },
  rooftop: { src: 'unsplash:1584132967334-10e028bd69f7', alt: { en: 'Rooftop terrace with loungers and a pool', fr: 'Terrasse sur le toit avec chaises longues et piscine' } },
  facadeModern: { src: 'unsplash:1515263487990-61b07816b324', alt: { en: 'Modern residential façade against a blue sky', fr: 'Façade résidentielle moderne sous un ciel bleu' } },
  balconies: { src: 'unsplash:1460317442991-0ec209397118', alt: { en: 'Stacked balconies on a residential building', fr: 'Balcons superposés d’un immeuble résidentiel' } },
  rooftopFriends: { src: 'unsplash:1529156069898-49953e39b3ac', alt: { en: 'Friends sitting together on a rooftop', fr: 'Des amis assis ensemble sur un toit' } },
  friendsTable: { src: 'unsplash:1543269865-cbf427effbad', alt: { en: 'Neighbours chatting around a table', fr: 'Des voisins discutent autour d’une table' } },
  cowork: { src: 'unsplash:1522202176988-66273c2fd55f', alt: { en: 'People working together with laptops', fr: 'Des personnes travaillent ensemble avec des portables' } },
  pets: { src: 'unsplash:1548199973-03cce0bbc87b', alt: { en: 'Two happy dogs running outside', fr: 'Deux chiens joyeux qui courent dehors' } },
  yoga: { src: 'unsplash:1506126613408-eca07ce68773', alt: { en: 'Yoga at sunset on a deck', fr: 'Yoga au coucher du soleil sur une terrasse' } },
  openLivingDining: { src: 'unsplash:1604014237800-1c9102c219da', alt: { en: 'Open living and dining space with wood details', fr: 'Salon et salle à manger ouverts avec détails en bois' } },
  cityStreet: { src: 'unsplash:1449824913935-59a10b8d2000', alt: { en: 'Busy downtown street lined with towers', fr: 'Rue animée du centre-ville bordée de tours' } },
  bathroom: { src: 'unsplash:1600566752355-35792bedcfea', alt: { en: 'Bathroom with a freestanding tub and glass shower', fr: 'Salle de bain avec baignoire autoportante et douche vitrée' } },
  readingNook: { src: 'unsplash:1586023492125-27b2c045efd7', alt: { en: 'Reading nook with a yellow armchair', fr: 'Coin lecture avec fauteuil jaune' } },
  kitchenDark: { src: 'unsplash:1600489000022-c2086d79f9d4', alt: { en: 'Kitchen with dark cabinetry and open shelving', fr: 'Cuisine aux armoires foncées et tablettes ouvertes' } },
} satisfies Record<string, PhotoEntry>;

export type PhotoKey = keyof typeof photos;
export const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];
