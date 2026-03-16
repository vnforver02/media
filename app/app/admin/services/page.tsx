'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: number;
  slug: string;
  icon: string;
  title_en: string;
  is_published: boolean;
  featured: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 弹窗状态
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title_en: '', slug: '', title_vi: '', title_zh_cn: '', title_zh_tw: '' });

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?admin=true');
      setServices(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const filteredServices = services.filter(s => 
    !searchTerm || s.title_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = async (id: number, field: string, currentValue: boolean) => {
    try {
      await fetch(`/api/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: !currentValue }),
      });
      fetchServices();
    } catch (e) {}
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch(`/api/services`, {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
      });
      fetchServices();
    } catch (e) {}
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/services', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      setShowModal(false);
      setFormData({ title_en: '', slug: '', title_vi: '', title_zh_cn: '', title_zh_tw: '' });
      fetchServices();
    } catch (e) { alert('Failed to create'); }
  };

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
          <p className="text-gray-400">Manage your service offerings</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:scale-105 transition-all">
          <i className="ph ph-plus-circle"></i> Add Service
        </button>
      </div>

      {/* 表格区 */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/30 border-b border-brand-border text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border text-white">
            {filteredServices.map(service => (
              <tr key={service.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium">{service.title_en} <p className="text-xs text-gray-500 font-normal">{service.slug}</p></td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleStatus(service.id, 'is_published', service.is_published)} className={`px-3 py-1 rounded-full text-xs font-medium ${service.is_published ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {service.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleStatus(service.id, 'featured', service.featured)} className={`px-3 py-1 rounded-full text-xs font-medium ${service.featured ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    Featured
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <i className="ph ph-trash text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 新增服务弹窗 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-surface border border-brand-border p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Service</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Title (English) *</label>
                <input type="text" required value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">URL Slug (Auto-generated)</label>
                <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Title (Vietnamese)</label>
                  <input type="text" value={formData.title_vi} onChange={e => setFormData({...formData, title_vi: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Title (Simplified Chinese)</label>
                  <input type="text" value={formData.title_zh_cn} onChange={e => setFormData({...formData, title_zh_cn: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-lg border border-brand-border text-white hover:bg-gray-800">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-lg bg-brand-primary text-white font-medium">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}