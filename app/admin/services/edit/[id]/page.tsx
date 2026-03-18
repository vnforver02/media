'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Service {
  id: number;
  slug: string;
  icon: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  description_en: string;
  description_vi: string;
  description_zh_cn: string;
  description_zh_tw: string;
  full_description_en: string;
  full_description_vi: string;
  full_description_zh_cn: string;
  full_description_zh_tw: string;
  ideal_for_en?: string;
  ideal_for_vi?: string;
  ideal_for_zh_cn?: string;
  ideal_for_zh_tw?: string;
  what_we_deliver_en?: string;
  what_we_deliver_vi?: string;
  what_we_deliver_zh_cn?: string;
  what_we_deliver_zh_tw?: string;
  sort_order: number;
  is_published: boolean;
  featured: boolean;
}

const ICON_OPTIONS = [
  'ph-stack',
  'ph-chart-line',
  'ph-code',
  'ph-rocket',
  'ph-target',
  'ph-briefcase',
  'ph-lightbulb',
  'ph-gear',
  'ph-palette',
  'ph-megaphone',
  'ph-globe',
  'ph-lock',
];

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'vi' | 'zh_cn' | 'zh_tw'>('en');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services?id=${id}`);
        if (!res.ok) throw new Error('Failed to fetch service');
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError('Failed to load service');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleInputChange = (field: keyof Service, value: any) => {
    if (service) {
      setService({ ...service, [field]: value });
    }
  };

  const handleLanguageChange = (field: string, value: string) => {
    if (service) {
      setService({ ...service, [field]: value } as any);
    }
  };

  const handleSave = async () => {
    if (!service) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: service.id,
          ...service,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save service');
      }
      
      setError('✓ Service saved successfully!');
      setTimeout(() => {
        router.push('/admin/services');
      }, 1500);
    } catch (err) {
      setError(`✗ ${err instanceof Error ? err.message : 'Failed to save service'}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Service not found</p>
        <Link href="/admin/services" className="text-brand-primary hover:underline">
          Back to services
        </Link>
      </div>
    );
  }

  const languageTabs = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'zh_cn', label: '简体中文' },
    { key: 'zh_tw', label: '繁體中文' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin/services" className="text-gray-400 hover:text-white">
              <i className="ph ph-caret-left text-xl"></i>
            </Link>
            <h1 className="text-4xl font-bold text-white">Edit Service</h1>
          </div>
          <p className="text-gray-400">Update service details</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium disabled:opacity-50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          <i className="ph ph-check-circle"></i>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className={`rounded-lg p-4 border flex items-center gap-3 ${
          error.includes('✓') 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <i className={`ph ${error.includes('✓') ? 'ph-check-circle' : 'ph-warning-circle'} text-lg`}></i>
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="flex gap-2 border-b border-brand-border">
            {languageTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${ 
                  activeTab === tab.key
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Language Content */}
          {activeTab === 'en' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (English)</label>
                <input
                  type="text"
                  value={service.title_en}
                  onChange={e => handleLanguageChange('title_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Service title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Short Description (English)</label>
                <textarea
                  value={service.description_en}
                  onChange={e => handleLanguageChange('description_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  placeholder="Brief description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Description (English)</label>
                <textarea
                  value={service.full_description_en}
                  onChange={e => handleLanguageChange('full_description_en', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  placeholder="Full detailed description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Ideal For (English) - One per line</label>
                <textarea
                  value={service.ideal_for_en || ''}
                  onChange={e => handleLanguageChange('ideal_for_en', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  placeholder="E-commerce Brands\
SaaS Companies\
Agencies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">What We Deliver (English) - One per line</label>
                <textarea
                  value={service.what_we_deliver_en || ''}
                  onChange={e => handleLanguageChange('what_we_deliver_en', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  placeholder="Advanced Campaign Architecture\
Dynamic Creative Testing"
                />
              </div>
            </div>
          )}

          {activeTab === 'vi' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (Tiếng Việt)</label>
                <input
                  type="text"
                  value={service.title_vi}
                  onChange={e => handleLanguageChange('title_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Short Description (Tiếng Việt)</label>
                <textarea
                  value={service.description_vi}
                  onChange={e => handleLanguageChange('description_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Description (Tiếng Việt)</label>
                <textarea
                  value={service.full_description_vi}
                  onChange={e => handleLanguageChange('full_description_vi', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Ideal For (Tiếng Việt) - One per line</label>
                <textarea
                  value={service.ideal_for_vi || ''}
                  onChange={e => handleLanguageChange('ideal_for_vi', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">What We Deliver (Tiếng Việt) - One per line</label>
                <textarea
                  value={service.what_we_deliver_vi || ''}
                  onChange={e => handleLanguageChange('what_we_deliver_vi', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_cn' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (简体中文)</label>
                <input
                  type="text"
                  value={service.title_zh_cn}
                  onChange={e => handleLanguageChange('title_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Short Description (简体中文)</label>
                <textarea
                  value={service.description_zh_cn}
                  onChange={e => handleLanguageChange('description_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Description (简体中文)</label>
                <textarea
                  value={service.full_description_zh_cn}
                  onChange={e => handleLanguageChange('full_description_zh_cn', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Ideal For (简体中文) - One per line</label>
                <textarea
                  value={service.ideal_for_zh_cn || ''}
                  onChange={e => handleLanguageChange('ideal_for_zh_cn', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">What We Deliver (简体中文) - One per line</label>
                <textarea
                  value={service.what_we_deliver_zh_cn || ''}
                  onChange={e => handleLanguageChange('what_we_deliver_zh_cn', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_tw' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (繁體中文)</label>
                <input
                  type="text"
                  value={service.title_zh_tw}
                  onChange={e => handleLanguageChange('title_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Short Description (繁體中文)</label>
                <textarea
                  value={service.description_zh_tw}
                  onChange={e => handleLanguageChange('description_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Description (繁體中文)</label>
                <textarea
                  value={service.full_description_zh_tw}
                  onChange={e => handleLanguageChange('full_description_zh_tw', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Ideal For (繁體中文) - One per line</label>
                <textarea
                  value={service.ideal_for_zh_tw || ''}
                  onChange={e => handleLanguageChange('ideal_for_zh_tw', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">What We Deliver (繁體中文) - One per line</label>
                <textarea
                  value={service.what_we_deliver_zh_tw || ''}
                  onChange={e => handleLanguageChange('what_we_deliver_zh_tw', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Slug */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Slug</label>
                <input
                  type="text"
                  value={service.slug}
                  onChange={e => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {ICON_OPTIONS.map(icon => (
                    <button
                      key={icon}
                      onClick={() => handleInputChange('icon', icon)}
                      className={`p-3 rounded-lg transition-colors ${ 
                        service.icon === icon
                          ? 'bg-brand-primary text-white'
                          : 'bg-black/50 border border-brand-border text-gray-400 hover:text-white'
                      }`}
                    >
                      <i className={`ph ${icon} text-lg`}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={service.sort_order}
                  onChange={e => handleInputChange('sort_order', parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Publish Status */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.is_published}
                    onChange={e => handleInputChange('is_published', e.target.checked)}
                    className="w-4 h-4 rounded border-brand-border"
                  />
                  <span className="text-sm text-gray-300">Publish this service</span>
                </label>
              </div>

              {/* Featured */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.featured}
                    onChange={e => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4 rounded border-brand-border"
                  />
                  <span className="text-sm text-gray-300">Mark as featured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
            <p className="text-xs text-blue-300/80">
              <i className="ph ph-info inline mr-2"></i>
              All fields support 4 languages. Changes are saved immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
