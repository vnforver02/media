'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Job {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  department_en: string;
  department_vi: string;
  department_zh_cn: string;
  department_zh_tw: string;
  location_en: string;
  location_vi: string;
  location_zh_cn: string;
  location_zh_tw: string;
  employment_type_en: string;
  employment_type_vi: string;
  employment_type_zh_cn: string;
  employment_type_zh_tw: string;
  overview_en: string;
  overview_vi: string;
  overview_zh_cn: string;
  overview_zh_tw: string;
  responsibilities_en: string;
  responsibilities_vi: string;
  responsibilities_zh_cn: string;
  responsibilities_zh_tw: string;
  requirements_en: string;
  requirements_vi: string;
  requirements_zh_cn: string;
  requirements_zh_tw: string;
  preferred_skills_en: string;
  preferred_skills_vi: string;
  preferred_skills_zh_cn: string;
  preferred_skills_zh_tw: string;
  benefits_en: string;
  benefits_vi: string;
  benefits_zh_cn: string;
  benefits_zh_tw: string;
  sort_order: number;
  is_published: boolean;
  featured: boolean;
}

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'vi' | 'zh_cn' | 'zh_tw'>('en');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs?id=${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError('Failed to load job');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (field: keyof Job, value: any) => {
    if (job) {
      setJob({ ...job, [field]: value });
    }
  };

  const handleLanguageChange = (field: string, value: string) => {
    if (job) {
      setJob({ ...job, [field]: value } as any);
    }
  };

  const handleSave = async () => {
    if (!job) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/jobs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: job.id,
          ...job,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save job');
      }
      
      setError('✓ Job saved successfully!');
      setTimeout(() => {
        router.push('/admin/careers');
      }, 1500);
    } catch (err) {
      setError(`✗ ${err instanceof Error ? err.message : 'Failed to save job'}`);
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
          <p className="text-gray-400">Loading job...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Job not found</p>
        <Link href="/admin/careers" className="text-brand-primary hover:underline">
          Back to jobs
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
            <Link href="/admin/careers" className="text-gray-400 hover:text-white">
              <i className="ph ph-caret-left text-xl"></i>
            </Link>
            <h1 className="text-4xl font-bold text-white">Edit Job</h1>
          </div>
          <p className="text-gray-400">Update job details</p>
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
                <label className="block text-sm font-medium text-white mb-2">Job Title (English)</label>
                <input
                  type="text"
                  value={job.title_en}
                  onChange={e => handleLanguageChange('title_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Department (English)</label>
                  <input
                    type="text"
                    value={job.department_en}
                    onChange={e => handleLanguageChange('department_en', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location (English)</label>
                  <input
                    type="text"
                    value={job.location_en}
                    onChange={e => handleLanguageChange('location_en', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Employment Type (English)</label>
                <input
                  type="text"
                  value={job.employment_type_en}
                  onChange={e => handleLanguageChange('employment_type_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="e.g. Full-time, Part-time, Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Overview (English)</label>
                <textarea
                  value={job.overview_en}
                  onChange={e => handleLanguageChange('overview_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Responsibilities (English)</label>
                <textarea
                  value={job.responsibilities_en}
                  onChange={e => handleLanguageChange('responsibilities_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Requirements (English)</label>
                <textarea
                  value={job.requirements_en}
                  onChange={e => handleLanguageChange('requirements_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Skills (English)</label>
                <textarea
                  value={job.preferred_skills_en}
                  onChange={e => handleLanguageChange('preferred_skills_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Benefits (English)</label>
                <textarea
                  value={job.benefits_en}
                  onChange={e => handleLanguageChange('benefits_en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* VI, ZH_CN, ZH_TW tabs follow similar structure - abbreviated for brevity */}
          {activeTab === 'vi' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Job Title (Tiếng Việt)</label>
                <input
                  type="text"
                  value={job.title_vi}
                  onChange={e => handleLanguageChange('title_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Department (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={job.department_vi}
                    onChange={e => handleLanguageChange('department_vi', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={job.location_vi}
                    onChange={e => handleLanguageChange('location_vi', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Employment Type (Tiếng Việt)</label>
                <input
                  type="text"
                  value={job.employment_type_vi}
                  onChange={e => handleLanguageChange('employment_type_vi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Overview (Tiếng Việt)</label>
                <textarea
                  value={job.overview_vi}
                  onChange={e => handleLanguageChange('overview_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Responsibilities (Tiếng Việt)</label>
                <textarea
                  value={job.responsibilities_vi}
                  onChange={e => handleLanguageChange('responsibilities_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Requirements (Tiếng Việt)</label>
                <textarea
                  value={job.requirements_vi}
                  onChange={e => handleLanguageChange('requirements_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Skills (Tiếng Việt)</label>
                <textarea
                  value={job.preferred_skills_vi}
                  onChange={e => handleLanguageChange('preferred_skills_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Benefits (Tiếng Việt)</label>
                <textarea
                  value={job.benefits_vi}
                  onChange={e => handleLanguageChange('benefits_vi', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_cn' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Job Title (简体中文)</label>
                <input
                  type="text"
                  value={job.title_zh_cn}
                  onChange={e => handleLanguageChange('title_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Department (简体中文)</label>
                  <input
                    type="text"
                    value={job.department_zh_cn}
                    onChange={e => handleLanguageChange('department_zh_cn', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location (简体中文)</label>
                  <input
                    type="text"
                    value={job.location_zh_cn}
                    onChange={e => handleLanguageChange('location_zh_cn', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Employment Type (简体中文)</label>
                <input
                  type="text"
                  value={job.employment_type_zh_cn}
                  onChange={e => handleLanguageChange('employment_type_zh_cn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Overview (简体中文)</label>
                <textarea
                  value={job.overview_zh_cn}
                  onChange={e => handleLanguageChange('overview_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Responsibilities (简体中文)</label>
                <textarea
                  value={job.responsibilities_zh_cn}
                  onChange={e => handleLanguageChange('responsibilities_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Requirements (简体中文)</label>
                <textarea
                  value={job.requirements_zh_cn}
                  onChange={e => handleLanguageChange('requirements_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Skills (简体中文)</label>
                <textarea
                  value={job.preferred_skills_zh_cn}
                  onChange={e => handleLanguageChange('preferred_skills_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Benefits (简体中文)</label>
                <textarea
                  value={job.benefits_zh_cn}
                  onChange={e => handleLanguageChange('benefits_zh_cn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_tw' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Job Title (繁體中文)</label>
                <input
                  type="text"
                  value={job.title_zh_tw}
                  onChange={e => handleLanguageChange('title_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Department (繁體中文)</label>
                  <input
                    type="text"
                    value={job.department_zh_tw}
                    onChange={e => handleLanguageChange('department_zh_tw', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location (繁體中文)</label>
                  <input
                    type="text"
                    value={job.location_zh_tw}
                    onChange={e => handleLanguageChange('location_zh_tw', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Employment Type (繁體中文)</label>
                <input
                  type="text"
                  value={job.employment_type_zh_tw}
                  onChange={e => handleLanguageChange('employment_type_zh_tw', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Overview (繁體中文)</label>
                <textarea
                  value={job.overview_zh_tw}
                  onChange={e => handleLanguageChange('overview_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Responsibilities (繁體中文)</label>
                <textarea
                  value={job.responsibilities_zh_tw}
                  onChange={e => handleLanguageChange('responsibilities_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Requirements (繁體中文)</label>
                <textarea
                  value={job.requirements_zh_tw}
                  onChange={e => handleLanguageChange('requirements_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Skills (繁體中文)</label>
                <textarea
                  value={job.preferred_skills_zh_tw}
                  onChange={e => handleLanguageChange('preferred_skills_zh_tw', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Benefits (繁體中文)</label>
                <textarea
                  value={job.benefits_zh_tw}
                  onChange={e => handleLanguageChange('benefits_zh_tw', e.target.value)}
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
                  value={job.slug}
                  onChange={e => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={job.sort_order}
                  onChange={e => handleInputChange('sort_order', parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Publish Status */}
              <div className="pt-4 border-t border-brand-border">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={job.is_published}
                    onChange={e => handleInputChange('is_published', e.target.checked)}
                    className="w-4 h-4 rounded border-brand-border"
                  />
                  <span className="text-sm text-gray-300">Publish this job</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={job.featured}
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
