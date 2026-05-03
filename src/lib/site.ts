import siteData from '../content/site.json';
import servicesData from '../content/services.json';
import faqData from '../content/faq.json';
import beforeAfterData from '../content/before-after.json';

export const site = siteData;
export const services = servicesData as Service[];
export const faq = faqData as FaqItem[];
export const beforeAfter = beforeAfterData as BeforeAfterPair[];

export interface Service {
  slug: string;
  name: string;
  short: string;
  body: string;
  timeline: string;
  feature?: boolean;
  eyebrow?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type BeforeAfterPair =
  | {
      id: number;
      kind: 'slider';
      caption: string;
      detail: string;
      before: string;
      beforeAlt: string;
      after: string;
      afterAlt: string;
    }
  | {
      id: number;
      kind: 'photo';
      caption: string;
      detail: string;
      image: string;
      alt: string;
    };

export const telHref = `tel:${site.phoneRaw}`;
export const smsHref = `sms:${site.phoneRaw}`;
