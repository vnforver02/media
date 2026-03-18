'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async () => {
    const newFAQ = {
      question_en: 'New Question',
      question_vi: 'Câu hỏi mới',
      question_zh_cn: '新问题',
      question_zh_tw: '新問題',
      answer_en: '',
      answer_vi: '',
      answer_zh_cn: '',
      answer_zh_tw: '',
      category_en: 'General',
      category_vi: 'Chung',
      category_zh_cn: '一般',
      category_zh_tw: '一般',
      sort_order: faqs.length,
      is_published: false,
    };

    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFAQ),
      });
      if (res.ok) {
        const created = await res.json();
        window.location.href = `/admin/faqs/edit/${created.id}`;
      }
    } catch (error) {
      console.error('Failed to create FAQ:', error);
      setMessage('✗ Failed to create FAQ');
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      const res = await fetch('/api/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setFaqs(faqs.map(f => f.id === id ? updated : f));
      }
    } catch (error) {
      console.error('Failed to update FAQ:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/faqs?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFaqs(faqs.filter(f => f.id !== id));
        setMessage('✓ FAQ deleted');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
      setMessage('✗ Failed to delete FAQ');
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    if (filter === 'published' && !faq.is_published) return false;
    if (filter === 'draft' && faq.is_published) return false;
    if (searchTerm && !faq.question_en.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">FAQ Management</h1>
          <p className="text-gray-400">Manage frequently asked questions</p>
        </div>
        <button
          onClick={handleAddFAQ}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          <i className="ph ph-plus-circle"></i>
          Add FAQ
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-surface text-gray-300 hover:bg-brand-surface/80'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map(faq => (
          <div
            key={faq.id}
            className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-brand-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">{faq.question_en}</h4>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{faq.answer_en}</p>
                <div className="flex gap-3 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                    {faq.category_en}
                  </span>
                  <span className="text-gray-500">{faq.is_published ? '✓ Published' : '○ Draft'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => handleTogglePublish(faq.id, faq.is_published)}
                  className={`p-2 rounded-lg transition-colors ${
                    faq.is_published
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                  }`}
                  title={faq.is_published ? 'Unpublish' : 'Publish'}
                >
                  <i className={`ph ${faq.is_published ? 'ph-eye' : 'ph-eye-slash'}`}></i>
                </button>

                <Link
                  href={`/admin/faqs/edit/${faq.id}`}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  title="Edit"
                >
                  <i className="ph ph-pencil-simple"></i>
                </Link>

                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <i className="ph ph-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <i className="ph ph-question text-4xl mb-3 opacity-50"></i>
          <p>No FAQs found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
