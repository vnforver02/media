'use client';

export default function AdminPagesPage() {
  const pages = [
    { name: 'Home', slug: 'home', sections: 8, languages: 4 },
    { name: 'About Us', slug: 'about', sections: 5, languages: 4 },
    { name: 'Contact', slug: 'contact', sections: 3, languages: 4 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Page Management</h1>
          <p className="text-gray-400">Edit main website pages and sections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map(page => (
          <a
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:border-brand-primary/50 hover:bg-gray-900 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{page.name}</h3>
              <i className="ph ph-arrow-up-right text-gray-400 group-hover:text-white transition-colors"></i>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-400">
                <span className="text-gray-500">Sections:</span> {page.sections}
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-gray-500">Languages:</span> {page.languages}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-brand-primary text-sm font-medium group-hover:gap-3 transition-all">
              Edit Page <i className="ph ph-arrow-right"></i>
            </button>
          </a>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <i className="ph ph-info text-blue-400"></i>
          Page Structure
        </h3>
        <p className="text-sm text-blue-300/80 mb-4">
          Each page supports multilingual content management. Edit sections below to update page content across all languages.
        </p>
      </div>
    </div>
  );
}
