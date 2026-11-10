/**
 * Everything on the site that isn't a case study lives here,
 * so copy changes don't mean digging through components.
 */

export const site = {
  name: 'Joel Nottle',
  title: 'Joel Nottle — Web Designer & Developer',
  description:
    'Web designer and developer building websites for everyone from local cafés and tradies to not-for-profits, schools and government-funded programs.',
  url: 'https://jnot.net',
  locale: 'en_AU',
  gaId: 'G-5CLXPD2KRE',

  hook: 'What will you ask of me next?',
  lede: 'Web designer and developer building websites for everyone from local cafés and tradies to not-for-profits, schools and government-funded programs.',
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

/** A skill is a name, optionally with the specific parts used. */
export type Skill = string | { name: string; detail: string };

export const skills: ReadonlyArray<{ group: string; items: readonly Skill[]; rows?: boolean }> = [
  {
    group: 'Builders',
    items: [
      'WordPress',
      'Cornerstone / Pro',
      'Shopify',
      'WooCommerce',
      'Squarespace',
      'Wix',
      'HubSpot CMS',
      'Elementor',
      'Avada',
      { name: 'Gravity Forms', detail: 'Stripe, User Registration, Advanced Post Creation, Gravity PDF' },
      'Pods',
      'ACF',
      'Microsoft Power Pages / Dataverse',
      'The Events Calendar Pro',
    ],
  },
  {
    group: 'Front end',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'React Native',
      'Next.js',
      'Tailwind',
      'Liquid',
      'Expo',
      'MapLibre',
      'SVG illustration and masking',
      'Structured data (JSON-LD / schema)',
      'Accessibility (WCAG 2.1 AA)',
    ],
  },
  {
    group: 'Back end',
    items: [
      'PHP',
      'Python',
      'Django',
      'Node.js / Express 5',
      'PostgreSQL / PostGIS',
      'Supabase',
      'SQLite',
      { name: 'WordPress plugin development', detail: 'REST API, WP-Cron, Action Scheduler, mu-plugins' },
      { name: 'Data migration and imports', detail: 'WXR, CSV, pandas' },
      'Apple Wallet and Google Wallet passes',
      { name: 'Weather and geospatial data', detail: 'Open-Meteo, WindNinja' },
    ],
  },
  {
    group: 'Hosting and cloud',
    rows: true,
    items: [
      'Vercel',
      { name: 'Cloudflare', detail: 'Pages, Access, WAF and bot rules, DNS' },
      { name: 'AWS', detail: 'ECS Fargate, RDS, S3, Organizations, CLI' },
      { name: 'Azure', detail: 'Functions, Key Vault, Entra ID' },
      'SiteGround',
      'GitHub Pages',
      'Expo EAS Build',
      'cPanel',
      'Cloudways',
    ],
  },
  {
    group: 'Tools',
    items: [
      'VS Code',
      'Git / GitHub',
      'Docker',
      'Claude Code',
      'Canva',
      'Shopify Flow',
      'Zapier',
      'All-in-One WP Migration',
      'Proxmox',
    ],
  },
  {
    group: 'Marketing',
    items: [
      'GA4',
      'Google Tag Manager',
      'SEO',
      'Google Ads',
      'Looker Studio',
      'Google Ad Grants',
      'Google Ads Editor',
      'Google Search Console',
      'Meta Ads',
      'Meta Pixel and Conversions API',
      'Microsoft Clarity',
      'AgencyAnalytics',
      'UTM and lead attribution',
      { name: 'AI chatbots', detail: 'Elfsight, ToothFairy AI' },
    ],
  },
  {
    group: 'CRM, email and payments',
    items: [
      'HubSpot (CRM)',
      'Pipedrive',
      'Klaviyo',
      'Omnisend',
      'Mailchimp',
      'Brevo',
      { name: 'Stripe', detail: 'Checkout, subscriptions, webhooks' },
      'PayPal',
      'eWay',
      { name: 'Google Calendar API', detail: 'OAuth 2.0' },
    ],
  },
];

/** What I can help with: shown under "How I work". */
export const services = [
  'Website design and build, on WordPress, Shopify, Squarespace or custom code',
  'Online stores',
  'Custom WordPress plugins',
  'Analytics, tracking and SEO',
  'Paid memberships and subscriptions, with self-managed member content',
  'Online forms, signing workflows and payment integrations',
  'CRM and email platform integrations and syncs',
  'Meta and Google conversion tracking, including Conversions API',
  'Google Ad Grants setup for not-for-profits',
  'Shopify automations',
  'Hosting, DNS and security setup (Cloudflare, AWS, Azure)',
] as const;

/** Sectors I've worked in: shown in About. */
export const sectors = [
  'Not-for-profits and community organisations',
  'Government and industry bodies',
  'Education',
  'E-commerce (coffee, beverage, health and lifestyle products)',
  'Trades, building and NDIS home modifications',
  'Health and wellness',
  'Insurance and finance',
  'Manufacturing',
  'Membership associations',
  'Veterans’ services',
  'Venture studios and startups',
  'Emergency management (bushfire)',
] as const;

/**
 * Client builds shown as text cards under "Client work".
 * Agency clients are never named: describe the organisation type and the build only.
 * No URLs, screenshots, logos, campaign names, staff names or exact figures.
 */
export const clientBuilds: ReadonlyArray<{ title: string; client: string; body: string; tags: readonly string[]; status?: string }> = [
  {
    title: 'Digital wallet membership card',
    client: 'For an industry training body',
    status: 'In progress',
    body: 'Registrants kept losing their membership number, so I’m building a service that lets them add it to Apple Wallet or Google Wallet straight from their portal profile. It runs entirely in the client’s own Azure environment: an Azure Function signs the passes, keys are kept in Key Vault, and a read-only Dataverse user means the service can only see a name and a number.',
    tags: ['Azure Functions', 'Key Vault', 'Power Pages', 'Dataverse', 'Apple Wallet', 'Google Wallet', 'Node.js'],
  },
  {
    title: 'Paid membership directory',
    client: 'For a city traders’ association',
    status: 'In progress',
    body: 'A new WordPress site where local businesses pay a yearly membership, then log in and manage their own directory listing. A moderator approves listings, and they hide automatically when a membership lapses. Renewals, failed payments and reminders run off Stripe webhooks, with branded emails throughout. It’s kept to a minimal set of plugins so it stays easy to look after.',
    tags: ['WordPress', 'Cornerstone', 'Gravity Forms', 'Stripe', 'PHP', 'Cloudflare'],
  },
  {
    title: 'CRM-to-website map sync',
    client: 'For a statewide not-for-profit',
    body: 'Member groups live in the organisation’s Craft CMS. I set up a secured API on the Craft side and a WordPress plugin that syncs the groups weekly into a searchable Google Map, without overwriting the content added on the WordPress side. It includes manual sync, logging and settings.',
    tags: ['WordPress', 'PHP', 'Craft CMS', 'Pods', 'Google Maps API', 'WP-Cron'],
  },
  {
    title: 'Tracking and Ad Grants rebuilds',
    client: 'For not-for-profits',
    body: 'Rebuilt measurement from scratch for not-for-profits running Google Ad Grants: new GTM containers, GA4 key events, conversion tracking that matches what each organisation actually wants people to do, and multi-campaign structures that work within the grant rules.',
    tags: ['Google Tag Manager', 'GA4', 'Google Ad Grants', 'Google Ads Editor'],
  },
  {
    title: 'Interactive insurance claim form',
    client: 'For an insurance broker',
    body: 'A motor vehicle claim form where people click on a diagram to mark the damage. The marked diagram carries through to the notification email. Built on Gravity Forms, alongside a full service site with a quick-quote form on every page.',
    tags: ['WordPress', 'Cornerstone', 'Gravity Forms', 'JavaScript'],
  },
  {
    title: 'Repurchase automation for coffee roasters',
    client: 'For two Shopify stores',
    body: 'An automated win-back offer for repeat customers. Shopify Flow tags eligible customers for a limited window and unlocks a discount that only that segment can use. No paid apps, and it works across both stores.',
    tags: ['Shopify', 'Shopify Flow', 'Liquid'],
  },
  {
    title: 'Website conversion tracking for paid social',
    client: 'For education and finance clients',
    body: 'Moved Meta campaigns from on-platform lead forms to real website conversions: pixel events mapped to each step of the funnel, Conversions API with deduplication, domain verification and event prioritisation. For the finance client, strict rules keep any financial or identity data away from Meta.',
    tags: ['Meta Pixel', 'Conversions API', 'GTM', 'Next.js'],
  },
];

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
    title: 'Mobile resources app',
    body: 'A mobile resources app for a client, with its own content management platform, built from the ground up.',
    tags: ['Mobile app', 'AWS ECS Fargate', 'RDS PostgreSQL', 'S3', 'Cloudflare', 'In progress'],
  },
  {
    title: 'Bulk content import pipeline',
    body: 'Python scripts that turn a master spreadsheet into WordPress import files (WXR with serialised ACF fields), so hundreds of FAQ entries load in one pass instead of by hand.',
    tags: ['Python', 'WordPress', 'ACF'],
  },
  {
    title: 'Internal job bag system',
    body: 'A browser-based replacement for a studio’s paper job bags. It auto-numbers jobs, has admin-managed dropdowns, image uploads, a simple audit history, CSV export and a printable A4 PDF.',
    tags: ['PHP', 'SQLite'],
  },
  {
    title: 'Hand-built SVG illustration',
    body: 'A stylised race car in a client’s livery for merchandise, drawn as clean SVG with strict brand-mark rules.',
    tags: ['SVG'],
  },
  {
    title: 'Contact database audit',
    body: 'Analysed a large CRM export to find why subscribers weren’t receiving newsletters. I traced it to two historical integration gaps and planned a staged clean-up that avoided billing-tier jumps.',
    tags: ['Python', 'pandas', 'HubSpot'],
  },
] as const;

export const about = {
  // 80–120 words, in the same voice as the cover letter.
  // Don't name the agency here or anywhere else in this public repo (see content.config.ts).
  paragraphs: [
    'I spent eight years in retail management and hospitality before I built my first website. It gave me a first-hand understanding of what small business owners need from their website, and it still shapes how I work.',
    'After studying software engineering at 42 Adelaide, I joined an independent creative and marketing studio in Adelaide in September 2022. I’m the main point of contact for all development work here.',
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
