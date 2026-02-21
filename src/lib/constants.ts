import { Project, Service, Testimonial, QAEntry } from '@/types';

export const PERSONAL = {
  name: 'Chad Green',
  initials: 'CG',
  brand: 'CHAD',
  email: 'chadmoschino@grellaxlabs.com',
  calendly: 'https://calendly.com/chadmoschino-grellaxlabs/30min',
  instagram: 'https://instagram.com/oneflyassnerd',
  role: 'Designer & Developer',
  age: 26,
  bio: 'Chad Green — 26-year-old designer turned full-stack developer with 5+ years shaping digital products. From pixel-perfect graphics and UX systems to production-grade web applications, every project is built with a designer\u2019s eye and an engineer\u2019s discipline. Self-taught. Raleigh NC, serving brands nationwide through Grellax Labs.',
  location: { city: 'Raleigh', state: 'NC', region: 'East Coast' },
  siteUrl: 'https://chadgreen.dev',
  googleReviews: 'https://g.page/r/CXrtHp511j47EAE/review',
  projectCount: '50+',
  trackRecord: '5+ years',
};

export const PROJECTS: Project[] = [
  {
    id: 'saber-tooth-treats',
    title: 'Saber Tooth Treats',
    category: 'E-Commerce & Product Branding',
    image: '/saber-tooth-treats.png',
    stats: 'Concept Build',
    impact: 'Passion project — built to prove end-to-end e-commerce capability with zero client brief, pure craft on display.',
    description: 'A portfolio passion project — a brand concept designed and built from scratch to flex creative and technical range. Neo-brutalist, comic-book inspired interface with vet-approval trust badges, size-based product selector, and punchy micro-copy demonstrating end-to-end brand thinking.',
    color: 'from-orange-500/20 to-amber-500/20',
    externalUrl: 'https://saber-tooth-treats.netlify.app/',
    isShopify: true,
  },
  {
    id: 'dominicans-raleigh',
    title: 'Dominicans of Raleigh',
    category: 'Hospitality & Brand Revitalization',
    image: '/dominicans.png',
    stats: 'Conversion Engine',
    impact: 'Replaced a broken legacy site with a mobile-first, reservation-ready platform — now the main driver of new guests.',
    description: 'A complete digital resurrection for a local staple. Replacing a fractured, non-functional legacy site with a mobile-first, appetite-inducing platform that seamlessly guides visitors from browsing to booking a table.',
    color: 'from-blue-600/20 to-red-500/20',
    externalUrl: 'https://spiffy-sherbet-cec220.netlify.app/',
    isShopify: false,
  },
  {
    id: 'dominican-barbershop',
    title: 'Dominican Barbershop',
    category: 'Local Business & Branding',
    image: '/dominican-barbershop.png',
    stats: 'Brand Revitalization',
    impact: 'Rebuilt from scratch — faster loads, local SEO baked in, booking-first layout for a community staple.',
    description: 'Transformed an outdated, non-responsive site into a sleek, mobile-first experience. React and tailored Tailwind components deliver a pixel-perfect interface that loads instantly with optimized copy and structure for local SEO.',
    color: 'from-blue-600/20 to-red-500/20',
    externalUrl: 'https://dominicanbarbershop.netlify.app',
    isShopify: false,
  },
  {
    id: 'dreuxhamm',
    title: 'Dreux Hamm',
    category: 'Luxury Fashion & Global Comms',
    image: '/dreuxhamm.png',
    stats: 'Scalable Architecture',
    impact: 'Luxury-tier headless storefront — gallery-quality visuals and zero theme limitations for a global fashion brand.',
    description: 'A seamless, reactant frontend delivering gallery-quality visuals at lightning speeds. A fluid, high-conversion shopping experience that feels as premium as the garments themselves, optimizing every pixel for brand authority and sales velocity.',
    color: 'from-stone-500/20 to-neutral-400/20',
    externalUrl: 'https://dreuxhamm.shop/',
    isShopify: true,
  },
  {
    id: 'wecare-jamaica',
    title: 'We Care Jamaica',
    category: 'International Non-Profit',
    image: '/wecare-jamaica.png',
    stats: 'Trust Infrastructure',
    impact: 'Streamlined donation UX and brand credibility — built to turn visitor empathy into consistent action.',
    description: 'Rebuilt to exude capability and transparency. Through a streamlined donation flow and warm, authoritative visual identity, we removed the barriers between empathy and action, empowering the organization to secure more consistent international support.',
    color: 'from-emerald-600/20 to-teal-500/20',
    externalUrl: 'https://wecarejamaica.netlify.app/',
    isShopify: false,
  },
  {
    id: 'repair-wizardz',
    title: 'Repair Wizardz',
    category: 'High-Velocity Service Booking',
    image: '/repair-wizardz.png',
    stats: 'Lead Capture System',
    impact: 'Booking-first layout with local SEO — turns search intent into confirmed appointments, no phone tag.',
    description: 'Speed to lead was everything. A direct-response platform focused on capturing the appointment with a friction-free booking engine and localized SEO optimization, turning casual searchers into confirmed appointments on autopilot.',
    color: 'from-orange-600/20 to-red-500/20',
    externalUrl: 'https://repairwizardz.us/#/',
    isShopify: false,
  },
  {
    id: 'kairos-ai',
    title: 'Kairos AI',
    category: 'SaaS Tool Library & Infrastructure',
    image: '/kairos-preview.png',
    stats: 'Community Hub',
    impact: 'High-density AI resource hub — bento-grid layout keeps tools and docs accessible without visual clutter.',
    description: 'A high-performance resource hub designed to handle content density without visual clutter, using bento-grid layouts for maximum information retention. Integrates real-time API tools and a vast library of resources.',
    color: 'from-blue-600/20 to-indigo-500/20',
    externalUrl: 'https://www.kairosai.site',
    isShopify: false,
  },
  {
    id: 'project-prevail',
    title: 'Project Prevail',
    category: 'Headless E-Commerce & Streetwear',
    image: '/project-prevail.png',
    stats: 'Headless Shopify',
    impact: 'Fully custom headless Shopify build — cinematic dark-mode UI, live inventory, zero theme compromises.',
    description: 'A fully custom headless Shopify storefront using React, bypassing traditional theme limitations for total creative control. Cinematic, dark-mode shopping experience with real-time Shopify inventory and seamless cart integration.',
    color: 'from-red-700/20 to-stone-600/20',
    externalUrl: 'https://project-prevail-headless.netlify.app/',
    isShopify: true,
  },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Design & Build',
    icon: 'layout',
    description: 'Live in 7 days. 95+ Lighthouse scores. Built to convert, not just exist.',
  },
  {
    id: '2',
    title: 'Full App Development',
    icon: 'code',
    description: 'From MVPs to production-grade apps — React Native, SaaS dashboards, custom platforms. I architect robust systems that scale.',
  },
  {
    id: '3',
    title: 'SEO & Performance',
    icon: 'chart',
    description: "Slow sites bleed money. I audit Core Web Vitals, fix what's broken, and get you to 90+ Lighthouse scores.",
  },
  {
    id: '4',
    title: 'Boost Cartel',
    icon: 'rocket',
    description: 'Ultimate Discord infrastructure. Bulk server boosts, Nitro specials, and high-performance hosting.',
    isComingSoon: true,
    link: 'https://boostcartel.com',
  },
];

export const TECH_BADGES = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Shopify', color: '#96BF48' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'Git', color: '#F05032' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Shahiza',
    role: 'Executive Director',
    company: 'We Care Jamaica',
    content: "Chad helped us turn scattered ideas into a fully functional, impactful website. He didn't just execute what we asked for, he elevated it. Thoughtful, detail oriented, and an excellent communicator.",
    initials: 'WC',
  },
  {
    id: '2',
    name: 'Evy Yang',
    role: 'Clothing Brand Owner',
    company: '',
    content: "Chad did an amazing job on my website. His creativity is honestly next level. The website came out looking really professional and clean, and he finished it way faster than I expected.",
    initials: 'EY',
  },
  {
    id: '3',
    name: 'Ryan M.',
    role: 'SaaS Founder',
    company: '',
    content: "Chad turned my idea into a fully working site in under a week. The attention to detail was crazy. Already seeing more conversions since launch.",
    initials: 'RM',
  },
  {
    id: '4',
    name: 'Sarah J.',
    role: 'E-commerce Brand Owner',
    company: '',
    content: "Super easy to work with and really understood my vision. My site looks 10x better than what I had before. Customers have been complimenting it non-stop.",
    initials: 'SJ',
  },
  {
    id: '5',
    name: 'K Davis',
    role: 'Clothing Brand Owner',
    company: '',
    content: "Helped get my clothing brand website up and running custom made to my liking. Very professional and precise. Highly recommended.",
    initials: 'KD',
  },
];

export const PROJECT_TYPES = [
  'Website',
  'E-Commerce / Shopify',
  'Web App',
  'Redesign',
  'Other',
];

export const BUDGET_RANGES = [
  '$300 – $800',
  '$800 – $2K',
  '$2K – $4K',
  '$4K+',
];

export const TECH_STACK = [
  'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Tailwind', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL',
];

export const QA_DATABASE: QAEntry[] = [
  {
    keywords: ['pricing', 'cost', 'price', 'how much', 'budget', 'afford', 'expensive', 'cheap', 'money'],
    answer: "Our pricing starts at $300 for high-impact landing pages. Full websites typically range from $800 to $4,000+. Every project is custom quoted based on your specific needs. Book a free 15-minute call to get an exact quote!",
  },
  {
    keywords: ['timeline', 'how long', 'time', 'fast', 'quick', 'delivery', 'turnaround', 'days', 'weeks', 'speed'],
    answer: "We ship FAST! Most projects deliver in 5 to 7 days. We have shipped 15+ sites monthly. No agency overhead means faster turnaround. Simple landing pages can be done even faster!",
  },
  {
    keywords: ['services', 'what do you do', 'offer', 'help', 'build', 'provide'],
    answer: "We build premium websites that convert: Landing Pages, Full Custom Websites, Shopify Stores, Complete Redesigns. Every project includes custom design, hand coded development, SEO optimization, mobile responsiveness, and 14 days post launch support.",
  },
  {
    keywords: ['contact', 'reach', 'email', 'call', 'talk', 'book', 'schedule', 'meeting', 'get started', 'start', 'order', 'buy', 'purchase', 'hire'],
    answer: "Ready to start? Book a free 15 minute call at calendly.com/chadmoschino-grellaxlabs/30min or email chadmoschino@grellaxlabs.com. We respond within 24 hours!",
  },
  {
    keywords: ['experience', 'portfolio', 'work', 'projects', 'examples', 'clients', 'brands'],
    answer: "We have scaled 50+ brands with 5+ years experience. Check the projects above to see recent work like We Care Jamaica (nonprofit) and Repair Wizardz (local service). We ship 15+ sites monthly!",
  },
  {
    keywords: ['tech', 'stack', 'technology', 'react', 'code', 'framework', 'build with', 'how built'],
    answer: "We code from scratch using React, TypeScript, Next.js, Tailwind CSS, Node.js, and Shopify/Stripe integrations. No page builders or templates equals faster load times, better SEO, complete customization.",
  },
  {
    keywords: ['location', 'where', 'based', 'timezone', 'local', 'nyc', 'new york'],
    answer: "Based on the East Coast (NYC timezone) but work with clients worldwide. Direct communication, fast responses, no timezone excuses.",
  },
  {
    keywords: ['shopify', 'ecommerce', 'store', 'sell', 'products', 'shop'],
    answer: "Yes! We build Shopify stores and e-commerce sites with Stripe integration. You get clean, polished UI code ready to start selling. Perfect for product based businesses.",
  },
  {
    keywords: ['seo', 'google', 'search', 'rank', 'traffic'],
    answer: "SEO is built into every project: fast load times (under 2 seconds), semantic HTML, proper meta tags, mobile optimization. These fundamentals help you rank better on Google.",
  },
  {
    keywords: ['revision', 'changes', 'edit', 'update', 'modify', 'feedback'],
    answer: "Every project includes 2 focused revision rounds and 14 days post launch support for minor tweaks. We also provide a walkthrough video of your completed site.",
  },
  {
    keywords: ['process', 'how works', 'steps', 'workflow'],
    answer: "Our process: 1) Book a free call 2) Share your vision 3) Get a fixed quote 4) We build in 5 to 7 days 5) 2 revision rounds 6) Launch and 14 days support. Simple and fast!",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'what up'],
    answer: "Hey! I'm Chad's assistant. Ask me about pricing, timeline, services, or how to get started. What can I help you with?",
  },
  {
    keywords: ['thanks', 'thank you', 'bye', 'goodbye', 'appreciate'],
    answer: "You're welcome! Feel free to book a call or email to get started. Have a great day!",
  },
  {
    keywords: ['why', 'different', 'better', 'vs', 'agency', 'freelancer'],
    answer: "Why work with us? Solo developer means no overhead and competitive prices. 5 to 7 day delivery. Hand coded (no templates). Direct communication. 50+ brands scaled. Fast and reliable!",
  },
];
