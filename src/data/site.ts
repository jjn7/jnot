/**
 * Everything on the site that isn't a case study lives here,
 * so copy changes don't mean digging through components.
 */

export const site = {
  name: 'Joel Nottle',
  title: 'Joel Nottle — Web Designer & Developer',
  description:
    'Web designer and developer building websites for small businesses, from cafés to insurance brokers. Shopify, WordPress, Squarespace and custom code.',
  url: 'https://jnot.net',
  locale: 'en_AU',
  gaId: 'G-5CLXPD2KRE',

  hook: 'What will you ask of me next?',
  lede: 'Web designer and developer building websites for small businesses, from cafés to insurance brokers.',
  availability: 'Based in Vietnam from December 2026, working remotely with teams in Australia and beyond.',
  footerTag: 'adelaide ↔ anywhere',
} as const;

export const contact = {
  email: 'admin@jnot.net',
  whatsapp: {
    display: '+61 415 145 768',
    href: 'https://wa.me/61415145768',
  },
  linkedin: 'https://www.linkedin.com/in/joelnottle' as string,
} as const;

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process', optional: true },
  { href: '#skills', label: 'Skills', optional: true },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

export const process = [
  {
    title: 'Brief and questions',
    body: 'I read the brief properly, then ask the questions that save rework later: who the site is for, what it has to do, and what already works.',
  },
  {
    title: 'First build',
    body: 'I get a working version up early, on the real platform, so you’re reacting to something you can click rather than a description.',
  },
  {
    title: 'Feedback rounds',
    body: 'We go back and forth until it’s right on desktop and mobile. I take feedback well, and I’ll speak up if something won’t serve the people using the site.',
  },
  {
    title: 'Launch and handover',
    body: 'I look after the domain, hosting, tracking and final checks, then show you how to keep the site up to date yourself.',
  },
] as const;

// Matches the skills table on the resume.
export const skills = [
  { group: 'Builders', items: ['Cornerstone / Pro', 'Shopify', 'WooCommerce', 'Squarespace', 'Wix', 'HubSpot CMS'] },
  {
    group: 'Front end',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Tailwind', 'Liquid'],
  },
  { group: 'Back end', items: ['PHP', 'Python', 'Django', 'Node.js / Express', 'PostgreSQL / PostGIS', 'Supabase'] },
  { group: 'Hosting and cloud', items: ['Vercel', 'Cloudflare', 'AWS', 'Azure', 'SiteGround', 'GitHub Pages'] },
  { group: 'Tools', items: ['VS Code', 'Git / GitHub', 'Docker', 'Claude Code', 'Adobe XD', 'Canva'] },
  { group: 'Marketing', items: ['GA4', 'Google Tag Manager', 'SEO', 'Google Ads', 'Looker Studio'] },
] as const;

/** The strip under the work grid: things that aren't site designs. */
export const codeWork = [
  {
    title: 'Custom WordPress plugins',
    body: 'Built to suit client needs, from document and video libraries to booking systems and API integrations.',
    tags: ['PHP', 'WordPress'],
  },
  {
    title: 'Booking plugin for driving schools',
    body: 'A commercial booking plugin for WordPress, aimed at driving schools.',
    tags: ['PHP', 'WordPress', 'In progress'],
  },
  {
    title: 'Resolute Ready app',
    body: 'A mobile resources app for Resolute Ready, with its own content management platform, built from the ground up.',
    tags: ['Mobile app', 'In progress'],
  },
  {
    title: 'Grok Academy',
    body: 'Contributed to the rebuild of Grok Academy’s Django learning platform, used by schools across Australia and New Zealand.',
    tags: ['Python', 'Django', '2025–2026'],
  },
] as const;

export const about = {
  // 80–120 words, in the same voice as the cover letter.
  // Don't name the agency here or anywhere else in this public repo (see content.config.ts).
  paragraphs: [
    'I spent eight years in retail management and hospitality before I built my first website. It gave me a first-hand understanding of what small business owners need from their website, and it still shapes how I work.',
    'After studying software engineering at 42 Adelaide, I joined an independent creative and marketing studio in Adelaide in September 2022. I’m the main point of contact for my clients there, from the first brief through rounds of feedback until it’s right on desktop and mobile.',
    'Outside that work, I designed and built Fire Path AI from scratch, and in 2026 I co-founded IP Venture Studio, where it now lives. I also take on my own clients, like All Build SA.',
  ],
  facts: [
    { label: 'Now', value: 'Web developer, Adelaide studio' },
    { label: 'Also', value: 'Co-founder, IP Venture Studio' },
    { label: 'Before', value: 'Retail management and hospitality' },
    { label: 'Studied', value: 'Software engineering, 42 Adelaide' },
    { label: 'Based', value: 'Vietnam, from December 2026' },
  ],
} as const;
