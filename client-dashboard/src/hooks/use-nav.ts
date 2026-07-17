'use client';

import { useMemo } from 'react';
import { NavGroup } from '@/types';

export function useFilteredNavGroups(navGroups: NavGroup[]): NavGroup[] {
  return useMemo(() => {
    return navGroups;
  }, [navGroups]);
}
