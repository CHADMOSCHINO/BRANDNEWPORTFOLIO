export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  stats: string;
  impact: string;
  description: string;
  color: string;
  externalUrl: string;
  isShopify: boolean;
  metrics?: ProjectMetric[];
  scope?: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: 'layout' | 'code' | 'chart' | 'rocket';
  description: string;
  isComingSoon?: boolean;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  initials: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  suggestions?: string[];
}

export interface QAEntry {
  keywords: string[];
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}
