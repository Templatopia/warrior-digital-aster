import { locales } from './i18n';
/** Every page is generated once per language: /en/…, /fr/… */
export const getLocalePaths = () => locales.map((lang) => ({ params: { lang } }));
