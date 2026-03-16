'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  service_needed_en: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
  monthly_budget?: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    if (filter !== 'all' && lead.status !== filter) return false;
    if (
      searchTerm &&
      !lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !lead.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const updateLeadStatus = async (id: number, status: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads(leads.map(lead => (lead.id === id ? { ...lead, status } : lead)));
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const deleteLead = async (id: number) => {
    try {
      const res = await fetch(`/api/leads`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setLeads(leads.filter(lead => lead.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const statusColors: Record<Lead['status'], string> = {
    new: 'bg-blue-500/10 text-blue-400',
    contacted: 'bg-yellow-500/10 text-yellow-400',
    qualified: 'bg-purple-500/10 text-purple-400',
    closed: 'bg-green-500/10 text-green-400',
  };

  const statusIcons: Record<Lead['status'], string> = {
    new: 'ph-envelope',
    contacted: 'ph-phone',
    qualified: 'ph-check-circle',
    closed: 'ph-seal-check',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Contact Leads</h1>
        <p className="text-gray-400">Manage contact form submissions and leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: leads.length, color: 'blue', icon: 'ph-envelope' },
          {
            label: 'New',
            value: leads.filter(l => l.status === 'new').length,
            color: 'blue',
            icon: 'ph-envelope',
          },
          {
            label: 'Contacted',
            value: leads.filter(l => l.status === 'contacted').length,
            color: 'yellow',
            icon: 'ph-phone',
          },
          {
            label: 'Qualified',
            value: leads.filter(l => l.status === 'qualified').length,
            color: 'purple',
            icon: 'ph-check-circle',
          },
        ].map(stat => (
          <div key={stat.label} className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <i className={`ph ${stat.icon} text-${stat.color}-500 text-3xl opacity-20`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-surface border border-brand-border text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="space-y-4">
        {filteredLeads.map(lead => (
          <div
            key={lead.id}
            className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-primary/50 transition-colors group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white mb-2">{lead.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-sm text-brand-primary hover:underline flex items-center gap-1"
                    >
                      <i className="ph ph-envelope"></i>
                      {lead.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <a href={`tel:${lead.phone}`} className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
                      <i className="ph ph-phone"></i>
                      {lead.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Company</p>
                    <p className="text-sm text-gray-300">{lead.company}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Service Interested</p>
                    <span className="inline-flex items-center gap-1 text-sm text-brand-primary">
                      <i className="ph ph-tag"></i>
                      {lead.service_needed_en}
                    </span>
                  </div>
                </div>
                {lead.message && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Message</p>
                    <p className="text-sm text-gray-300 bg-black/20 rounded-lg p-3">{lead.message}</p>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    Submitted {new Date(lead.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                  {lead.monthly_budget && (
                    <span className="flex items-center gap-1">
                      <i className="ph ph-currency-usd"></i>
                      Budget: ${lead.monthly_budget.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:items-end">
                <div className="relative group/dropdown">
                  <button
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${statusColors[lead.status]}`}
                  >
                    <i className={`ph ${statusIcons[lead.status]}`}></i>
                    {lead.status}
                    <i className="ph ph-caret-down text-xs"></i>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 bg-brand-surface border border-brand-border rounded-lg shadow-xl z-50 min-w-[160px] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all">
                    {(['new', 'contacted', 'qualified', 'closed'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => updateLeadStatus(lead.id, status)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg capitalize ${
                          lead.status === status
                            ? 'bg-brand-primary/10 text-brand-primary font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400"
                  title="Delete"
                >
                  <i className="ph ph-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <i className="ph ph-envelope text-gray-600 text-5xl mb-4 block"></i>
            <p className="text-gray-400 mb-2">No leads found</p>
            <p className="text-sm text-gray-500">Contact form submissions will appear here</p>
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-surface border border-brand-border text-white font-medium hover:bg-gray-900 transition-colors">
          <i className="ph ph-download"></i>
          Export as CSV
        </button>
      </div>
    </div>
  );
}
