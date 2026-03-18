'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  cover_image: string;
  client_type_en: string;
  client_type_vi: string;
  client_type_zh_cn: string;
  client_type_zh_tw: string;
  industry_en: string;
  industry_vi: string;
  industry_zh_cn: string;
  industry_zh_tw: string;
  summary_en: string;
  summary_vi: string;
  summary_zh_cn: string;
  summary_zh_tw: string;
  challenge_en: string;
  challenge_vi: string;
  challenge_zh_cn: string;
  challenge_zh_tw: string;
  strategy_en: string;
  strategy_vi: string;
  strategy_zh_cn: string;
  strategy_zh_tw: string;
  execution_en: string;
  execution_vi: string;
  execution_zh_cn: string;
  execution_zh_tw: string;
  results_en: string;
  results_vi: string;
  results_zh_cn: string;
  results_zh_tw: string;
  seo_title_en: string;
  seo_description_en: string;
  sort_order: number;
  is_published: boolean;
  featured: boolean;
}

export default function EditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'vi' | 'zh_cn' | 'zh_tw'>('en');

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`/api/case-studies?id=${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCaseStudy(data);
      } catch (err) {
        setError('Failed to load case study');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [id]);

  const handleInputChange = (field: keyof CaseStudy, value: any) => {
    if (caseStudy) {
      setCaseStudy({ ...caseStudy, [field]: value });
    }
  };

  const handleLanguageChange = (field: string, value: string) => {
    if (caseStudy) {
      setCaseStudy({ ...caseStudy, [field]: value } as any);
    }
  };

  const handleSave = async () => {
    if (!caseStudy) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/case-studies`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: caseStudy.id,
          ...caseStudy,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save case study');
      }
      
      setError('✓ Case study saved successfully!');
      setTimeout(() => {
        router.push('/admin/case-studies');
      }, 1500);
    } catch (err) {
      setError(`✗ ${err instanceof Error ? err.message : 'Failed to save case study'}`);
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
          <p className="text-gray-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Case study not found</p>
        <Link href="/admin/case-studies" className="text-brand-primary hover:underline">
          Back to case studies
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
            <Link href="/admin/case-studies" className="text-gray-400 hover:text-white">
              <i className="ph ph-caret-left text-xl"></i>
            </Link>
            <h1 className="text-4xl font-bold text-white">Edit Case Study</h1>
          </div>
          <p className="text-gray-400">Update case study details</p>
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
                  value={caseStudy.title_en}
                  onChange={e => handleLanguageChange('title_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client Type (English)</label>
                <input
                  type="text"
                  value={caseStudy.client_type_en}
                  onChange={e => handleLanguageChange('client_type_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Industry (English)</label>
                <input
                  type="text"
                  value={caseStudy.industry_en}
                  onChange={e => handleLanguageChange('industry_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Summary (English)</label>
                <textarea
                  value={caseStudy.summary_en}
                  onChange={e => handleLanguageChange('summary_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Challenge (English)</label>
                <textarea
                  value={caseStudy.challenge_en}
                  onChange={e => handleLanguageChange('challenge_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Strategy (English)</label>
                <textarea
                  value={caseStudy.strategy_en}
                  onChange={e => handleLanguageChange('strategy_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Execution (English)</label>
                <textarea
                  value={caseStudy.execution_en}
                  onChange={e => handleLanguageChange('execution_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Results (English)</label>
                <textarea
                  value={caseStudy.results_en}
                  onChange={e => handleLanguageChange('results_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* VI Tab - Similar structure */}
          {activeTab === 'vi' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (Tiếng Việt)</label>
                <input
                  type="text"
                  value={caseStudy.title_vi}
                  onChange={e => handleLanguageChange('title_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client Type (Tiếng Việt)</label>
                <input
                  type="text"
                  value={caseStudy.client_type_vi}
                  onChange={e => handleLanguageChange('client_type_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Industry (Tiếng Việt)</label>
                <input
                  type="text"
                  value={caseStudy.industry_vi}
                  onChange={e => handleLanguageChange('industry_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Summary (Tiếng Việt)</label>
                <textarea
                  value={caseStudy.summary_vi}
                  onChange={e => handleLanguageChange('summary_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Challenge (Tiếng Việt)</label>
                <textarea
                  value={caseStudy.challenge_vi}
                  onChange={e => handleLanguageChange('challenge_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Strategy (Tiếng Việt)</label>
                <textarea
                  value={caseStudy.strategy_vi}
                  onChange={e => handleLanguageChange('strategy_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Execution (Tiếng Việt)</label>
                <textarea
                  value={caseStudy.execution_vi}
                  onChange={e => handleLanguageChange('execution_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Results (Tiếng Việt)</label>
                <textarea
                  value={caseStudy.results_vi}
                  onChange={e => handleLanguageChange('results_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* ZH_CN Tab */}
          {activeTab === 'zh_cn' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (简体中文)</label>
                <input
                  type="text"
                  value={caseStudy.title_zh_cn}
                  onChange={e => handleLanguageChange('title_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client Type (简体中文)</label>
                <input
                  type="text"
                  value={caseStudy.client_type_zh_cn}
                  onChange={e => handleLanguageChange('client_type_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Industry (简体中文)</label>
                <input
                  type="text"
                  value={caseStudy.industry_zh_cn}
                  onChange={e => handleLanguageChange('industry_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Summary (简体中文)</label>
                <textarea
                  value={caseStudy.summary_zh_cn}
                  onChange={e => handleLanguageChange('summary_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Challenge (简体中文)</label>
                <textarea
                  value={caseStudy.challenge_zh_cn}
                  onChange={e => handleLanguageChange('challenge_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Strategy (简体中文)</label>
                <textarea
                  value={caseStudy.strategy_zh_cn}
                  onChange={e => handleLanguageChange('strategy_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Execution (简体中文)</label>
                <textarea
                  value={caseStudy.execution_zh_cn}
                  onChange={e => handleLanguageChange('execution_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Results (简体中文)</label>
                <textarea
                  value={caseStudy.results_zh_cn}
                  onChange={e => handleLanguageChange('results_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* ZH_TW Tab */}
          {activeTab === 'zh_tw' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title (繁體中文)</label>
                <input
                  type="text"
                  value={caseStudy.title_zh_tw}
                  onChange={e => handleLanguageChange('title_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client Type (繁體中文)</label>
                <input
                  type="text"
                  value={caseStudy.client_type_zh_tw}
                  onChange={e => handleLanguageChange('client_type_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Industry (繁體中文)</label>
                <input
                  type="text"
                  value={caseStudy.industry_zh_tw}
                  onChange={e => handleLanguageChange('industry_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Summary (繁體中文)</label>
                <textarea
                  value={caseStudy.summary_zh_tw}
                  onChange={e => handleLanguageChange('summary_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Challenge (繁體中文)</label>
                <textarea
                  value={caseStudy.challenge_zh_tw}
                  onChange={e => handleLanguageChange('challenge_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Strategy (繁體中文)</label>
                <textarea
                  value={caseStudy.strategy_zh_tw}
                  onChange={e => handleLanguageChange('strategy_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Execution (繁體中文)</label>
                <textarea
                  value={caseStudy.execution_zh_tw}
                  onChange={e => handleLanguageChange('execution_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Results (繁體中文)</label>
                <textarea
                  value={caseStudy.results_zh_tw}
                  onChange={e => handleLanguageChange('results_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Slug</label>
                <input
                  type="text"
                  value={caseStudy.slug}
                  onChange={e => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Cover Image URL</label>
                <input
                  type="text"
                  value={caseStudy.cover_image}
                  onChange={e => handleInputChange('cover_image', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={caseStudy.sort_order}
                  onChange={e => handleInputChange('sort_order', parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* SEO */}
              <div className="pt-4 border-t border-brand-border">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">SEO (English)</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={caseStudy.seo_title_en}
                    onChange={e => handleLanguageChange('seo_title_en', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-xs focus:outline-none focus:border-brand-primary transition-colors"
                    maxLength={60}
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-400 mb-2">SEO Description</label>
                  <textarea
                    value={caseStudy.seo_description_en}
                    onChange={e => handleLanguageChange('seo_description_en', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-xs focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    maxLength={160}
                  />
                </div>
              </div>

              {/* Publish Status */}
              <div className="pt-4 border-t border-brand-border">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={caseStudy.is_published}
                    onChange={e => handleInputChange('is_published', e.target.checked)}
                    className="w-4 h-4 rounded border-brand-border"
                  />
                  <span className="text-sm text-gray-300">Publish</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caseStudy.featured}
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
