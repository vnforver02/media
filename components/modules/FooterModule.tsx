'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SiteSettings {
  site_name: string;
  company_phone: string;
  company_email: string;
  company_phone_whatsapp: string;
  address_en: string;
  social_facebook: string;
  social_linkedin: string;
  social_instagram: string;
}

interface NavigationItem {
  id: number;
  label_en: string;
  label_vi: string;
  label_zh_cn: string;
  label_zh_tw: string;
  path: string;
  is_visible: boolean;
}

interface FooterModuleProps {
  language?: 'en' | 'vi' | 'zh_cn' | 'zh_tw';
}

export function FooterModule({ language = 'en' }: FooterModuleProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, navRes] = await Promise.all([
          fetch('/api/site-settings'),
          fetch('/api/navigation'),
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          setSettings(data[0] || {});
        }

        if (navRes.ok) {
          const navData = await navRes.json();
          setNavItems(navData.filter((item: NavigationItem) => item.is_visible));
        }
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <footer className="bg-brand-surface border-t border-brand-border h-20"></footer>;
  }

  if (!settings) {
    return null;
  }

  const getLabel = (item: NavigationItem) => {
    const key = `label_${language}` as keyof NavigationItem;
    return item[key] as string || item.label_en;
  };

  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold mb-4">{settings.site_name}</h3>
            {settings.company_phone && (
              <p className="text-gray-400 text-sm mb-2">📞 {settings.company_phone}</p>
            )}
            {settings.company_email && (
              <p className="text-gray-400 text-sm mb-2">📧 {settings.company_email}</p>
            )}
            {settings.company_phone_whatsapp && (
              <p className="text-gray-400 text-sm">💬 {settings.company_phone_whatsapp}</p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {getLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  f
                </a>
              )}
              {settings.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  in
                </a>
              )}
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  📷
                </a>
              )}
            </div>
          </div>

          {/* Address */}
          {settings.address_en && (
            <div>
              <h4 className="text-white font-bold mb-4">Address</h4>
              <p className="text-gray-400 text-sm">{settings.address_en}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
