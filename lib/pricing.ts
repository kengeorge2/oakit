export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  cta: { label: string; href: string; variant?: string };
  popular: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams getting started',
    monthlyPrice: 700,
    annualPrice: 7000,
    features: [
      'IT Support (Business Hours)',
      'Remote Monitoring',
      'Basic Security Patch Management',
      'Email & Phone Support',
      'Monthly Health Reports',
    ],
    cta: { label: 'Get Started', href: '/#contactUs', variant: 'default' },
    popular: false,
  },
  {
    id: 'regular',
    name: 'Regular',
    description: 'For growing businesses',
    monthlyPrice: 1500,
    annualPrice: 15000,
    features: [
      'Everything in Basic',
      '24/7 Monitoring & Alerting',
      'Proactive Maintenance',
      'Backup Management',
      'Quarterly Business Reviews',
      'Priority Response (4hr SLA)',
    ],
    cta: { label: 'Get Started', href: '/#contactUs', variant: 'default' },
    popular: true,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'For enterprises needing custom solutions',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Everything in Regular',
      'Dedicated Account Manager',
      'Custom SLA & Response Times',
      'Strategic IT Planning',
      'Compliance Support (ISO, GDPR)',
      'On-site Support Available',
      'Custom Integrations',
    ],
    cta: { label: 'Request Quote', href: '/#contactUs', variant: 'outline' },
    popular: false,
  },
];

export const pricingFaq = [
  {
    question: 'What\'s included in the Basic plan?',
    answer: 'The Basic plan covers business-hours IT support, remote monitoring, basic security patch management, email & phone support, and monthly health reports. It\'s designed for teams of 10-50 users.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. When upgrading, the price difference is prorated. When downgrading, the change takes effect at your next billing cycle.',
  },
  {
    question: 'What does "Request Quote" mean for Advanced?',
    answer: 'Advanced pricing depends on your specific requirements including number of users, services selected, and support level. Contact us for a customized quote tailored to your business.',
  },
  {
    question: 'Are there discounts for annual billing?',
    answer: 'Yes! Annual billing saves you approximately 17% compared to monthly billing. Contact us for enterprise multi-year discounts.',
  },
  {
    question: 'What support response times are guaranteed?',
    answer: 'Basic: Next business day. Regular: 4-hour response SLA. Advanced: Custom SLA based on your requirements, with options for 1-hour or immediate response.',
  },
];
