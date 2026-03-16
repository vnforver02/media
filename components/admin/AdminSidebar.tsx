'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

const menuItems: SidebarItem[] = [
  { label: 'Dashboard', icon: 'ph-house', href: '/admin' },
  { label: 'Pages', icon: 'ph-file-text', href: '/admin/pages' },
  { label: 'Services', icon: 'ph-stack', href: '/admin/services' },
  { label: 'Careers & Jobs', icon: 'ph-briefcase', href: '/admin/careers' },
  { label: 'Case Studies', icon: 'ph-presentation', href: '/admin/case-studies' },
  { label: 'Contact Leads', icon: 'ph-envelope', href: '/admin/leads', badge: 12 },
  { label: 'FAQ', icon: 'ph-chat-dots', href: '/admin/faqs' },
  { label: 'Navigation', icon: 'ph-list', href: '/admin/navigation' },
  { label: 'Site Settings', icon: 'ph-gear', href: '/admin/settings' },
  { label: 'Languages', icon: 'ph-globe', href: '/admin/languages' },
  { label: 'Media', icon: 'ph-image', href: '/admin/media' },
  { label: 'Database', icon: 'ph-database', href: '/admin/database' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-brand-surface border-r border-brand-border transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="h-20 border-b border-brand-border flex items-center justify-between px-4 gap-3">
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-brand-gradient flex items-center justify-center shrink-0">
              <i className="ph-bold ph-trend-up text-white"></i>
            </div>
            <span className="font-bold text-white text-sm truncate">Media Today</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors shrink-0"
        >
          <i className={`ph text-lg ${isCollapsed ? 'ph-caret-right' : 'ph-caret-left'}`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {menuItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group ${
                isActive
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <i className={`ph ${item.icon} text-lg shrink-0`}></i>
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`border-t border-brand-border p-4 space-y-2 ${isCollapsed ? 'text-center' : ''}`}>
        <div className="text-xs text-gray-500">
          {!isCollapsed && <div>Logged in as</div>}
          <div className="font-medium text-gray-300">admin</div>
        </div>
      </div>
    </aside>
  );
}
