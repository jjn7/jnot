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
  // TODO: pick one address for the site and the cover letter (brief: open question).
  email: 'admin@jnot.net',
  whatsapp: {
    display: '+61 415 145 768',
    href: 'https://wa.me/61415145768',
  },
  // TODO: add your LinkedIn profile URL. The link shows as a placeholder until you do.
  linkedin: '' as string,
  /** Drop the PDF into /public with this name. robots.txt keeps crawlers out of it. */
  resume: '/joel-nottle-resume.pdf',
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
    body: 'We go back and forth in short, clear rounds. I keep a list of every change so nothing slips through.',
  },
  {
    title: 'Launch and handover',
    body: 'I look after the domain, hosting and final checks, then show you how to keep the site up to date yourself.',
  },
] as const;

export const skills = [
  { group: 'Builders', items: ['Cornerstone / Pro', 'Shopify', 'Squarespace', 'Wix'] },
  { group: 'Code', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Liquid', 'React', 'Next.js'] },
  { group: 'Workflow', items: ['VS Code', 'Git', 'GitHub'] },
  { group: 'Other', items: ['Custom WordPress plugins', 'Google Analytics', 'DNS and hosting'] },
] as const;

/** The strip under the work grid: things that aren't site designs. */
export const codeWork = [
  {
    title: 'Document and video libraries',
    body: 'Custom WordPress plugins for organising and publishing a client’s documents and videos, managed from the dashboard.',
    tags: ['PHP', 'WordPress'],
  },
  {
    title: 'Bookings and API integrations',
    body: 'A booking plugin, plus integrations that connect WordPress sites to outside services through their APIs.',
    tags: ['PHP', 'REST APIs'],
  },
  {
    // TODO: brief open question — can the app be shown publicly yet, or only described?
    title: 'An app, built from scratch',
    body: 'In progress: an app with its own content management platform, so the people running it can update it without me.',
    tags: ['In progress'],
  },
] as const;

export const about = {
  // 80–120 words. Drawn from the brief; check it against the cover letter.
  // Don't name the agency here or anywhere else in this public repo (see content.config.ts).
  paragraphs: [
    'I started out in retail and hospitality, which taught me to listen to what someone actually needs before suggesting anything.',
    'Since September 2022 I’ve been a web developer at an Adelaide marketing agency, building and looking after websites for small and medium businesses: coffee roasters, breweries, health practices and insurance brokers. A lot of that work is directly with clients, from the first questions through to launch. I also take on my own clients, like All Build SA.',
    'I’m as comfortable in Shopify, Squarespace and Cornerstone as I am writing custom code and WordPress plugins, and I pick whichever suits the client, not me.',
  ],
  facts: [
    { label: 'Now', value: 'Web developer, Adelaide agency' },
    { label: 'Since', value: 'September 2022' },
    { label: 'Before', value: 'Retail and hospitality' },
    { label: 'Based', value: 'Vietnam, from December 2026' },
  ],
} as const;
