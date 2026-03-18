'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  department_en: string;
  department_vi: string;
  employment_type_en: string;
  employment_type_vi: string;
  is_published: boolean;
  featured: boolean;
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs?admin=true');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (filter === 'published' && !job.is_published) return false;
    if (filter === 'draft' && job.is_published) return false;
    if (searchTerm && !job.title_en.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const togglePublish = async (id: number) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    
    try {
      const res = await fetch(`/api/jobs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !job.is_published }),
      });
      if (res.ok) {
        setJobs(
          jobs.map(j =>
            j.id === id ? { ...j, is_published: !j.is_published } : j
          )
        );
      }
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const toggleFeatured = async (id: number) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    
    try {
      const res = await fetch(`/api/jobs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, featured: !job.featured }),
      });
      if (res.ok) {
        setJobs(
          jobs.map(j =>
            j.id === id ? { ...j, featured: !j.featured } : j
          )
        );
      }
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading jobs...</p>
        </div>
      </div>
    );
  }

  const handleAddJob = async () => {
    const newJob = {
      slug: `job-${Date.now()}`,
      title_en: 'New Position',
      title_vi: 'Vị trí mới',
      title_zh_cn: '新职位',
      title_zh_tw: '新職位',
      department_en: '',
      department_vi: '',
      department_zh_cn: '',
      department_zh_tw: '',
      location_en: '',
      location_vi: '',
      location_zh_cn: '',
      location_zh_tw: '',
      employment_type_en: 'Full-time',
      employment_type_vi: 'Toàn thời gian',
      employment_type_zh_cn: '全职',
      employment_type_zh_tw: '全職',
      overview_en: '',
      overview_vi: '',
      overview_zh_cn: '',
      overview_zh_tw: '',
      responsibilities_en: '',
      responsibilities_vi: '',
      responsibilities_zh_cn: '',
      responsibilities_zh_tw: '',
      requirements_en: '',
      requirements_vi: '',
      requirements_zh_cn: '',
      requirements_zh_tw: '',
      preferred_skills_en: '',
      preferred_skills_vi: '',
      preferred_skills_zh_cn: '',
      preferred_skills_zh_tw: '',
      benefits_en: '',
      benefits_vi: '',
      benefits_zh_cn: '',
      benefits_zh_tw: '',
      sort_order: jobs.length,
      is_published: false,
      featured: false,
    };

    try {
      const res = await fetch(`/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      if (res.ok) {
        const created = await res.json();
        window.location.href = `/admin/careers/edit/${created.id}`;
      }
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const res = await fetch(`/api/jobs`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Careers & Job Management</h1>
          <p className="text-gray-400">Manage job postings and recruitment content</p>
        </div>
        <button 
          onClick={handleAddJob}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all">
          <i className="ph ph-plus-circle"></i>
          Post New Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            placeholder="Search job postings..."
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
              {f === 'all' ? 'All Jobs' : f === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-black/30">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{job.title_en}</p>
                      <p className="text-xs text-gray-500 mt-1">{job.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm">{job.department_en}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      job.employment_type_en === 'Full-time'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {job.employment_type_en}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      job.is_published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      <i className={`ph ${job.is_published ? 'ph-check-circle' : 'ph-clock'}`}></i>
                      {job.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/careers/edit/${job.id}`}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" 
                        title="Edit"
                      >
                        <i className="ph ph-pencil-simple"></i>
                      </Link>
                      <button
                        onClick={() => togglePublish(job.id)}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                        title={job.is_published ? 'Unpublish' : 'Publish'}
                      >
                        <i className={`ph ${job.is_published ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
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

        {filteredJobs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <i className="ph ph-briefcase text-gray-600 text-4xl mb-4 block"></i>
            <p className="text-gray-400 mb-2">No job postings found</p>
            <p className="text-sm text-gray-500">Create your first job posting to get started</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Postings</p>
              <p className="text-3xl font-bold text-white">{jobs.filter(j => j.is_published).length}</p>
            </div>
            <i className="ph ph-briefcase text-brand-primary text-4xl opacity-20"></i>
          </div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Positions</p>
              <p className="text-3xl font-bold text-white">{filteredJobs.length}</p>
            </div>
            <i className="ph ph-users text-blue-500 text-4xl opacity-20"></i>
          </div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Drafts</p>
              <p className="text-3xl font-bold text-white">{jobs.filter(j => !j.is_published).length}</p>
            </div>
            <i className="ph ph-clock text-yellow-500 text-4xl opacity-20"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
