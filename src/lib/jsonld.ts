import { site, services, faq } from './site';

export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: site.brand,
  description: site.metaDescription,
  url: `https://${site.domain}/`,
  telephone: `+1-${site.phone}`,
  priceRange: '$$',
  areaServed: { '@type': 'State', name: 'New Jersey' },
  openingHours: 'Mo-Sa 08:00-20:00',
};

export const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export const serviceList = services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.body,
  serviceType: 'Floor cleaning',
  areaServed: { '@type': 'State', name: 'New Jersey' },
  provider: {
    '@type': 'HomeAndConstructionBusiness',
    name: site.brand,
    telephone: `+1-${site.phone}`,
  },
}));
