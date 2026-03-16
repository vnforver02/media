'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n';

interface NavItem {
  label_en: string;
  label_vi: string;
  label_zh_cn: string;
  label_zh_tw: string;
  path: string;
  sort_order: number;
  is_visible: boolean;
}

interface NavigationProps {
  locale: Locale;
}

export default function Navigation({ locale }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const res = await fetch('/api/navigation');
        const data = await res.json();
        setNavItems(data);
      } catch (error) {
        console.error('Error fetching navigation:', error);
        // Fallback to default items
        setNavItems([
          { label_en: 'Home', label_vi: 'Trang chủ', label_zh_cn: '主页', label_zh_tw: '首頁', path: '/', sort_order: 1, is_visible: true },
          { label_en: 'About', label_vi: 'Về Chúng Tôi', label_zh_cn: '关于', label_zh_tw: '關於', path: '/about-us', sort_order: 2, is_visible: true },
          { label_en: 'Services', label_vi: 'Dịch Vụ', label_zh_cn: '服务', label_zh_tw: '服務', path: '/services', sort_order: 3, is_visible: true },
          { label_en: 'Case Studies', label_vi: 'Case Studies', label_zh_cn: '案例研究', label_zh_tw: '案例研究', path: '/case-studies', sort_order: 4, is_visible: true },
          { label_en: 'Careers', label_vi: 'Tuyển Dụng', label_zh_cn: '招聘', label_zh_tw: '招聘', path: '/careers', sort_order: 5, is_visible: true },
          { label_en: 'Contact', label_vi: 'Liên Hệ', label_zh_cn: '联系', label_zh_tw: '聯繫', path: '/contact', sort_order: 6, is_visible: true },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNav();
  }, []);

  const getLabel = (item: NavItem): string => {
    switch (locale) {
      case 'vi':
        return item.label_vi || item.label_en;
      case 'zh-cn':
        return item.label_zh_cn || item.label_en;
      case 'zh-tw':
        return item.label_zh_tw || item.label_en;
      default:
        return item.label_en;
    }
  };

  const getLocalizedPath = (path: string): string => {
    if (path === '/') return `/${locale}`;
    return `/${locale}${path}`;
  };

  const isActive = (path: string): boolean => {
    const localizedPath = getLocalizedPath(path);
    return pathname === localizedPath || pathname.endsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(getLocalizedPath(item.path))}
          className={`transition-colors ${
            isActive(item.path)
              ? 'text-white relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {getLabel(item)}
        </button>
      ))}
    </nav>
  );
}
