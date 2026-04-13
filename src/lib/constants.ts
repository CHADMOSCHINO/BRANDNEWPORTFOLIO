import { Project, Service, Testimonial, QAEntry } from '@/types';

export const PERSONAL = {
  name: 'Chad Green',
  initials: 'CG',
  brand: 'CHAD',
  email: 'chadmoschino@grellaxlabs.com',
  calendly: 'https://calendly.com/chadmoschino-grellaxlabs/30min',
  phone: '+19195260824',
  instagram: 'https://instagram.com/oneflyassnerd',
  role: 'Designer & Developer',
  age: 26,
  bio: 'My focus at Grellax is simple. Every client gets world-class results, no matter what. We work alongside you until the vision is fully realized. No shortcuts, no half-measures.',
  location: { city: 'Raleigh', state: 'NC', region: 'East Coast' },
  siteUrl: 'https://grellax.agency',
  googleReviews: 'https://g.page/r/CXrtHp511j47EAE/review',
  projectCount: '50+',
  trackRecord: '5+ years',
};

export const PROJECTS: Project[] = [
  {
    id: 'reloaded-3x',
    title: 'Reloaded 3X',
    category: 'E-Commerce & Brand Revival',
    image: '/omi-instagram.png',
    stats: 'Active Build',
    impact: 'Headless Shopify storefront for Omi in a Hellcat (Omar Carrasquillo) — entrepreneur with 1.2M+ Instagram followers. Full brand relaunch for his Reloaded 3X clothing line, built to scale with his audience.',
    description: 'Collaborating directly with Omi to rebuild Reloaded 3X from the ground up. Custom headless Shopify architecture, React frontend, real-time inventory, and a conversion-focused design built for high-traffic drops. A high-profile partnership built on trust and execution.',
    color: 'from-red-500/20 to-orange-500/20',
    externalUrl: 'https://www.reloaded3x.com/',
    isShopify: true,
    scope: ['UI/UX Design', 'Shopify API', 'React', 'Brand Strategy'],
    metrics: [
      { label: 'Followers', value: '1.2M+' },
      { label: 'Status', value: 'Active' },
      { label: 'Platform', value: 'Shopify' },
    ],
  },
  {
    id: 'artime-nyc',
    title: 'Artime NYC',
    category: 'Luxury Jewelry & Custom E-Commerce',
    image: '/artime-instagram.png',
    stats: 'Active Build',
    impact: 'Custom luxury e-commerce platform for Artime NYC — a collaboration between Omi in a Hellcat and Artime, specializing in custom jewelry and watches out of NYC\'s Diamond District.',
    description: 'Building a premium storefront for OMIxARTIME\'s custom jewelry brand. Headless Shopify build with product configurators, high-resolution galleries, and a luxury-grade shopping experience. Shipping worldwide from 25 West 47th Street, NYC.',
    color: 'from-amber-500/20 to-yellow-500/20',
    externalUrl: 'https://artimenyc.netlify.app/',
    isShopify: true,
    scope: ['UI/UX Design', 'Shopify API', 'React', 'Luxury E-Commerce'],
    metrics: [
      { label: 'Status', value: 'Active' },
      { label: 'Platform', value: 'Shopify' },
      { label: 'Market', value: 'Global' },
    ],
  },
  {
    id: 'saber-tooth-treats',
    title: 'Saber Tooth Treats',
    category: 'E-Commerce & Product Branding',
    image: '/saber-tooth-treats.png',
    stats: 'Concept Build',
    impact: 'Full UI/UX design and custom Shopify storefront built from zero. Concept to launch with no client brief. Pure craft.',
    description: 'Complete brand identity, UI/UX design, and headless Shopify development. Neo-brutalist, comic-book inspired interface with product selectors, trust badges, and conversion-focused copy. Frontend built in React. Backend powered by Shopify APIs.',
    color: 'from-orange-500/20 to-amber-500/20',
    externalUrl: 'https://saber-tooth-treats.netlify.app/',
    isShopify: true,
    scope: ['UI/UX Design', 'Shopify API', 'React', 'Branding'],
    metrics: [
      { label: 'Lighthouse', value: '95+' },
      { label: 'Load Time', value: '1.2s' },
      { label: 'Mobile Score', value: '98' },
    ],
  },
  {
    id: 'dominicans-raleigh',
    title: 'Dominicans of Raleigh',
    category: 'Hospitality & Brand Revitalization',
    image: '/dominicans.png',
    stats: 'Conversion Engine',
    impact: 'Full UI/UX redesign and complete rebuild. Replaced a broken legacy site with a reservation-ready platform driving 180% more guests.',
    description: 'End-to-end project: UI/UX design, frontend development, backend integration, and SEO optimization. Mobile-first layout with reservation flow, menu system, and local search visibility. Full-stack build from wireframes to deployment.',
    color: 'from-blue-600/20 to-red-500/20',
    externalUrl: 'https://spiffy-sherbet-cec220.netlify.app/',
    isShopify: false,
    scope: ['UI/UX Design', 'Full-Stack Dev', 'SEO', 'Deployment'],
    metrics: [
      { label: 'New Guests', value: '+180%' },
      { label: 'Load Time', value: '1.4s' },
      { label: 'Bounce Rate', value: '-45%' },
    ],
  },
  {
    id: 'dominican-barbershop',
    title: 'Dominican Barbershop',
    category: 'Local Business & Branding',
    image: '/dominican-barbershop.png',
    stats: 'Brand Revitalization',
    impact: 'Complete UI/UX design and full-stack rebuild. Bookings up 220% with a sub-second load time and top 3 local search ranking.',
    description: 'Ground-up rebuild: brand identity, UI/UX design, custom React frontend, Node.js backend, booking integration, and local SEO strategy. Every component hand-coded for speed, conversion, and search visibility.',
    color: 'from-blue-600/20 to-red-500/20',
    externalUrl: 'https://dominicanbarbershop.netlify.app',
    isShopify: false,
    scope: ['UI/UX Design', 'Full-Stack Dev', 'Booking System', 'Local SEO'],
    metrics: [
      { label: 'Bookings', value: '+220%' },
      { label: 'Page Speed', value: '0.9s' },
      { label: 'Local SEO', value: 'Top 3' },
    ],
  },
  {
    id: 'dreuxhamm',
    title: 'Dreux Hamm',
    category: 'Luxury Fashion & Global Comms',
    image: '/dreuxhamm.png',
    stats: 'Scalable Architecture',
    impact: 'Full UI/UX design and headless Shopify build for a global luxury fashion brand. Conversions up 3.2x with gallery-quality visuals.',
    description: 'Complete creative direction, UI/UX design, and custom React frontend connected to Shopify via Storefront API. Product galleries, real-time inventory, seamless checkout, and brand-level visual polish. Backend fully managed through Shopify.',
    color: 'from-stone-500/20 to-neutral-400/20',
    externalUrl: 'https://dreuxhamm.shop/',
    isShopify: true,
    scope: ['UI/UX Design', 'Shopify API', 'React', 'Creative Direction'],
    metrics: [
      { label: 'Conversion', value: '+3.2x' },
      { label: 'Avg Session', value: '4m 12s' },
      { label: 'Lighthouse', value: '94' },
    ],
  },
  {
    id: 'wecare-jamaica',
    title: 'We Care Jamaica',
    category: 'International Non-Profit',
    image: '/wecare-jamaica.png',
    stats: 'Trust Infrastructure',
    impact: 'Full UI/UX design and full-stack development for an international nonprofit. Donations up 160% with a streamlined giving flow.',
    description: 'End-to-end build: brand refresh, UI/UX design, React frontend, donation payment integration, and cloud deployment. Designed to convert empathy into action with transparent UX and trust-building visual identity.',
    color: 'from-emerald-600/20 to-teal-500/20',
    externalUrl: 'https://wecarejamaica.netlify.app/',
    isShopify: false,
    scope: ['UI/UX Design', 'Full-Stack Dev', 'Payment Integration', 'Branding'],
    metrics: [
      { label: 'Donations', value: '+160%' },
      { label: 'Trust Score', value: '92/100' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
  },
  {
    id: 'repair-wizardz',
    title: 'Repair Wizardz',
    category: 'High-Velocity Service Booking',
    image: '/repair-wizardz.png',
    stats: 'Lead Capture System',
    impact: 'Full UI/UX design and full-stack build. Leads up 310% with a booking-first layout and automated appointment capture.',
    description: 'Complete project: UI/UX design, React frontend, backend booking engine, CRM integration, and local SEO optimization. Every element built to convert search traffic into confirmed appointments on autopilot.',
    color: 'from-orange-600/20 to-red-500/20',
    externalUrl: 'https://repairwizardz.us/#/',
    isShopify: false,
    scope: ['UI/UX Design', 'Full-Stack Dev', 'Booking Engine', 'CRM'],
    metrics: [
      { label: 'Leads', value: '+310%' },
      { label: 'Load Time', value: '1.1s' },
      { label: 'CTR', value: '+85%' },
    ],
  },
  {
    id: 'kairos-ai',
    title: 'Kairos AI',
    category: 'SaaS Tool Library & Infrastructure',
    image: '/kairos-preview.png',
    stats: 'Community Hub',
    impact: 'Full UI/UX design and full-stack SaaS platform. 2.4K+ users with real-time API tools and a 6+ minute average session.',
    description: 'End-to-end build: UI/UX design, React/Next.js frontend, Node.js backend, API integrations, database architecture, and cloud infrastructure. Bento-grid layouts handle content density while keeping the experience fast and clean.',
    color: 'from-blue-600/20 to-indigo-500/20',
    externalUrl: 'https://www.kairosai.site',
    isShopify: false,
    scope: ['UI/UX Design', 'Full-Stack Dev', 'API Integration', 'Cloud Infra'],
    metrics: [
      { label: 'Users', value: '2.4K+' },
      { label: 'Lighthouse', value: '96' },
      { label: 'Avg Session', value: '6m 30s' },
    ],
  },
  {
    id: 'project-prevail',
    title: 'Project Prevail',
    category: 'Headless E-Commerce & Streetwear',
    image: '/project-prevail.png',
    stats: 'Headless Shopify',
    impact: 'Full UI/UX design and headless Shopify build. Revenue up 240% with a cinematic storefront and zero theme limitations.',
    description: 'Complete creative direction, UI/UX design, and custom React storefront connected to Shopify Storefront API. Dark-mode shopping experience with real-time inventory sync, seamless cart, and checkout. Backend managed through Shopify.',
    color: 'from-red-700/20 to-stone-600/20',
    externalUrl: 'https://project-prevail-headless.netlify.app/',
    isShopify: true,
    scope: ['UI/UX Design', 'Shopify API', 'React', 'Creative Direction'],
    metrics: [
      { label: 'Revenue', value: '+240%' },
      { label: 'Page Speed', value: '1.0s' },
      { label: 'Cart Rate', value: '+4.8x' },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Design & Build',
    icon: 'layout',
    description: 'Your site goes live in 7 days with 95+ Lighthouse scores. Every pixel is designed to turn visitors into customers — not just look pretty.',
  },
  {
    id: '2',
    title: 'Full App Development',
    icon: 'code',
    description: 'From MVP to production. React Native, SaaS dashboards, custom platforms — architected to scale as your business grows. The foundation most agencies skip.',
  },
  {
    id: '3',
    title: 'SEO & Performance',
    icon: 'chart',
    description: "Every second of load time costs you 7% in conversions. We audit Core Web Vitals, fix what's killing your rankings, and get you to 90+ Lighthouse scores.",
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
  { name: 'Claude', color: '#D97757' },
  { name: 'Anthropic', color: '#D4A27C' },
  { name: 'Cursor', color: '#00D4AA' },
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
  '$300 to $800',
  '$800 to $2K',
  '$2K to $4K',
  '$4K+',
];

export const TECH_STACK = [
  'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Tailwind', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL',
];

export const QA_DATABASE: QAEntry[] = [
  {
    keywords: ['500', 'starter', 'entry', 'deal', 'special', 'offer', 'promo', 'promotion', 'discount', 'cheap', 'affordable', 'landing page deal', 'sale', 'basic'],
    answer: "Our Starter package is $500 for a premium hand-coded landing page with SEO baked into the codebase, mobile-first design, and a Google Business Profile setup guide. This is real code written by a developer who's built for 50+ brands — not a template. Integrations available at extra cost. Limited spots per month. Text us at (919) 526-0824 or book a call!",
  },
  {
    keywords: ['domain', 'domain name', 'buy domain', 'register domain', 'hosting'],
    answer: "With our Starter package, we handle hosting setup on Netlify or Vercel (generous free tiers). We can also help with domain registration. Need custom hosting or a specific setup? We'll scope that out on a call.",
  },
  {
    keywords: ['google business', 'business profile', 'google profile', 'gbp', 'google listing', 'google maps'],
    answer: "Every project includes a Google Business Profile setup guide. That's how you show up on Google Maps and local search results. It's one of the highest-ROI things a local business can do, and we walk you through the entire setup.",
  },
  {
    keywords: ['integration', 'integrations', 'extra cost', 'add-on', 'addon', 'additional'],
    answer: "Integrations like payment processing, booking systems, CRMs, email marketing tools, and third-party APIs are available at an extra cost on top of the base package. We'll scope it out during our call and give you a clear quote. No surprises.",
  },
  {
    keywords: ['vibe coded', 'vibe code', 'template', 'wordpress', 'wix', 'squarespace', 'page builder', 'no code', 'low code', 'ai generated'],
    answer: "We don't do vibe-coded throwaway sites. Every project is hand-coded from scratch by a real software developer with 5+ years of experience. That means faster load times, better SEO, full customization, and code that actually scales. No WordPress themes, no Wix, no page builders.",
  },
  {
    keywords: ['pricing', 'cost', 'price', 'how much', 'budget', 'afford', 'expensive', 'money', 'rate', 'rates', 'quote', 'estimate'],
    answer: "Our pricing: Starter landing pages at $500. Full custom websites from $2,500 to $7,500. Headless Shopify builds from $5,000 to $12,000+. Web apps and complex platforms from $10,000+. Every project is custom-quoted based on scope. We've built for 8- and 9-figure clients and 25+ five-star Google reviews back us up. Text us at (919) 526-0824 to get a custom quote",
  },
  {
    keywords: ['payment', 'pay', 'invoice', 'deposit', 'installment', 'stripe', 'paypal', 'venmo', 'zelle'],
    answer: "We typically collect a 50% deposit upfront to kick off the project, with the remaining 50% due on completion before final handoff. We accept most payment methods. Everything is transparent. No hidden fees, no surprises.",
  },
  {
    keywords: ['timeline', 'how long', 'time', 'fast', 'quick', 'delivery', 'turnaround', 'days', 'weeks', 'speed', 'rush', 'urgent', 'asap'],
    answer: "Most projects deliver in 5 to 7 business days. Landing pages can ship even faster, sometimes 2 to 3 days. No agency overhead means faster turnarounds. Need a rush job? Let us know and we'll see what we can do.",
  },
  {
    keywords: ['services', 'what do you do', 'offer', 'help', 'build', 'provide', 'capabilities'],
    answer: "Here's what we build: Landing Pages, Full Custom Websites (up to 10+ pages), Headless Shopify Stores, E-Commerce with Stripe, Complete Redesigns, Web Apps & SaaS Dashboards, AI Chatbots & Automations, and Mobile Apps (React Native). Every project includes custom design, hand-coded development, SEO optimization, mobile responsiveness, and 14 days post-launch support.",
  },
  {
    keywords: ['contact', 'reach', 'email', 'call', 'talk', 'book', 'schedule', 'meeting', 'get started', 'start', 'order', 'buy', 'purchase', 'hire', 'calendly'],
    answer: "Ready to start? Text us at (919) 526-0824 or email chadmoschino@grellaxlabs.com. You can also DM us on Instagram @oneflyassnerd. We respond within 24 hours!",
  },
  {
    keywords: ['experience', 'portfolio', 'work', 'projects', 'examples', 'clients', 'brands', 'past work', 'case study'],
    answer: "50+ brands scaled across 5+ years. Recent work includes We Care Jamaica (international nonprofit), Repair Wizardz (local service booking), Dreux Hamm (luxury fashion headless Shopify), Dominicans of Raleigh (restaurant), and Saber Tooth Treats (e-commerce concept build). Scroll up to see them all with live links!",
  },
  {
    keywords: ['tech', 'stack', 'technology', 'react', 'code', 'framework', 'build with', 'how built', 'next.js', 'nextjs', 'typescript', 'tailwind', 'node'],
    answer: "Our stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, AWS, Docker, GraphQL, Shopify Hydrogen, and Stripe. We also use Claude AI and Cursor for intelligent development workflows. No page builders, no templates. Everything is hand-coded for speed and full control.",
  },
  {
    keywords: ['location', 'where', 'based', 'timezone', 'local', 'raleigh', 'north carolina', 'nc', 'remote'],
    answer: "Based in Raleigh, NC (Eastern timezone) but we work with clients nationwide and internationally. Direct communication via Slack, email, or scheduled calls. Timezone is never an issue. We've worked with clients from Jamaica to California.",
  },
  {
    keywords: ['shopify', 'ecommerce', 'e-commerce', 'store', 'sell', 'products', 'shop', 'online store', 'headless'],
    answer: "We build both standard Shopify themes and fully custom headless Shopify builds using React/Hydrogen. Zero theme limitations, total creative control. We also handle Stripe integrations for non-Shopify e-commerce. Recent Shopify work: Dreux Hamm (luxury fashion) and Project Prevail (streetwear).",
  },
  {
    keywords: ['seo', 'google', 'search', 'rank', 'traffic', 'organic', 'keywords', 'meta', 'lighthouse'],
    answer: "SEO is baked into every project at the code level, not bolted on after. That means sub-2-second load times, semantic HTML, structured data (JSON-LD), proper meta tags, Open Graph, image optimization, mobile-first design, and 90+ Lighthouse scores. We build sites that Google loves to index.",
  },
  {
    keywords: ['revision', 'changes', 'edit', 'update', 'modify', 'feedback', 'support', 'maintenance', 'after launch', 'post launch'],
    answer: "Every project includes 2 focused revision rounds during the build, 14 days post-launch support for minor tweaks, and a walkthrough video of the completed site. Need ongoing support? We offer retainer packages for continued design, dev, and optimization.",
  },
  {
    keywords: ['process', 'how works', 'steps', 'workflow', 'what happens', 'next steps'],
    answer: "Our process: 1) Book a free 15-min call 2) Share your vision and goals 3) Get a fixed quote with clear scope 4) We design and build in 5 to 7 days 5) 2 revision rounds to dial it in 6) Launch + 14 days of support + walkthrough video. Simple, fast, no BS.",
  },
  {
    keywords: ['retainer', 'ongoing', 'monthly', 'subscription', 'long term', 'continuous', 'maintenance plan'],
    answer: "Our retainer packages cover everything: smarter theme design, fast bug resolution, feature implementation, third-party integrations, conversion-focused audits, and AI/automation builds. It's like having a full design and dev team on call without the agency overhead. Ask us about retainer pricing on a call!",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'what up', 'good morning', 'good afternoon', 'good evening'],
    answer: "Hey! Welcome to Grellax. I'm here to help you learn about our services, pricing, and process. We've scaled 50+ brands with 25+ five-star Google reviews. What can I help you with?",
  },
  {
    keywords: ['ai', 'chatbot', 'automation', 'claude', 'anthropic', 'cursor', 'artificial intelligence', 'bot', 'n8n', 'automate', 'workflow'],
    answer: "We build custom AI chatbots trained on your business data, workflow automations using n8n and custom code, and AI-powered features that boost conversions. From intelligent customer assistants to automated lead pipelines, we integrate AI directly into your product. We use Claude (Anthropic) and Cursor in our own workflow.",
  },
  {
    keywords: ['thanks', 'thank you', 'bye', 'goodbye', 'appreciate', 'later', 'see you'],
    answer: "Anytime! If you're ready to move forward, text us at (919) 526-0824 or email chadmoschino@grellaxlabs.com. We'd love to build something great for you.",
  },
  {
    keywords: ['why', 'different', 'better', 'vs', 'agency', 'freelancer', 'stand out', 'unique', 'advantage'],
    answer: "What makes us different: Solo developer means no overhead and competitive prices. 5 to 7 day delivery (agencies take weeks). 100% hand-coded, no templates, no page builders. Direct communication with the person actually building your site. 50+ brands scaled. AI and automation built into our workflow. You get agency-quality output at freelancer speed.",
  },
  {
    keywords: ['chad', 'who', 'founder', 'owner', 'about', 'team', 'developer', 'designer', 'background'],
    answer: "Grellax is run by Chad Green, a 26-year-old designer and full-stack developer based in Raleigh, NC with 5+ years of experience. Chad has scaled 50+ brands ranging from nonprofits to luxury fashion to SaaS platforms. Every client gets world-class results with direct, transparent communication.",
  },
  {
    keywords: ['mobile', 'responsive', 'phone', 'tablet', 'iphone', 'android', 'screen size', 'adaptive'],
    answer: "Every site we build is mobile-first and fully responsive across all devices. Phones, tablets, laptops, and desktops. We test across breakpoints to make sure your site looks and performs perfectly everywhere. Mobile optimization also directly improves your Google rankings.",
  },
  {
    keywords: ['redesign', 'rebuild', 'redo', 'revamp', 'refresh', 'existing site', 'current site', 'old site', 'outdated'],
    answer: "We specialize in redesigns. Taking outdated, slow, or broken sites and rebuilding them from scratch with modern code, better UX, and built-in SEO. Recent example: Dominicans of Raleigh went from a broken legacy site to a mobile-first, reservation-ready platform. Book a call and show us what you're working with!",
  },
  {
    keywords: ['app', 'web app', 'saas', 'dashboard', 'platform', 'mvp', 'startup', 'software', 'application'],
    answer: "We build full web applications, from MVPs to production-grade SaaS dashboards. React, Next.js, Node.js, PostgreSQL, and cloud infrastructure (AWS/Vercel). Whether you need a customer portal, admin dashboard, or a whole platform, we architect systems that scale.",
  },
  {
    keywords: ['react native', 'mobile app', 'ios', 'app store', 'native app', 'cross platform'],
    answer: "Yes, we build mobile apps using React Native. One codebase for both iOS and Android. From MVP to production, we can take your app idea from concept to the App Store. Let's talk about your project on a call!",
  },
  {
    keywords: ['nonprofit', 'non-profit', 'charity', 'small business', 'local business', 'startup budget', 'limited budget'],
    answer: "We love working with nonprofits and small businesses. Our Starter package at $500 gets you a premium hand-coded landing page with SEO built in. We've built for organizations like We Care Jamaica (international nonprofit) and multiple local Raleigh businesses. Premium quality at an accessible price point.",
  },
  {
    keywords: ['review', 'reviews', 'rating', 'testimonial', 'reputation', 'feedback', 'google review', 'stars'],
    answer: "We have 25+ five-star Google Reviews — clients consistently highlight our speed, attention to detail, communication, and design quality. Check out the testimonials section above too. We let the work and the results speak for themselves.",
  },
  {
    keywords: ['content', 'copy', 'copywriting', 'text', 'writing', 'words', 'messaging'],
    answer: "We can work with copy you provide, or we'll craft conversion-focused copy as part of the build. Every project includes SEO-optimized headings, meta descriptions, and structured content. For deeper content strategy, we can discuss that on a call.",
  },
  {
    keywords: ['guarantee', 'refund', 'risk', 'satisfaction', 'promise', 'assured'],
    answer: "We stand behind every project. You get 2 revision rounds to make sure it's exactly right, 14 days of post-launch support, and a full walkthrough video. We don't launch until you're 100% satisfied. Our track record of 50+ happy clients speaks for itself.",
  },
  {
    keywords: ['available', 'availability', 'open', 'accepting', 'when', 'capacity', 'waitlist', 'booked'],
    answer: "We're currently accepting new clients! Availability changes fast, so if you have a project in mind, text us at (919) 526-0824 to lock in your spot.",
  },
  {
    keywords: ['instagram', 'social', 'social media', 'dm', 'message', 'insta', 'follow'],
    answer: "Follow us on Instagram @oneflyassnerd for behind-the-scenes builds, project showcases, and updates. You can also DM us there to start a conversation about your project!",
  },
  {
    keywords: ['pages', 'how many pages', 'multi page', 'single page', 'one page', 'three page', '3 page', 'multiple pages'],
    answer: "Our Starter package at $500 covers a hand-coded landing page. Perfect for businesses that need a strong online presence fast. Need more pages? Full custom websites with 5 to 10+ pages start at $2,500. Headless Shopify builds from $5,000. Every page is hand-coded, mobile-responsive, and SEO-optimized.",
  },
];
