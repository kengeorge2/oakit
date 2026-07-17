import { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Subscription',
    items: [
      {
        title: 'My Plan',
        url: '/dashboard/subscriptions',
        icon: 'billing',
        isActive: false,
        items: []
      },
      {
        title: 'Services',
        url: '/dashboard/services',
        icon: 'product',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Support',
    items: [
      {
        title: 'Tickets',
        url: '/dashboard/tickets',
        icon: 'chat',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Billing',
        url: '/dashboard/billing',
        icon: 'billing',
        isActive: false,
        items: []
      },
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        isActive: false,
        items: []
      }
    ]
  }
];
