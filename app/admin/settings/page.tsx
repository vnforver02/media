'use client';

import { useState, useEffect } from 'react';

interface SiteSettings {
  id?: number;
  site_name?: string;
  logo?: string;
  default_language?: string;
  company_email?: string;
  company_phone?: string;
  company_phone_whatsapp?: string;
  address_en?: string;
  address_vi?: string;
  address_zh_cn?: string;
  address_zh_tw?: string;
  founded_year?: number;
  company_intro_en?: string;
  company_intro_vi?: string;
  company_intro_zh_cn?: string;
  company_intro_zh_tw?: string;
  seo_title_en?: string;
  seo_description_en?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_instagram?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings?t=' + Date.now());
        const data = await res.json();
        console.log('[Admin Settings Page] Fetched from API:', data);
        setSettings(data[0] || {});
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setMessage('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('[Admin Settings Page] Saving:', settings);
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const updated = await res.json();
        console.log('[Admin Settings Page] Saved successfully:', updated);
        setSettings(updated);
        setMessage('✓ Site settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-surface border-t-brand-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Site Settings</h1>
        <p className="text-gray-400">Configure global website and company information</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-gear text-brand-primary"></i>
              General Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site_name || ''}
                  onChange={e => handleChange('site_name', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                <input
                  type="text"
                  value={settings.logo || ''}
                  onChange={e => handleChange('logo', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Founded Year</label>
                <input
                  type="number"
                  value={settings.founded_year || new Date().getFullYear()}
                  onChange={e => handleChange('founded_year', parseInt(e.target.value))}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Language</label>
                <select
                  value={settings.default_language || 'en'}
                  onChange={e => handleChange('default_language', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                >
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                  <option value="zh_cn">Simplified Chinese</option>
                  <option value="zh_tw">Traditional Chinese</option>
                </select>
              </div>
            </div>
          </div>

          {/* Company Info - Multiple Languages */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-buildings text-brand-cyan"></i>
              Company Information
            </h3>

            <div className="space-y-4">
              {['en', 'vi', 'zh_cn', 'zh_tw'].map(lang => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Intro ({lang.toUpperCase()})
                  </label>
                  <textarea
                    value={settings[`company_intro_${lang}` as keyof SiteSettings] || ''}
                    onChange={e => handleChange(`company_intro_${lang}`, e.target.value)}
                    rows={3}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-phone text-brand-cyan"></i>
              Contact Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Email</label>
                <input
                  type="email"
                  value={settings.company_email || ''}
                  onChange={e => handleChange('company_email', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.company_phone || ''}
                  onChange={e => handleChange('company_phone', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  value={settings.company_phone_whatsapp || ''}
                  onChange={e => handleChange('company_phone_whatsapp', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Address - Multiple Languages */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-map-pin text-yellow-500"></i>
              Address
            </h3>

            <div className="space-y-4">
              {['en', 'vi', 'zh_cn', 'zh_tw'].map(lang => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address ({lang.toUpperCase()})
                  </label>
                  <textarea
                    value={settings[`address_${lang}` as keyof SiteSettings] || ''}
                    onChange={e => handleChange(`address_${lang}`, e.target.value)}
                    rows={2}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-magnifying-glass text-yellow-500"></i>
              SEO Settings (English)
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Title</label>
                <input
                  type="text"
                  value={settings.seo_title_en || ''}
                  onChange={e => handleChange('seo_title_en', e.target.value)}
                  maxLength={60}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">{(settings.seo_title_en || '').length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                <textarea
                  value={settings.seo_description_en || ''}
                  onChange={e => handleChange('seo_description_en', e.target.value)}
                  maxLength={160}
                  rows={3}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">{(settings.seo_description_en || '').length}/160</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-share-network text-blue-500"></i>
              Social Media
            </h3>

            <div className="space-y-6">
              {[
                { key: 'social_facebook', label: 'Facebook', icon: 'ph-facebook-logo' },
                { key: 'social_linkedin', label: 'LinkedIn', icon: 'ph-linkedin-logo' },
                { key: 'social_instagram', label: 'Instagram', icon: 'ph-instagram-logo' },
              ].map(social => (
                <div key={social.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <i className={`ph ${social.icon}`}></i>
                    {social.label}
                  </label>
                  <input
                    type="url"
                    value={settings[social.key as keyof SiteSettings] || ''}
                    onChange={e => handleChange(social.key, e.target.value)}
                    placeholder={`https://${social.label.toLowerCase()}.com/yourpage`}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-4 rounded-lg bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-spinner animate-spin"></i>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-check-circle"></i>
                Save Changes
              </span>
            )}
          </button>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <i className="ph ph-info text-blue-400"></i>
              Tips
            </h4>
            <ul className="text-xs text-blue-300/80 space-y-2">
              <li>• All changes save to database</li>
              <li>• SEO settings affect search results</li>
              <li>• Social links appear in footer</li>
              <li>• Contact info on all pages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
