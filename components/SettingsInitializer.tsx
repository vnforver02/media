'use client';

import { useEffect } from 'react';
import { useSiteSettings } from '@/lib/siteSettingsStore';

export function SettingsInitializer() {
  const fetchSettings = useSiteSettings((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return null;
}
