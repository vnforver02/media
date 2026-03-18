'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  client_type_en: string;
  client_type_vi: string;
  industry_en: string;
  industry_vi: string;
  is_published: boolean;
  featured: boolean;
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch('/api/case-studies');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCaseStudies(data);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  const filteredCaseStudies = caseStudies.filter(cs => {
    if (filter === 'published' && !cs.is_published) return false;
    if (filter === 'draft' && cs.is_published) return false;
    return true;
  });

  const togglePublish = async (id: number) => {
    const cs = caseStudies.find(c => c.id === id);
    if (!cs) return;
    
    try {
      const res = await fetch(`/api/case-studies`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !cs.is_published }),
      });
      if (res.ok) {
        setCaseStudies(
          caseStudies.map(c =>
            c.id === id ? { ...c, is_published: !c.is_published } : c
          )
        );
      }
    } catch (error) {
      console.error('Failed to update case study:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading case studies...</p>
        </div>
      </div>
    );
  }

  const handleAddCaseStudy = async () => {
    const newCaseStudy = {
      slug: `case-study-${Date.now()}`,
      title_en: 'New Case Study',
      title_vi: 'Nghiên cứu trường hợp mới',
      title_zh_cn: '新案例研究',
      title_zh_tw: '新案例研究',
      cover_image: '',
      client_type_en: '',
      client_type_vi: '',
      client_type_zh_cn: '',
      client_type_zh_tw: '',
      industry_en: '',
      industry_vi: '',
      industry_zh_cn: '',
      industry_zh_tw: '',
      summary_en: '',
      summary_vi: '',
      summary_zh_cn: '',
      summary_zh_tw: '',
      challenge_en: '',
      challenge_vi: '',
      challenge_zh_cn: '',
      challenge_zh_tw: '',
      strategy_en: '',
      strategy_vi: '',
      strategy_zh_cn: '',
      strategy_zh_tw: '',
      execution_en: '',
      execution_vi: '',
      execution_zh_cn: '',
      execution_zh_tw: '',
      results_en: '',
      results_vi: '',
      results_zh_cn: '',
      results_zh_tw: '',
      seo_title_en: '',
      seo_description_en: '',
      sort_order: caseStudies.length,
      is_published: false,
      featured: false,
    };

    try {
      const res = await fetch(`/api/case-studies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCaseStudy),
      });
      if (res.ok) {
        const created = await res.json();
        window.location.href = `/admin/case-studies/edit/${created.id}`;
      }
    } catch (error) {
      console.error('Failed to create case study:', error);
    }
  };

  const handleDeleteCaseStudy = async (id: number) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      const res = await fetch(`/api/case-studies`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCaseStudies(caseStudies.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete case study:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Case Studies</h1>
          <p className="text-gray-400">Manage your portfolio and case studies</p>
        </div>
        <button 
          onClick={handleAddCaseStudy}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all">
          <i className="ph ph-plus-circle"></i>
          Add Case Study
        </button>
      </div>

      <div className="flex gap-2">
        {(['all', 'published', 'draft'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-3 rounded-lg font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-brand-primary text-white'
                : 'bg-brand-surface border border-brand-border text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCaseStudies.map(cs => (
          <div key={cs.id} className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden group hover:border-brand-primary/50 transition-colors">
            <div className="h-40 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 relative flex items-center justify-center">
              <i className="ph ph-presentation text-6xl text-gray-600"></i>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{cs.title_en}</h3>
              <div className="space-y-2 mb-4 text-sm">
                <p className="text-gray-400">
                  <span className="text-gray-500">Client:</span> {cs.client_type_en}
                </p>
                <p className="text-gray-400">
                  <span className="text-gray-500">Industry:</span> {cs.industry_en}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    cs.is_published
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}
                >
                  <i className={`ph ${cs.is_published ? 'ph-check-circle' : 'ph-clock'}`}></i>
                  {cs.is_published ? 'Published' : 'Draft'}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/admin/case-studies/edit/${cs.id}`}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                    <i className="ph ph-pencil-simple"></i>
                  </Link>
                  <button
                    onClick={() => togglePublish(cs.id)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                  >
                    <i className={`ph ${cs.is_published ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                  </button>
                  <button 
                    onClick={() => handleDeleteCaseStudy(cs.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400">
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <i className="ph ph-presentation text-gray-600 text-5xl mb-4 block"></i>
          <p className="text-gray-400">No case studies found</p>
        </div>
      )}
    </div>
  );
}
