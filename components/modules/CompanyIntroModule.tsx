'use client';

import { useEffect, useState } from 'react';

interface CompanyInfo {
  site_name: string;
  founded_year: number;
  company_intro_en: string;
  company_intro_vi: string;
  company_intro_zh_cn: string;
  company_intro_zh_tw: string;
}

interface CompanyIntroModuleProps {
  language?: 'en' | 'vi' | 'zh_cn' | 'zh_tw';
  layout?: 'default' | 'compact' | 'card';
}

export function CompanyIntroModule({
  language = 'en',
  layout = 'default',
}: CompanyIntroModuleProps) {
  const [data, setData] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const result = await response.json();
          setData(result[0] || {});
        }
      } catch (error) {
        console.error('Failed to fetch company info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!data) {
    return null;
  }

  const getIntroText = () => {
    const key = `company_intro_${language}` as keyof CompanyInfo;
    return data[key] as string || '';
  };

  const introText = getIntroText();

  if (layout === 'compact') {
    return (
      <p className="text-sm text-gray-400">{introText}</p>
    );
  }

  if (layout === 'card') {
    return (
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">{data.site_name}</h3>
        <p className="text-sm text-gray-500 mb-4">Founded {data.founded_year}</p>
        <p className="text-gray-400 leading-relaxed">{introText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">{data.site_name}</h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl">{introText}</p>
      </div>
      <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
        Founded in {data.founded_year}
      </div>
    </div>
  );
}
