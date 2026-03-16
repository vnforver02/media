'use client';

import { useState, useEffect } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';

const languages: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'EN' },
  { code: 'vi', name: 'Tiếng Việt', native: 'VI' },
  { code: 'zh', name: '中文', native: '中文' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm font-medium text-gray-300 hover:text-white hover:border-brand-primary transition-colors"
      >
        <i className="ph ph-globe text-lg"></i>
        <span className="hidden sm:inline">
          {currentLang?.native}
        </span>
        <i className={`ph ph-caret-down text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-brand-surface border border-brand-border rounded-lg shadow-xl z-50 min-w-[180px] overflow-hidden">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors ${
                language === lang.code
                  ? 'bg-brand-primary/10 text-brand-primary font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <div className="font-medium">{lang.native}</div>
              <div className="text-xs text-gray-500 mt-0.5">{lang.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
