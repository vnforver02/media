'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  id: number;
  label_en: string;
  label_vi: string;
  label_zh_cn: string;
  label_zh_tw: string;
  path: string;
  sort_order: number;
  is_visible: boolean;
}

export default function AdminNavigationPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<NavItem>>({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/navigation?admin=true');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    const newItem = {
      label_en: 'New Menu Item',
      label_vi: 'Mục menu mới',
      label_zh_cn: '新菜单项',
      label_zh_tw: '新菜單項',
      path: '/new-page',
      sort_order: items.length,
      is_visible: true,
    };

    try {
      const res = await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        const created = await res.json();
        setItems([...items, created]);
        setMessage('✓ Navigation item created');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to create item:', error);
      setMessage('✗ Failed to create item');
    }
  };

  const handleEditStart = (item: NavItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleEditChange = (field: string, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(items.map(i => i.id === editingId ? updated : i));
        setEditingId(null);
        setMessage('✓ Navigation item updated');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to update item:', error);
      setMessage('✗ Failed to update item');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this navigation item?')) return;
    try {
      const res = await fetch('/api/navigation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
        setMessage('✓ Navigation item deleted');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      setMessage('✗ Failed to delete item');
    }
  };

  const handleToggleVisible = async (id: number, isVisible: boolean) => {
    try {
      const res = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_visible: !isVisible }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(items.map(i => i.id === id ? updated : i));
      }
    } catch (error) {
      console.error('Failed to update visibility:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading navigation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Navigation Management</h1>
          <p className="text-gray-400">Edit navigation menu items and links</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          <i className="ph ph-plus-circle"></i>
          Add Menu Item
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
          message.includes('✓') 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <i className={`ph ${message.includes('✓') ? 'ph-check-circle' : 'ph-warning-circle'} text-lg`}></i>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-primary/50 transition-colors"
          >
            {editingId === item.id ? (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {['en', 'vi', 'zh_cn', 'zh_tw'].map(lang => (
                    <div key={lang}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Label ({lang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={editForm[`label_${lang}` as keyof NavItem] || ''}
                        onChange={e => handleEditChange(`label_${lang}`, e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Path</label>
                  <input
                    type="text"
                    value={editForm.path || ''}
                    onChange={e => handleEditChange('path', e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleEditSave}
                    className="flex-1 py-2 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 rounded-lg bg-gray-700 text-white font-medium hover:opacity-90 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{item.label_en}</h4>
                  <p className="text-sm text-gray-400">{item.path}</p>
                  <div className="mt-2 flex gap-2 text-xs text-gray-500">
                    <span>VI: {item.label_vi}</span>
                    <span>•</span>
                    <span>ZH: {item.label_zh_cn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleVisible(item.id, item.is_visible)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.is_visible
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                    }`}
                    title={item.is_visible ? 'Hide' : 'Show'}
                  >
                    <i className={`ph ${item.is_visible ? 'ph-eye' : 'ph-eye-slash'}`}></i>
                  </button>
                  <button
                    onClick={() => handleEditStart(item)}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  >
                    <i className="ph ph-pencil-simple"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <i className="ph ph-list text-4xl mb-3 opacity-50"></i>
          <p>No navigation items yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
