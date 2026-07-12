import type { LucideIcon } from 'lucide-react';
import {
  Workflow,
  BrainCircuit,
  Database,
  Shield,
  Code2,
  Globe,
  Share2,
  Cloud,
  Server,
  Mail,
  Wrench,
  Headphones,
  GraduationCap,
} from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  cta: { label: string; href: string };
}

export const services: Service[] = [
  {
    slug: 'automation-collaboration',
    title: 'Automation & Collaboration',
    shortDesc: 'Streamline workflows and team collaboration',
    icon: Workflow,
    features: [
      'Workflow Automation Solutions',
      'Collaboration Tools Implementation',
      'Business Process Optimization',
      'RPA (Robotic Process Automation)',
      'Custom Integration Development',
    ],
    benefits: [
      'Reduce manual work by 60%+',
      'Improve team productivity',
      'Standardize processes across departments',
    ],
    cta: { label: 'Discuss Your Needs', href: '/#contactUs' },
  },
  {
    slug: 'ai-integrations',
    title: 'AI Integrations',
    shortDesc: 'Smart solutions powered by artificial intelligence',
    icon: BrainCircuit,
    features: [
      'AI Chatbots for Customer Support',
      'Predictive Analytics Solutions',
      'Machine Learning Algorithms for Data Analysis',
      'Natural Language Processing (NLP)',
      'AI-Powered Business Intelligence',
    ],
    benefits: [
      'Automate repetitive tasks',
      'Gain data-driven insights',
      'Enhance customer experience',
    ],
    cta: { label: 'Explore AI Solutions', href: '/#contactUs' },
  },
  {
    slug: 'database-data-management',
    title: 'Database & Data Management',
    shortDesc: 'Reliable data infrastructure and management',
    icon: Database,
    features: [
      'Database Design and Implementation',
      'Database Administration and Maintenance',
      'Data Warehousing Solutions',
      'ETL Pipeline Development',
      'Database Performance Tuning',
    ],
    benefits: [
      'Ensure data integrity and availability',
      'Optimize query performance',
      'Scale with your business growth',
    ],
    cta: { label: 'Optimize Your Data', href: '/#contactUs' },
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    shortDesc: 'Protect your business from digital threats',
    icon: Shield,
    features: [
      'Network Security Assessments',
      'Firewall Configuration and Management',
      'Intrusion Detection and Prevention Systems',
      'Vulnerability Penetration Testing',
      'Security Awareness Training',
    ],
    benefits: [
      'Prevent costly data breaches',
      'Meet compliance requirements',
      'Protect customer trust',
    ],
    cta: { label: 'Secure Your Business', href: '/#contactUs' },
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    shortDesc: 'Custom software built for your needs',
    icon: Code2,
    features: [
      'Custom Software Development',
      'Mobile App Development',
      'Enterprise Application Development',
      'API Development & Integration',
      'Legacy System Modernization',
    ],
    benefits: [
      'Purpose-built for your workflows',
      'Full ownership of code',
      'Scalable architecture',
    ],
    cta: { label: 'Build Your Software', href: '/#contactUs' },
  },
  {
    slug: 'web-applications',
    title: 'Web Applications',
    shortDesc: 'Modern web apps and e-commerce solutions',
    icon: Globe,
    features: [
      'Web Development Services',
      'Content Management System Development',
      'E-commerce Solutions Development',
      'Progressive Web Apps (PWA)',
      'Single Page Applications (SPA)',
    ],
    benefits: [
      'Reach customers on any device',
      'Fast, responsive user experience',
      'SEO-friendly architecture',
    ],
    cta: { label: 'Build Your Web App', href: '/#contactUs' },
  },
  {
    slug: 'content-creation-social-media',
    title: 'Content & Social Media',
    shortDesc: 'Content strategy and social media management',
    icon: Share2,
    features: [
      'Content Strategy and Planning',
      'Social Media Management Tools Implementation',
      'Social Media Marketing Campaigns',
      'Content Production & Scheduling',
      'Analytics & Performance Reporting',
    ],
    benefits: [
      'Grow your online presence',
      'Engage your target audience',
      'Drive measurable results',
    ],
    cta: { label: 'Boost Your Brand', href: '/#contactUs' },
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    shortDesc: 'Scalable cloud infrastructure and migration',
    icon: Cloud,
    features: [
      'Cloud Strategy Consulting',
      'Cloud Migration Services',
      'Infrastructure as a Service (IaaS) Provisioning',
      'Platform as a Service (PaaS) Setup',
      'Cloud Cost Optimization',
    ],
    benefits: [
      'Reduce infrastructure costs',
      'Scale on demand',
      'Improve disaster recovery',
    ],
    cta: { label: 'Move to Cloud', href: '/#contactUs' },
  },
  {
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    shortDesc: 'Network, server, and storage deployment',
    icon: Server,
    features: [
      'Network Design and Implementation',
      'Server Installation and Configuration',
      'Storage Solutions Deployment',
      'Structured Cabling',
      'Hardware Procurement & Setup',
    ],
    benefits: [
      'Reliable, high-performance network',
      'Minimize downtime',
      'Future-proof infrastructure',
    ],
    cta: { label: 'Plan Your Infrastructure', href: '/#contactUs' },
  },
  {
    slug: 'email-collaboration',
    title: 'Email & Collaboration',
    shortDesc: 'Enterprise email and collaboration platforms',
    icon: Mail,
    features: [
      'Email Hosting Services',
      'Collaboration Platform Implementation',
      'Document Sharing and Version Control Systems',
      'Microsoft 365 / Google Workspace Setup',
      'Email Security & Archiving',
    ],
    benefits: [
      'Streamline team communication',
      'Centralized document management',
      'Enterprise-grade security',
    ],
    cta: { label: 'Set Up Collaboration', href: '/#contactUs' },
  },
  {
    slug: 'internal-tools',
    title: 'Internal Tools',
    shortDesc: 'Custom tools for your team',
    icon: Wrench,
    features: [
      'Intranet Development and Deployment',
      'Employee Onboarding and Training Platforms',
      'Knowledge Management Systems',
      'HR & Payroll System Integration',
      'Custom Dashboard Development',
    ],
    benefits: [
      'Boost internal efficiency',
      'Centralize company knowledge',
      'Reduce SaaS subscription costs',
    ],
    cta: { label: 'Build Internal Tools', href: '/#contactUs' },
  },
  {
    slug: 'remote-it-support',
    title: 'Remote IT Support 24/7',
    shortDesc: 'Round-the-clock IT support with SLA guarantees',
    icon: Headphones,
    features: [
      'Remote Troubleshooting and Issue Resolution',
      '24/7 Availability and Response Time SLAs',
      'Proactive Monitoring and Maintenance',
      'Patch Management',
      'IT Asset Management',
    ],
    benefits: [
      'Minimize business disruption',
      'Predictable support costs',
      'Expert help anytime',
    ],
    cta: { label: 'Get Support', href: '/#contactUs' },
  },
  {
    slug: 'it-training',
    title: 'IT Training & R&D',
    shortDesc: 'Upskill your team with hands-on training',
    icon: GraduationCap,
    features: [
      'IT Training and Certifications Consultation',
      'IT Lab-Based Pragmatic Training',
      'Project-Based and Team-Effort Training',
      'Technology Workshops',
      'Custom Training Programs',
    ],
    benefits: [
      'Close skills gaps fast',
      'Hands-on, practical learning',
      'Certified training programs',
    ],
    cta: { label: 'Train Your Team', href: '/#contactUs' },
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
