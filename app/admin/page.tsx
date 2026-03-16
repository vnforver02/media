'use client';

import { services, jobs, caseStudies } from '@/data/content';

export default function AdminDashboard() {
  const publishedServices = services.filter(s => s.isPublished).length;
  const publishedJobs = jobs.filter(j => j.isPublished).length;
  const publishedCaseStudies = caseStudies.filter(c => c.isPublished).length;
  const totalLeads = 47; // Mock data

  const statCards = [
    {
      title: 'Published Services',
      value: publishedServices,
      icon: 'ph-stack',
      color: 'blue',
      href: '/admin/services',
    },
    {
      title: 'Active Job Postings',
      value: publishedJobs,
      icon: 'ph-briefcase',
      color: 'purple',
      href: '/admin/careers',
    },
    {
      title: 'Case Studies',
      value: publishedCaseStudies,
      icon: 'ph-presentation',
      color: 'green',
      href: '/admin/case-studies',
    },
    {
      title: 'Contact Leads',
      value: totalLeads,
      icon: 'ph-envelope',
      color: 'red',
      href: '/admin/leads',
      badge: 12,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to Media Today CMS. Overview of your website content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => (
          <a
            key={card.href}
            href={card.href}
            className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:border-brand-primary/50 hover:bg-gray-900 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-lg bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500`}>
                <i className={`ph ${card.icon} text-2xl`}></i>
              </div>
              {card.badge && (
                <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-2">{card.title}</p>
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <div className="mt-4 text-xs text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              View all <i className="ph ph-arrow-right"></i>
            </div>
          </a>
        ))}
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Languages Supported */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <i className="ph ph-globe text-brand-cyan"></i>
            Languages Supported
          </h3>
          <div className="space-y-3">
            {[
              { code: 'EN', name: 'English', flag: '🇺🇸' },
              { code: 'VI', name: 'Vietnamese', flag: '🇻🇳' },
              { code: 'ZH-CN', name: 'Simplified Chinese', flag: '🇨🇳' },
              { code: 'ZH-TW', name: 'Traditional Chinese', flag: '🇹🇼' },
            ].map(lang => (
              <div
                key={lang.code}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-white text-sm">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.code}</div>
                  </div>
                </div>
                <i className="ph ph-check-circle text-green-500 text-lg"></i>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <i className="ph ph-lightning text-yellow-500"></i>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/admin/services"
              className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
            >
              <div className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                Add New Service
              </div>
              <div className="text-xs text-gray-500 mt-1">Create or edit a service offering</div>
            </a>
            <a
              href="/admin/careers"
              className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
            >
              <div className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                Post Job Opening
              </div>
              <div className="text-xs text-gray-500 mt-1">Create a new job posting</div>
            </a>
            <a
              href="/admin/leads"
              className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
            >
              <div className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                View Contact Leads
              </div>
              <div className="text-xs text-gray-500 mt-1">Manage form submissions</div>
            </a>
            <a
              href="/admin/settings"
              className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
            >
              <div className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                Site Settings
              </div>
              <div className="text-xs text-gray-500 mt-1">Configure global site options</div>
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <i className="ph ph-heartbeat text-green-500"></i>
            System Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Database Connection</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400">
                  <i className="ph ph-check-circle"></i> Connected
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">API Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400">
                  <i className="ph ph-check-circle"></i> Operational
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Cache Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400">
                  <i className="ph ph-info"></i> 85% Full
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/50 text-xs text-gray-500">
              <p>Last update: Just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <i className="ph ph-list text-brand-primary"></i>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'Updated Google Ads service', time: '2 hours ago', type: 'update' },
            { action: 'Added new case study', time: '4 hours ago', type: 'create' },
            { action: 'Received 3 new contact leads', time: '6 hours ago', type: 'form' },
            { action: 'Published TikTok Ads job posting', time: '1 day ago', type: 'create' },
            { action: 'Updated site settings', time: '2 days ago', type: 'update' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-brand-border/50 last:border-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                activity.type === 'create'
                  ? 'bg-green-500/10 text-green-500'
                  : activity.type === 'update'
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'bg-purple-500/10 text-purple-500'
              }`}>
                <i className={`ph ${
                  activity.type === 'create'
                    ? 'ph-plus-circle'
                    : activity.type === 'update'
                    ? 'ph-pencil-simple'
                    : 'ph-envelope'
                }`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{activity.action}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
