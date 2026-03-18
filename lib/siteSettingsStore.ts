import { create } from 'zustand';

export interface SiteSettings {
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

interface SettingsStore {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  fetchSettings: () => Promise<void>;
}

export const useSiteSettings = create<SettingsStore>((set) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
  fetchSettings: async () => {
    try {
      const res = await fetch('/api/site-settings');
      const data = await res.json();
      set({ settings: data[0] || {} });
    } catch (error) {
      console.error('Failed to fetch site settings:', error);
    }
  },
}));
