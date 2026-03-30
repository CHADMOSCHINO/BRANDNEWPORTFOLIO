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
  bio: 'My focus at Grellax Labs is simple — every client gets world-class results, no matter what. We work alongside you until the vision is fully realized. No shortcuts, no half-measures.',
  location: { city: 'Raleigh', state: 'NC', region: 'East Coast' },
  siteUrl: 'https://grellaxlabs.com',
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
    description: 'A seamless, React-powered frontend delivering gallery-quality visuals at lightning speeds. A fluid, high-conversion shopping experience that feels as premium as the garments themselves, optimizing every pixel for brand authority and sales velocity.',
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
  '$300 – $800',
  '$800 – $2K',
  '$2K – $4K',
  '$4K+',
];

export const TECH_STACK = [
  'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Tailwind', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL',
];

export const QA_DATABASE: QAEntry[] = [
  // ── Weekend Special / $200 Offer ──
  {
    keywords: ['200', 'deal', 'special', 'offer', 'promo', 'promotion', 'discount', 'weekend', 'cheap', 'affordable', 'landing page deal', 'sale'],
    answer: "We're running a Weekend Special — $200 for a premium landing page or up to a 3-page site. That includes SEO baked directly into the codebase, a Google Business Profile setup guide, and we'll even buy your first year of domain registration (up to $15). This is hand-coded by an actual software developer — not vibe-coded template nonsense. Integrations available at extra cost. Want in? Book a call or DM us!",
  },
  {
    keywords: ['domain', 'domain name', 'buy domain', 'register domain', 'hosting'],
    answer: "With our Weekend Special, we'll purchase your first year of domain registration for you — up to $15 included in the $200 package. For hosting, we typically deploy on Netlify or Vercel which offer generous free tiers. Need custom hosting? We can set that up too.",
  },
  {
    keywords: ['google business', 'business profile', 'google profile', 'gbp', 'google listing', 'google maps'],
    answer: "Every Weekend Special package includes a guide on how to set up your Google Business Profile — that's how you show up on Google Maps and local search results. It's one of the highest-ROI things a local business can do, and we walk you through the entire setup.",
  },
  {
    keywords: ['integration', 'integrations', 'extra cost', 'add-on', 'addon', 'additional'],
    answer: "Integrations like payment processing, booking systems, CRMs, email marketing tools, and third-party APIs are available at an extra cost on top of the base package. We'll scope it out during our call and give you a clear quote — no surprises.",
  },
  {
    keywords: ['vibe coded', 'vibe code', 'template', 'wordpress', 'wix', 'squarespace', 'page builder', 'no code', 'low code', 'ai generated'],
    answer: "We don't do vibe-coded throwaway sites. Every project is hand-coded from scratch by a real software developer with 5+ years of experience. That means faster load times, better SEO, full customization, and code that actually scales. No WordPress themes, no Wix, no page builders.",
  },

  // ── Core Pricing ──
  {
    keywords: ['pricing', 'cost', 'price', 'how much', 'budget', 'afford', 'expensive', 'money', 'rate', 'rates', 'quote', 'estimate'],
    answer: "Our pricing: $200 Weekend Special for landing pages/3-page sites (limited time). Standard projects start at $300 for landing pages, $800–$2K for full websites, and $2K–$4K+ for complex apps and Shopify builds. Every project is custom-quoted. Book a free call to get an exact number — calendly.com/chadmoschino-grellaxlabs/30min",
  },
  {
    keywords: ['payment', 'pay', 'invoice', 'deposit', 'installment', 'stripe', 'paypal', 'venmo', 'zelle'],
    answer: "We typically collect a 50% deposit upfront to kick off the project, with the remaining 50% due on completion before final handoff. We accept most payment methods. Everything is transparent — no hidden fees, no surprises.",
  },

  // ── Timeline & Delivery ──
  {
    keywords: ['timeline', 'how long', 'time', 'fast', 'quick', 'delivery', 'turnaround', 'days', 'weeks', 'speed', 'rush', 'urgent', 'asap'],
    answer: "Most projects deliver in 5–7 business days. Landing pages can ship even faster — sometimes 2–3 days. No agency overhead means faster turnarounds. Need a rush job? Let us know and we'll see what we can do.",
  },

  // ── Services Overview ──
  {
    keywords: ['services', 'what do you do', 'offer', 'help', 'build', 'provide', 'capabilities'],
    answer: "Here's what we build: Landing Pages, Full Custom Websites (up to 10+ pages), Headless Shopify Stores, E-Commerce with Stripe, Complete Redesigns, Web Apps & SaaS Dashboards, AI Chatbots & Automations, and Mobile Apps (React Native). Every project includes custom design, hand-coded development, SEO optimization, mobile responsiveness, and 14 days post-launch support.",
  },

  // ── Contact & Getting Started ──
  {
    keywords: ['contact', 'reach', 'email', 'call', 'talk', 'book', 'schedule', 'meeting', 'get started', 'start', 'order', 'buy', 'purchase', 'hire', 'calendly'],
    answer: "Ready to start? Book a free 15-minute call at calendly.com/chadmoschino-grellaxlabs/30min or email chadmoschino@grellaxlabs.com. You can also DM us on Instagram @oneflyassnerd. We respond within 24 hours!",
  },

  // ── Experience & Portfolio ──
  {
    keywords: ['experience', 'portfolio', 'work', 'projects', 'examples', 'clients', 'brands', 'past work', 'case study'],
    answer: "50+ brands scaled across 5+ years. Recent work includes We Care Jamaica (international nonprofit), Repair Wizardz (local service booking), Dreux Hamm (luxury fashion headless Shopify), Dominicans of Raleigh (restaurant), and Saber Tooth Treats (e-commerce concept build). Scroll up to see them all with live links!",
  },

  // ── Tech Stack ──
  {
    keywords: ['tech', 'stack', 'technology', 'react', 'code', 'framework', 'build with', 'how built', 'next.js', 'nextjs', 'typescript', 'tailwind', 'node'],
    answer: "Our stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, AWS, Docker, GraphQL, Shopify Hydrogen, and Stripe. We also use Claude AI and Cursor for intelligent development workflows. No page builders, no templates — everything is hand-coded for speed and full control.",
  },

  // ── Location ──
  {
    keywords: ['location', 'where', 'based', 'timezone', 'local', 'raleigh', 'north carolina', 'nc', 'remote'],
    answer: "Based in Raleigh, NC (Eastern timezone) but we work with clients nationwide and internationally. Direct communication via Slack, email, or scheduled calls — timezone is never an issue. We've worked with clients from Jamaica to California.",
  },

  // ── Shopify & E-Commerce ──
  {
    keywords: ['shopify', 'ecommerce', 'e-commerce', 'store', 'sell', 'products', 'shop', 'online store', 'headless'],
    answer: "We build both standard Shopify themes and fully custom headless Shopify builds using React/Hydrogen — zero theme limitations, total creative control. We also handle Stripe integrations for non-Shopify e-commerce. Recent Shopify work: Dreux Hamm (luxury fashion) and Project Prevail (streetwear).",
  },

  // ── SEO ──
  {
    keywords: ['seo', 'google', 'search', 'rank', 'traffic', 'organic', 'keywords', 'meta', 'lighthouse'],
    answer: "SEO is baked into every project at the code level — not bolted on after. That means: sub-2-second load times, semantic HTML, structured data (JSON-LD), proper meta tags, Open Graph, image optimization, mobile-first design, and 90+ Lighthouse scores. We build sites that Google loves to index.",
  },

  // ── Revisions & Support ──
  {
    keywords: ['revision', 'changes', 'edit', 'update', 'modify', 'feedback', 'support', 'maintenance', 'after launch', 'post launch'],
    answer: "Every project includes 2 focused revision rounds during the build, 14 days post-launch support for minor tweaks, and a walkthrough video of the completed site. Need ongoing support? We offer retainer packages for continued design, dev, and optimization.",
  },

  // ── Process ──
  {
    keywords: ['process', 'how works', 'steps', 'workflow', 'what happens', 'next steps'],
    answer: "Our process: 1) Book a free 15-min call 2) Share your vision and goals 3) Get a fixed quote with clear scope 4) We design and build in 5–7 days 5) 2 revision rounds to dial it in 6) Launch + 14 days of support + walkthrough video. Simple, fast, no BS.",
  },

  // ── Retainer Services ──
  {
    keywords: ['retainer', 'ongoing', 'monthly', 'subscription', 'long term', 'continuous', 'maintenance plan'],
    answer: "Our retainer packages cover everything: smarter theme design, fast bug resolution, feature implementation, third-party integrations, conversion-focused audits, and AI/automation builds. It's like having a full design and dev team on call — without the agency overhead. Ask us about retainer pricing on a call!",
  },

  // ── Greetings ──
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'what up', 'good morning', 'good afternoon', 'good evening'],
    answer: "Hey! Welcome to Grellax Labs. I'm here to help you learn about our services, pricing, and process. We're also running a $200 Weekend Special for landing pages — ask me about it! What can I help you with?",
  },

  // ── AI & Automation ──
  {
    keywords: ['ai', 'chatbot', 'automation', 'claude', 'anthropic', 'cursor', 'artificial intelligence', 'bot', 'n8n', 'automate', 'workflow'],
    answer: "We build custom AI chatbots trained on your business data, workflow automations using n8n and custom code, and AI-powered features that boost conversions. From intelligent customer assistants to automated lead pipelines, we integrate AI directly into your product. We use Claude (Anthropic) and Cursor in our own workflow.",
  },

  // ── Gratitude & Farewell ──
  {
    keywords: ['thanks', 'thank you', 'bye', 'goodbye', 'appreciate', 'later', 'see you'],
    answer: "Anytime! If you're ready to move forward, book a free call at calendly.com/chadmoschino-grellaxlabs/30min or email chadmoschino@grellaxlabs.com. We'd love to build something great for you.",
  },

  // ── Why Us / Differentiator ──
  {
    keywords: ['why', 'different', 'better', 'vs', 'agency', 'freelancer', 'stand out', 'unique', 'advantage'],
    answer: "What makes us different: Solo developer = no overhead, competitive prices. 5–7 day delivery (agencies take weeks). 100% hand-coded — no templates, no page builders. Direct communication with the person actually building your site. 50+ brands scaled. AI and automation built into our workflow. You get agency-quality output at freelancer speed.",
  },

  // ── About Chad / Founder ──
  {
    keywords: ['chad', 'who', 'founder', 'owner', 'about', 'team', 'developer', 'designer', 'background'],
    answer: "Grellax Labs is run by Chad Green — a 26-year-old designer and full-stack developer based in Raleigh, NC with 5+ years of experience. Chad has scaled 50+ brands ranging from nonprofits to luxury fashion to SaaS platforms. Every client gets world-class results with direct, transparent communication.",
  },

  // ── Mobile & Responsive ──
  {
    keywords: ['mobile', 'responsive', 'phone', 'tablet', 'iphone', 'android', 'screen size', 'adaptive'],
    answer: "Every site we build is mobile-first and fully responsive across all devices — phones, tablets, laptops, and desktops. We test across breakpoints to make sure your site looks and performs perfectly everywhere. Mobile optimization also directly improves your Google rankings.",
  },

  // ── Redesign ──
  {
    keywords: ['redesign', 'rebuild', 'redo', 'revamp', 'refresh', 'existing site', 'current site', 'old site', 'outdated'],
    answer: "We specialize in redesigns — taking outdated, slow, or broken sites and rebuilding them from scratch with modern code, better UX, and built-in SEO. Recent example: Dominicans of Raleigh went from a broken legacy site to a mobile-first, reservation-ready platform. Book a call and show us what you're working with!",
  },

  // ── Web Apps & SaaS ──
  {
    keywords: ['app', 'web app', 'saas', 'dashboard', 'platform', 'mvp', 'startup', 'software', 'application'],
    answer: "We build full web applications — from MVPs to production-grade SaaS dashboards. React, Next.js, Node.js, PostgreSQL, and cloud infrastructure (AWS/Vercel). Whether you need a customer portal, admin dashboard, or a whole platform, we architect systems that scale.",
  },

  // ── React Native / Mobile Apps ──
  {
    keywords: ['react native', 'mobile app', 'ios', 'app store', 'native app', 'cross platform'],
    answer: "Yes, we build mobile apps using React Native — one codebase for both iOS and Android. From MVP to production, we can take your app idea from concept to the App Store. Let's talk about your project on a call!",
  },

  // ── Nonprofit & Small Business ──
  {
    keywords: ['nonprofit', 'non-profit', 'charity', 'small business', 'local business', 'startup budget', 'limited budget'],
    answer: "We love working with nonprofits and small businesses. Our $200 Weekend Special is perfect for getting started — premium landing page or up to 3 pages with SEO built in. We've built for organizations like We Care Jamaica (international nonprofit) and multiple local Raleigh businesses. Quality doesn't have to break the bank.",
  },

  // ── Reviews & Reputation ──
  {
    keywords: ['review', 'reviews', 'rating', 'testimonial', 'reputation', 'feedback', 'google review', 'stars'],
    answer: "Check out what our clients say — scroll to the testimonials section above! We also have Google Reviews you can check out. Clients consistently highlight our speed, attention to detail, communication, and design quality. We let the work speak for itself.",
  },

  // ── Content & Copywriting ──
  {
    keywords: ['content', 'copy', 'copywriting', 'text', 'writing', 'words', 'messaging'],
    answer: "We can work with copy you provide, or we'll craft conversion-focused copy as part of the build. Every project includes SEO-optimized headings, meta descriptions, and structured content. For deeper content strategy, we can discuss that on a call.",
  },

  // ── Turnaround Guarantee ──
  {
    keywords: ['guarantee', 'refund', 'risk', 'satisfaction', 'promise', 'assured'],
    answer: "We stand behind every project. You get 2 revision rounds to make sure it's exactly right, 14 days of post-launch support, and a full walkthrough video. We don't launch until you're 100% satisfied. Our track record of 50+ happy clients speaks for itself.",
  },

  // ── Availability ──
  {
    keywords: ['available', 'availability', 'open', 'accepting', 'when', 'capacity', 'waitlist', 'booked'],
    answer: "We're currently accepting new clients! Availability changes fast, so if you have a project in mind, book a call now to lock in your spot: calendly.com/chadmoschino-grellaxlabs/30min",
  },

  // ── Instagram / Social ──
  {
    keywords: ['instagram', 'social', 'social media', 'dm', 'message', 'insta', 'follow'],
    answer: "Follow us on Instagram @oneflyassnerd for behind-the-scenes builds, project showcases, and updates. You can also DM us there to start a conversation about your project!",
  },

  // ── Pages / 3-page site ──
  {
    keywords: ['pages', 'how many pages', 'multi page', 'single page', 'one page', 'three page', '3 page', 'multiple pages'],
    answer: "Our $200 Weekend Special covers a landing page or up to a 3-page site — perfect for a homepage, about page, and contact page. Need more pages? Full custom websites with 5–10+ pages start at $800. Every page is hand-coded, mobile-responsive, and SEO-optimized.",
  },
];
