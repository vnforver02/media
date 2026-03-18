'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavigationItem {
  id: number;
  label_en: string;
  label_vi: string;
  label_zh_cn: string;
  label_zh_tw: string;
  path: string;
  sort_order: number;
  is_visible: boolean;
}

interface SiteSettings {
  site_name: string;
  logo: string;
}

interface HeaderModuleProps {
  language?: 'en' | 'vi' | 'zh_cn' | 'zh_tw';
}

export function HeaderModule({ language = 'en' }: HeaderModuleProps) {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navRes, settingsRes] = await Promise.all([
          fetch('/api/navigation'),
          fetch('/api/site-settings'),
        ]);

        if (navRes.ok) {
          const navData = await navRes.json();
          setNavItems(navData.filter((item: NavigationItem) => item.is_visible));
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setSiteSettings(settingsData[0] || {});
        }
      } catch (error) {
        console.error('Failed to fetch header data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <header className="h-20 bg-brand-surface border-b border-brand-border"></header>;
  }

  const getLabel = (item: NavigationItem) => {
    const key = `label_${language}` as keyof NavigationItem;
    return item[key] as string || item.label_en;
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          {siteSettings?.site_name || 'Media Today'}
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              {getLabel(item)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
