'use client';

import { useState } from 'react';
import { faqs as initialFaqs } from '@/data/content';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">FAQ Management</h1>
          <p className="text-gray-400">Manage frequently asked questions</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all">
          <i className="ph ph-plus-circle"></i>
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map(faq => (
          <div
            key={faq.id}
            className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-colors"
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors group"
            >
              <div className="text-left flex-1">
                <h3 className="text-white font-medium group-hover:text-brand-primary transition-colors">{faq.question.en}</h3>
                <p className="text-xs text-gray-500 mt-1">{faq.category.en}</p>
              </div>
              <i className={`ph ph-caret-down text-gray-400 transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`}></i>
            </button>

            {expandedId === faq.id && (
              <div className="border-t border-brand-border px-6 py-4 bg-black/20">
                <p className="text-gray-300 text-sm mb-4">{faq.answer.en}</p>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white text-sm">
                    <i className="ph ph-pencil-simple"></i>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400 text-sm">
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
