'use client';

export default function AdminNavigationPage() {
  const menuItems = [
    { label: 'Home', path: '/', visible: true },
    { label: 'About', path: '/about', visible: true },
    { label: 'Services', path: '/services', visible: true },
    { label: 'Case Studies', path: '/case-studies', visible: true },
    { label: 'Careers', path: '/careers', visible: true },
    { label: 'Contact', path: '/contact', visible: true },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Navigation Management</h1>
      
      <div className="bg-brand-surface border border-brand-border rounded-2xl">
        <div className="px-6 py-4 border-b border-brand-border bg-black/30">
          <h3 className="font-bold text-white">Main Navigation</h3>
        </div>
        <div className="divide-y divide-brand-border">
          {menuItems.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/30">
              <div className="flex items-center gap-4">
                <i className="ph ph-dots-six-vertical text-gray-600"></i>
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.path}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-700 rounded">
                  <i className="ph ph-eye" style={{opacity: item.visible ? 1 : 0.5}}></i>
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <i className="ph ph-pencil-simple"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
