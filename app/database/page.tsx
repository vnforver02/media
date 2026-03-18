'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DatabasePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadUrl = '/api/database/export';

  return (
    <div className="min-h-screen bg-brand-dark text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Database Export</h1>
          <p className="text-xl text-gray-400">Download your complete database as SQL file</p>
        </div>

        {/* Main Download Card */}
        <div className="bg-gradient-to-r from-brand-primary/20 to-brand-cyan/20 border border-brand-primary/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                📊 Complete Database Export
              </h2>
              <p className="text-gray-400 text-lg mb-4">
                Download all tables, schemas, and data in SQL format. Ready to import into any PostgreSQL database.
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium">
                  Complete SQL
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-sm font-medium">
                  8 Tables
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-medium">
                  With Data
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href={downloadUrl}
                download
                className="px-8 py-4 rounded-lg bg-brand-primary text-white font-bold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap text-center"
              >
                ⬇️ Download SQL
              </a>
              <button
                onClick={() => handleCopy(downloadUrl)}
                className="px-8 py-3 rounded-lg bg-gray-700 text-gray-200 font-bold hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                {copied ? '✓ Copied!' : '📋 Copy Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Direct Link */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8">
          <h3 className="text-white font-bold mb-3">Direct Download Link:</h3>
          <div className="flex items-center gap-2">
            <code className="text-brand-primary flex-1 break-all">
              {typeof window !== 'undefined' && window.location.origin}
              {downloadUrl}
            </code>
            <button
              onClick={() => handleCopy(`${typeof window !== 'undefined' ? window.location.origin : ''}${downloadUrl}`)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-all whitespace-nowrap"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        {/* Database Tables Info */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">Included Tables:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">📋 admin_users</h4>
              <p className="text-sm text-gray-400">Admin user accounts and authentication</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">💼 case_studies</h4>
              <p className="text-sm text-gray-400">Multilingual case studies and projects</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">📧 contact_leads</h4>
              <p className="text-sm text-gray-400">Contact form submissions and leads</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">❓ faqs</h4>
              <p className="text-sm text-gray-400">Frequently asked questions (multilingual)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">👔 jobs</h4>
              <p className="text-sm text-gray-400">Job postings and career opportunities</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">🔗 navigation</h4>
              <p className="text-sm text-gray-400">Site navigation menu configuration</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">⚙️ services</h4>
              <p className="text-sm text-gray-400">Services offered (multilingual)</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h4 className="font-bold text-brand-primary mb-2">⚡ site_settings</h4>
              <p className="text-sm text-gray-400">Global site configuration and metadata</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 mt-8">
          <h3 className="text-2xl font-bold text-white mb-6">How to Use:</h3>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4">
              <span className="font-bold text-brand-primary flex-shrink-0">1.</span>
              <span>Click the <strong>"Download SQL"</strong> button above to download the complete database file</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-brand-primary flex-shrink-0">2.</span>
              <span>The file includes all CREATE TABLE statements and INSERT statements with current data</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-brand-primary flex-shrink-0">3.</span>
              <span>Import the SQL file into any PostgreSQL database using: <code className="bg-black px-2 py-1 rounded text-brand-cyan">psql -U user -d database -f export.sql</code></span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-brand-primary flex-shrink-0">4.</span>
              <span>Or paste the content into your database admin panel (pgAdmin, DBeaver, etc.)</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
