'use client';

import { useState } from 'react';

export default function AdminMediaPage() {
  const [media, setMedia] = useState([
    { id: '1', name: 'hero-image.jpg', size: '2.4 MB', uploaded: 'Jan 15, 2024', type: 'image' },
    { id: '2', name: 'service-icon-meta.svg', size: '45 KB', uploaded: 'Jan 12, 2024', type: 'image' },
    { id: '3', name: 'case-study-thumbnail.png', size: '1.8 MB', uploaded: 'Jan 10, 2024', type: 'image' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Media Manager</h1>
          <p className="text-gray-400">Upload and manage website images and media</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all">
          <i className="ph ph-cloud-arrow-up"></i>
          Upload Media
        </button>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-brand-border rounded-2xl p-12 text-center hover:border-brand-primary transition-colors cursor-pointer">
        <i className="ph ph-cloud-arrow-up text-5xl text-gray-600 mb-4 block"></i>
        <p className="text-white font-medium mb-2">Drag and drop your files here</p>
        <p className="text-gray-400 text-sm mb-4">or click to browse</p>
        <p className="text-xs text-gray-500">Supported formats: JPG, PNG, SVG, GIF (max 10MB)</p>
      </div>

      {/* Media Library */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border bg-black/30">
          <h3 className="font-bold text-white">Recent Media</h3>
        </div>
        <div className="divide-y divide-brand-border">
          {media.map(item => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                  <i className="ph ph-image text-xl"></i>
                </div>
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.size} • {item.uploaded}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                  <i className="ph ph-copy"></i>
                </button>
                <button className="p-2 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400">
                  <i className="ph ph-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
