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

interface NavigationModuleProps {
  language?: 'en' | 'vi' | 'zh_cn' | 'zh_tw';
  layout?: 'horizontal' | 'vertical';
  maxItems?: number;
}

export function NavigationModule({
  language = 'en',
  layout = 'horizontal',
  maxItems,
}: NavigationModuleProps) {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/navigation');
        if (response.ok) {
          const data = await response.json();
          const visibleItems = data
            .filter((item: NavigationItem) => item.is_visible)
            .sort((a: NavigationItem, b: NavigationItem) => a.sort_order - b.sort_order);
          setItems(maxItems ? visibleItems.slice(0, maxItems) : visibleItems);
        }
      } catch (error) {
        console.error('Failed to fetch navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maxItems]);

  if (loading) {
    return <nav className="text-gray-400">Loading...</nav>;
  }

  if (items.length === 0) {
    return null;
  }

  const getLabel = (item: NavigationItem) => {
    const key = `label_${language}` as keyof NavigationItem;
    return item[key] as string || item.label_en;
  };

  if (layout === 'vertical') {
    return (
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="block text-gray-400 hover:text-white transition-colors py-2"
          >
            {getLabel(item)}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex gap-6 items-center">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          {getLabel(item)}
        </Link>
      ))}
    </nav>
  );
}
