'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  slug: string;
  icon: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  is_published: boolean;
  featured: boolean;
  sort_order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services?admin=true');
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    if (filter === 'published' && !service.is_published) return false;
    if (filter === 'draft' && service.is_published) return false;
    if (searchTerm && !service.title_en.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const togglePublish = async (id: number) => {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    try {
      const res = await fetch(`/api/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !service.is_published }),
      });
      if (res.ok) {
        setServices(
          services.map(s =>
            s.id === id ? { ...s, is_published: !s.is_published } : s
          )
        );
      }
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const toggleFeatured = async (id: number) => {
    const service = services.find(s => s.id === id);
    if (!service) return;
    
    try {
      const res = await fetch(`/api/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, featured: !service.featured }),
      });
      if (res.ok) {
        setServices(
          services.map(s =>
            s.id === id ? { ...s, featured: !s.featured } : s
          )
        );
      }
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading services...</p>
        </div>
      </div>
    );
  }

  const handleAddService = async () => {
    const newService = {
      slug: `service-${Date.now()}`,
      icon: 'ph-stack',
      title_en: 'New Service',
      title_vi: 'Dịch vụ mới',
      title_zh_cn: '新服务',
      title_zh_tw: '新服務',
      description_en: '',
      description_vi: '',
      description_zh_cn: '',
      description_zh_tw: '',
      full_description_en: '',
      full_description_vi: '',
      full_description_zh_cn: '',
      full_description_zh_tw: '',
      sort_order: services.length,
      is_published: false,
      featured: false,
    };

    try {
      const res = await fetch(`/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (res.ok) {
        const created = await res.json();
        window.location.href = `/admin/services/edit/${created.id}`;
      }
    } catch (error) {
      console.error('Failed to create service:', error);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Services Management</h1>
          <p className="text-gray-400">Manage your service offerings across all languages</p>
        </div>
        <button 
          onClick={handleAddService}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all">
          <i className="ph ph-plus-circle"></i>
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
          />
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
              {f === 'all' ? 'All Services' : f === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-black/30">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Languages
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredServices.map(service => (
                <tr key={service.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        <i className={`ph ${service.icon} text-lg`}></i>
                      </div>
                      <div>
                        <p className="text-white font-medium">{service.title_en}</p>
                        <p className="text-xs text-gray-500 mt-1">{service.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      service.is_published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      <i className={`ph ${service.is_published ? 'ph-check-circle' : 'ph-clock'}`}></i>
                      {service.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeatured(service.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        service.featured
                          ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                          : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                      }`}
                    >
                      <i className={`ph ${service.featured ? 'ph-star-fill' : 'ph-star'}`}></i>
                      Featured
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {['en', 'vi', 'zh-cn', 'zh-tw'].map(lang => (
                        <div
                          key={lang}
                          className="w-6 h-6 rounded bg-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary"
                          title={lang}
                        >
                          {lang.toUpperCase()[0]}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/services/edit/${service.id}`}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" 
                        title="Edit"
                      >
                        <i className="ph ph-pencil-simple"></i>
                      </Link>
                      <button
                        onClick={() => togglePublish(service.id)}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                        title={service.is_published ? 'Unpublish' : 'Publish'}
                      >
                        <i className={`ph ${service.is_published ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400" 
                        title="Delete"
                      >
                        <i className="ph ph-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="px-6 py-12 text-center">
            <i className="ph ph-magnifying-glass text-gray-600 text-4xl mb-4 block"></i>
            <p className="text-gray-400 mb-2">No services found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex gap-4">
          <i className="ph ph-info text-xl text-blue-400 shrink-0 mt-0.5"></i>
          <div>
            <h3 className="font-bold text-white mb-2">Content Management Notes</h3>
            <ul className="text-sm text-blue-300/80 space-y-1">
              <li>• All services support 4 languages (EN, VI, ZH-CN, ZH-TW)</li>
              <li>• Publish services to make them visible on the frontend</li>
              <li>• Featured services appear at the top of listings</li>
              <li>• Changes are synchronized to all language versions immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
