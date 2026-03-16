'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginAdmin({ username, password });

      if (response.success) {
        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <i className="ph-bold ph-trend-up text-white text-2xl"></i>
            </div>
            <span className="font-display font-bold text-2xl text-white">Media Today</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Sign in to manage your content</p>
        </div>

        {/* Login Card */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  <i className={`ph text-lg ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <div className="flex items-start gap-3">
                  <i className="ph ph-warning-circle text-lg shrink-0 mt-0.5"></i>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
              <div className="font-medium mb-1">Demo Credentials</div>
              <div className="text-xs text-blue-300/80">Username: <code>admin</code></div>
              <div className="text-xs text-blue-300/80">Password: <code>demo2024</code></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ph ph-spinner animate-spin"></i>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-brand-border/50 text-center text-xs text-gray-500">
            <p>This is a protected admin area for Media Today team members only.</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 p-6 rounded-xl bg-brand-surface/50 border border-brand-border/50">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <i className="ph ph-info text-brand-primary"></i>
            About This Admin Panel
          </h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <i className="ph ph-check text-green-500 mt-0.5"></i>
              <span>Manage website content across 4 languages</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ph ph-check text-green-500 mt-0.5"></i>
              <span>Update services, jobs, case studies, and more</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ph ph-check text-green-500 mt-0.5"></i>
              <span>Track contact form submissions and leads</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ph ph-check text-green-500 mt-0.5"></i>
              <span>Real-time content synchronization to frontend</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
