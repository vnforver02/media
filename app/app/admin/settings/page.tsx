'use client';

import { useState } from 'react';

interface SiteSettings {
  siteName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  whatsapp: string;
  zalo: string;
  foundedYear: number;
  companyIntro: string;
  defaultLanguage: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  socialLinks: {
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
  };
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Media Today',
    companyEmail: 'hello@mediatoday.com.vn',
    companyPhone: '+84 (0) 123 456 789',
    companyAddress: 'District 1, Ho Chi Minh City, Vietnam',
    whatsapp: '+84 XXX XXX XXX',
    zalo: '+84 XXX XXX XXX',
    foundedYear: 2016,
    companyIntro:
      'A modern digital marketing and technology agency. We combine data-driven ad buying, AI automation, and technical development to scale brands locally and globally.',
    defaultLanguage: 'vi',
    seoDefaultTitle: 'Media Today - Digital Marketing & AI Solutions',
    seoDefaultDescription:
      'Full-stack growth agency specializing in Meta Ads, Google Ads, TikTok, Web Development, and AI automation.',
    socialLinks: {
      facebook: 'https://facebook.com/mediatoday',
      tiktok: 'https://tiktok.com/@mediatoday',
      linkedin: 'https://linkedin.com/company/mediatoday',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveMessage('Settings saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Site Settings</h1>
        <p className="text-gray-400">Configure global website and company information</p>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3">
          <i className="ph ph-check-circle text-lg"></i>
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
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
                  value={settings.siteName}
                  onChange={e => handleChange('siteName', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Founded Year</label>
                <input
                  type="number"
                  value={settings.foundedYear}
                  onChange={e => handleChange('foundedYear', parseInt(e.target.value))}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Introduction</label>
                <textarea
                  value={settings.companyIntro}
                  onChange={e => handleChange('companyIntro', e.target.value)}
                  rows={4}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Language</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={e => handleChange('defaultLanguage', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                >
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                  <option value="zh-cn">Simplified Chinese</option>
                  <option value="zh-tw">Traditional Chinese</option>
                </select>
              </div>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={settings.companyEmail}
                  onChange={e => handleChange('companyEmail', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.companyPhone}
                  onChange={e => handleChange('companyPhone', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    value={settings.whatsapp}
                    onChange={e => handleChange('whatsapp', e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Zalo</label>
                  <input
                    type="tel"
                    value={settings.zalo}
                    onChange={e => handleChange('zalo', e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={settings.companyAddress}
                  onChange={e => handleChange('companyAddress', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-magnifying-glass text-yellow-500"></i>
              SEO Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Meta Title</label>
                <input
                  type="text"
                  value={settings.seoDefaultTitle}
                  onChange={e => handleChange('seoDefaultTitle', e.target.value)}
                  maxLength={60}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seoDefaultTitle.length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Meta Description</label>
                <textarea
                  value={settings.seoDefaultDescription}
                  onChange={e => handleChange('seoDefaultDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seoDefaultDescription.length}/160</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="ph ph-share-network text-blue-500"></i>
              Social Media Links
            </h3>

            <div className="space-y-6">
              {[
                { platform: 'facebook', label: 'Facebook', icon: 'ph-facebook-logo' },
                { platform: 'tiktok', label: 'TikTok', icon: 'ph-tiktok-logo' },
                { platform: 'linkedin', label: 'LinkedIn', icon: 'ph-linkedin-logo' },
              ].map(social => (
                <div key={social.platform}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <i className={`ph ${social.icon}`}></i>
                    {social.label}
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks[social.platform as keyof typeof settings.socialLinks] || ''}
                    onChange={e => handleSocialChange(social.platform, e.target.value)}
                    placeholder={`https://${social.platform}.com/mediatoday`}
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 rounded-lg bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-spinner animate-spin"></i>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="ph ph-check-circle"></i>
                Save All Changes
              </span>
            )}
          </button>

          {/* Information Card */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <i className="ph ph-info text-blue-400"></i>
              Settings Tips
            </h4>
            <ul className="text-xs text-blue-300/80 space-y-2">
              <li>• Changes apply to all language versions</li>
              <li>• Use SEO-friendly titles and descriptions</li>
              <li>• Keep company info up to date</li>
              <li>• Verify all contact details before saving</li>
            </ul>
          </div>

          {/* Preview Card */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h4 className="font-bold text-white mb-4">Live Preview</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Site Name</p>
                <p className="text-sm font-medium text-white">{settings.siteName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Founded</p>
                <p className="text-sm font-medium text-white">{settings.foundedYear}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <a href={`mailto:${settings.companyEmail}`} className="text-sm text-brand-primary hover:underline">
                  {settings.companyEmail}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <a href={`tel:${settings.companyPhone}`} className="text-sm text-gray-300">
                  {settings.companyPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
