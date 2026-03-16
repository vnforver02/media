'use client';

import { useState, useEffect } from 'react';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

 const fetchUsers = async () => {
  try {
    const res = await fetch('/api/admin-users');
    const data = await res.json();
    // 关键：增加 Array.isArray 判断，防止 data 不是数组时导致 .map() 崩溃
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  } catch (error) {
    setUsers([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchUsers(); }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ username: '', email: '', password: '' });
        fetchUsers(); // 刷新列表
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="text-white text-center py-20">Loading users...</div>;

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Users</h1>
          <p className="text-gray-400">Manage dashboard access and permissions</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium hover:scale-105 transition-all">
          <i className="ph ph-plus-circle"></i> Add User
        </button>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/30 border-b border-brand-border">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Username</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 text-white">#{user.id}</td>
                <td className="px-6 py-4 text-white font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {user.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 新增用户的弹窗 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-surface border border-brand-border p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Create Admin User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Username</label>
                <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Password</label>
                <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-lg border border-brand-border text-white hover:bg-gray-800">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-lg bg-brand-primary text-white font-medium">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}