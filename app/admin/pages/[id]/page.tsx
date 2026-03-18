'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface PageData {
  id: string;
  name: string;
  slug: string;
  content: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export default function EditPagePage() {
  const params = useParams();
  const slug = params.id as string;
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        // Load page configuration based on slug
        const pageConfigs: { [key: string]: PageData } = {
          home: {
            id: '1',
            name: 'Home',
            slug: 'home',
            content: {
              hero_en: { title: '', description: '' },
              hero_vi: { title: '', description: '' },
              hero_zh_cn: { title: '', description: '' },
              hero_zh_tw: { title: '', description: '' },
            },
          },
          about: {
            id: '2',
            name: 'About Us',
            slug: 'about',
            content: {
              intro_en: { title: '', description: '' },
              intro_vi: { title: '', description: '' },
              intro_zh_cn: { title: '', description: '' },
              intro_zh_tw: { title: '', description: '' },
            },
          },
          contact: {
            id: '3',
            name: 'Contact',
            slug: 'contact',
            content: {
              form_en: { title: '', description: '' },
              form_vi: { title: '', description: '' },
              form_zh_cn: { title: '', description: '' },
              form_zh_tw: { title: '', description: '' },
            },
          },
        };

        if (pageConfigs[slug]) {
          setPage(pageConfigs[slug]);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [slug]);

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    try {
      // This would save to your API
      console.log('Saving page:', page);
      alert('Page saved successfully');
    } catch (err) {
      setError('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error || !page) {
    return (
      <div className="space-y-4">
        <Link href="/admin/pages" className="text-brand-primary hover:underline">
          ← Back to Pages
        </Link>
        <div className="text-red-400">{error || 'Page not found'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/pages" className="text-brand-primary hover:underline text-sm mb-3 inline-block">
            ← Back to Pages
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Edit {page.name}</h1>
          <p className="text-gray-400">Manage multilingual content for this page</p>
        </div>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">English (EN)</label>
            <input
              type="text"
              placeholder="Title"
              value={page.content.hero_en?.title || ''}
              onChange={(e) => {
                setPage({
                  ...page,
                  content: {
                    ...page.content,
                    hero_en: { ...page.content.hero_en, title: e.target.value },
                  },
                });
              }}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Vietnamese (VI)</label>
            <input
              type="text"
              placeholder="Title"
              value={page.content.hero_vi?.title || ''}
              onChange={(e) => {
                setPage({
                  ...page,
                  content: {
                    ...page.content,
                    hero_vi: { ...page.content.hero_vi, title: e.target.value },
                  },
                });
              }}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chinese Simplified (ZH_CN)</label>
            <input
              type="text"
              placeholder="Title"
              value={page.content.hero_zh_cn?.title || ''}
              onChange={(e) => {
                setPage({
                  ...page,
                  content: {
                    ...page.content,
                    hero_zh_cn: { ...page.content.hero_zh_cn, title: e.target.value },
                  },
                });
              }}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chinese Traditional (ZH_TW)</label>
            <input
              type="text"
              placeholder="Title"
              value={page.content.hero_zh_tw?.title || ''}
              onChange={(e) => {
                setPage({
                  ...page,
                  content: {
                    ...page.content,
                    hero_zh_tw: { ...page.content.hero_zh_tw, title: e.target.value },
                  },
                });
              }}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-700">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/pages"
            className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
