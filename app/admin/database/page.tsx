'use client';

import { useState } from 'react';
import sql from '@/app/api/utils/sql';

const sqlFileContent = `import { neon } from '@neondatabase/serverless';

// Create a connection pool
const sql = neon(process.env.DATABASE_URL!);

export default sql;`;

export default function AdminDatabase() {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(sqlFileContent)
    );
    element.setAttribute('download', 'sql.ts');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlFileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <i className="ph ph-database text-3xl text-brand-cyan"></i>
          <h1 className="text-4xl font-bold text-white">Database Configuration</h1>
        </div>
        <p className="text-gray-400">Download or view your database SQL utility file</p>
      </div>

      {/* Main Card */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        {/* Card Header */}
        <div className="border-b border-brand-border bg-gray-800/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <i className="ph ph-file-code text-brand-primary"></i>
                sql.ts File
              </h2>
              <p className="text-sm text-gray-400">Database connection utility for your Next.js API routes</p>
            </div>
            <div className="text-xs text-gray-500 bg-gray-900/50 px-3 py-1 rounded-lg">
              TypeScript
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-8">
          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-medium transition-colors"
            >
              <i className="ph ph-download"></i>
              Download File
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <i className={`ph ${copied ? 'ph-check' : 'ph-copy'}`}></i>
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Code Block */}
          <div className="bg-black/50 rounded-xl border border-gray-800 overflow-hidden">
            <div className="bg-gray-900/80 border-b border-gray-800 px-6 py-4">
              <div className="text-xs font-mono text-gray-500">sql.ts</div>
            </div>
            <pre className="p-6 overflow-x-auto">
              <code className="text-sm font-mono text-gray-300 leading-relaxed">
                {sqlFileContent}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Usage Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* How to Use */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="ph ph-book text-brand-cyan"></i>
            How to Use
          </h3>
          <div className="space-y-4 text-sm text-gray-400">
            <p>Import this utility in your API routes:</p>
            <div className="bg-black/50 rounded-lg p-3 border border-gray-800">
              <code className="text-gray-300 font-mono">
                import sql from '@/app/api/utils/sql';
              </code>
            </div>
            <p>Then use it to query your database:</p>
            <div className="bg-black/50 rounded-lg p-3 border border-gray-800">
              <code className="text-gray-300 font-mono text-xs">
                const result = await sql`SELECT * FROM table`;
              </code>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="ph ph-info text-blue-500"></i>
            Database Info
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-gray-500 text-xs uppercase">Database Name</div>
              <div className="text-white font-medium">neondb</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase">Provider</div>
              <div className="text-white font-medium">Neon (PostgreSQL)</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase">Environment Variable</div>
              <div className="text-white font-medium text-xs font-mono bg-gray-800 p-2 rounded">DATABASE_URL</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="ph ph-star text-yellow-500"></i>
            Features
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-gray-400">
              <i className="ph ph-check text-green-500 mt-0.5 shrink-0"></i>
              <span>Serverless PostgreSQL</span>
            </li>
            <li className="flex items-start gap-2 text-gray-400">
              <i className="ph ph-check text-green-500 mt-0.5 shrink-0"></i>
              <span>Auto-scaling queries</span>
            </li>
            <li className="flex items-start gap-2 text-gray-400">
              <i className="ph ph-check text-green-500 mt-0.5 shrink-0"></i>
              <span>Secure connection pooling</span>
            </li>
            <li className="flex items-start gap-2 text-gray-400">
              <i className="ph ph-check text-green-500 mt-0.5 shrink-0"></i>
              <span>SQL injection protection</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tables Overview */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <i className="ph ph-table text-brand-primary"></i>
          Database Tables
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'services', description: 'Service offerings' },
            { name: 'jobs', description: 'Job postings' },
            { name: 'case_studies', description: 'Case studies' },
            { name: 'contact_leads', description: 'Contact form submissions' },
            { name: 'faqs', description: 'FAQ content' },
            { name: 'site_settings', description: 'Global site configuration' },
          ].map(table => (
            <div
              key={table.name}
              className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 border border-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="font-mono text-sm text-brand-primary mb-1">{table.name}</div>
              <div className="text-xs text-gray-500">{table.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
