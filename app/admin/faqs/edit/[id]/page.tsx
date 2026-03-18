'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface FAQ {
  id: number;
  question_en: string;
  question_vi: string;
  question_zh_cn: string;
  question_zh_tw: string;
  answer_en: string;
  answer_vi: string;
  answer_zh_cn: string;
  answer_zh_tw: string;
  category_en: string;
  category_vi: string;
  category_zh_cn: string;
  category_zh_tw: string;
  sort_order: number;
  is_published: boolean;
}

export default function EditFAQPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [faq, setFaq] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'vi' | 'zh_cn' | 'zh_tw'>('en');

  useEffect(() => {
    fetchFAQ();
  }, [id]);

  const fetchFAQ = async () => {
    try {
      const res = await fetch(`/api/faqs?id=${id}`);
      const data = await res.json();
      setFaq(data[0] || null);
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
      setMessage('✗ Failed to load FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (faq) {
      setFaq({ ...faq, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!faq) return;
    setSaving(true);

    try {
      const res = await fetch('/api/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq),
      });

      if (res.ok) {
        const updated = await res.json();
        setFaq(updated);
        setMessage('✓ FAQ saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setMessage('✗ Error saving FAQ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading FAQ...</p>
        </div>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">FAQ not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Edit FAQ</h1>
          <p className="text-gray-400">Update FAQ content across all languages</p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
        >
          <i className="ph ph-arrow-left"></i>
          Back
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
          message.includes('✓') 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <i className={`ph ${message.includes('✓') ? 'ph-check-circle' : 'ph-warning-circle'} text-lg`}></i>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="flex gap-2 border-b border-brand-border">
            {['en', 'vi', 'zh_cn', 'zh_tw'].map(lang => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang as any)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === lang
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'vi' ? 'Tiếng Việt' : lang === 'zh_cn' ? '简体中文' : '繁體中文'}
              </button>
            ))}
          </div>

          {/* Content Tabs */}
          {activeTab === 'en' && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
                <input
                  type="text"
                  value={faq.question_en}
                  onChange={e => handleChange('question_en', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={faq.category_en}
                  onChange={e => handleChange('category_en', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
                <textarea
                  value={faq.answer_en}
                  onChange={e => handleChange('answer_en', e.target.value)}
                  rows={8}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'vi' && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Câu hỏi</label>
                <input
                  type="text"
                  value={faq.question_vi}
                  onChange={e => handleChange('question_vi', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Danh mục</label>
                <input
                  type="text"
                  value={faq.category_vi}
                  onChange={e => handleChange('category_vi', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Trả lời</label>
                <textarea
                  value={faq.answer_vi}
                  onChange={e => handleChange('answer_vi', e.target.value)}
                  rows={8}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_cn' && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">问题</label>
                <input
                  type="text"
                  value={faq.question_zh_cn}
                  onChange={e => handleChange('question_zh_cn', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">分类</label>
                <input
                  type="text"
                  value={faq.category_zh_cn}
                  onChange={e => handleChange('category_zh_cn', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">回答</label>
                <textarea
                  value={faq.answer_zh_cn}
                  onChange={e => handleChange('answer_zh_cn', e.target.value)}
                  rows={8}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'zh_tw' && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">問題</label>
                <input
                  type="text"
                  value={faq.question_zh_tw}
                  onChange={e => handleChange('question_zh_tw', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">分類</label>
                <input
                  type="text"
                  value={faq.category_zh_tw}
                  onChange={e => handleChange('category_zh_tw', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">回答</label>
                <textarea
                  value={faq.answer_zh_tw}
                  onChange={e => handleChange('answer_zh_tw', e.target.value)}
                  rows={8}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-4 rounded-lg bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-spinner animate-spin"></i>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-check-circle"></i>
                Save Changes
              </span>
            )}
          </button>

          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-white flex items-center gap-2">
              <i className="ph ph-info text-blue-400"></i>
              Publish Status
            </h4>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={faq.is_published}
                onChange={e => handleChange('is_published', e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-gray-300">Publish this FAQ</label>
            </div>

            <p className="text-xs text-gray-500">
              {faq.is_published ? 'This FAQ is visible on the frontend' : 'This FAQ is currently hidden'}
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <i className="ph ph-lightbulb text-blue-400"></i>
              Tips
            </h4>
            <ul className="text-xs text-blue-300/80 space-y-2">
              <li>• Translate to all languages</li>
              <li>• Clear and concise answers</li>
              <li>• Use consistent categories</li>
              <li>• Publish when ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
