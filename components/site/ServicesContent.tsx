'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

interface Service {
  id: number;
  slug: string;
  icon: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  description_en: string;
  description_vi: string;
  description_zh_cn: string;
  description_zh_tw: string;
  full_description_en: string;
  full_description_vi: string;
  full_description_zh_cn: string;
  full_description_zh_tw: string;
  ideal_for_en?: string;
  ideal_for_vi?: string;
  ideal_for_zh_cn?: string;
  ideal_for_zh_tw?: string;
  what_we_deliver_en?: string;
  what_we_deliver_vi?: string;
  what_we_deliver_zh_cn?: string;
  what_we_deliver_zh_tw?: string;
  is_published: boolean;
  featured: boolean;
}

interface SiteSettings {
  company_email?: string;
  company_phone?: string;
  company_phone_whatsapp?: string;
}

export default function ServicesContent() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    setMounted(true);
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings');
        const data = await res.json();
        setSettings(data[0] || {});
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchServices();
      
      // 自动刷新：每 5 秒检查一次新数据
      const interval = setInterval(() => {
        console.log('[Services Page] Auto-refreshing services data...');
        fetchServices();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [mounted]);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?t=' + Date.now()); // 防止缓存
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      console.log('[Services Page] Fetched services:', data);
      setServices(Array.isArray(data) ? data.filter((s: Service) => s.is_published) : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const t = translations[language as Language] || translations.en;

  const getField = (service: Service, field: string) => {
    const langSuffix = language === 'vi' ? 'vi' : language === 'zh_cn' ? 'zh_cn' : language === 'zh_tw' ? 'zh_tw' : 'en';
    const key = `${field}_${langSuffix}`;
    return service[key as keyof Service] || service[`${field}_en` as keyof Service] || '';
  };

  const parseItems = (text: string): string[] => {
    if (!text) return [];
    return text.split('\n').filter((i: string) => i.trim());
  };

  return (
    <>
      <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-brand-primary selection:text-white relative">
        <div className="noise"></div>
        <div className="fixed inset-0 bg-glow-mesh pointer-events-none z-[-1]"></div>

        {/* Navigation Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border transition-all">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <i className="ph-bold ph-trend-up text-white text-xl"></i>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Media Today</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
              <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</button>
              <button onClick={() => router.push('/about-us')} className="text-gray-400 hover:text-white transition-colors">{t.nav.about}</button>
              <button onClick={() => router.push('/services')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full transition-colors">{t.nav.services}</button>
              <button onClick={() => router.push('/case-studies')} className="text-gray-400 hover:text-white transition-colors">{t.nav.caseStudies}</button>
              <button onClick={() => router.push('/careers')} className="text-gray-400 hover:text-white transition-colors">{t.nav.careers}</button>
              <button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</button>
            </nav>

            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-300 hover:text-white">
              <i className="ph ph-list text-2xl"></i>
            </button>
          </div>
        </header>

        <main className="pt-20">
          {/* 1. Hero Section */}
          <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-32 text-center">
            {/* Subtle background element */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-brand-cyan backdrop-blur-sm mb-8">
              <i className="ph-fill ph-stack"></i> Comprehensive Capabilities
            </div>
            
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Service Stack.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-16 max-w-2xl mx-auto">
              We don't offer generic packages. We deploy highly specialized services that interlock perfectly to form an unbreakable revenue engine for your business.
            </p>

            {/* Service Anchor Links (Pills) */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto relative z-10">
              <a href="#meta-ads" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-brand-primary/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-facebook-logo text-[#1877F2]"></i> Meta Ads
              </a>
              <a href="#google-ads" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-red-500/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-google-logo text-[#EA4335]"></i> Google Ads
              </a>
              <a href="#tiktok-ads" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-white/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-tiktok-logo text-white"></i> TikTok Ads
              </a>
              <a href="#web-dev" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-brand-accent/50 transition-all flex items-center gap-2">
                <i className="ph-bold ph-code text-brand-accent"></i> Web Development
              </a>
              <a href="#ai-tools" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-yellow-500/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-robot text-yellow-500"></i> AI Tools
              </a>
              <a href="#ecom-growth" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-brand-cyan/50 transition-all flex items-center gap-2">
                <i className="ph-bold ph-shopping-cart text-brand-cyan"></i> E-commerce
              </a>
              <a href="#analytics" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-green-500/50 transition-all flex items-center gap-2">
                <i className="ph-bold ph-chart-line-up text-green-500"></i> Analytics
              </a>
              <a href="#branding" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-orange-500/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-paint-brush text-orange-500"></i> Branding
              </a>
              <a href="#china-market" className="px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-sm font-medium hover:bg-white/5 hover:border-red-500/50 transition-all flex items-center gap-2">
                <i className="ph-fill ph-globe text-red-600"></i> China Market Expansion
              </a>
            </div>
          </section>

          {/* Services Details Container */}
          <div className="max-w-7xl mx-auto px-6">
            
            {/* 1. Meta Ads Architecture - FROM DATABASE */}
            {services.find(s => s.slug === 'meta-ads') ? (
              (() => {
                const service = services.find(s => s.slug === 'meta-ads')!;
                const title = getField(service, 'title');
                const description = getField(service, 'description');
                const fullDescription = getField(service, 'full_description');
                const idealFor = getField(service, 'ideal_for');
                const whatWeDeliver = getField(service, 'what_we_deliver');
                
                const idealForItems = parseItems(idealFor);
                const whatWeDeliverItems = parseItems(whatWeDeliver);
                
                return (
                  <section id="meta-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                      {/* Left */}
                      <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(24,119,242,0.1)]">
                            <i className="ph-fill ph-facebook-logo text-3xl text-[#1877F2]"></i>
                          </div>
                          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{title}</h2>
                          <p className="text-gray-400 text-lg mb-8 leading-relaxed">{description}</p>
                          <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2 w-fit">
                            Consult on {title} <i className="ph-bold ph-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                      {/* Right */}
                      <div className="lg:col-span-7">
                        {/* IDEAL FOR Section */}
                        {idealForItems.length > 0 && (
                          <div className="mb-12">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">IDEAL FOR</h3>
                            <div className="flex flex-wrap gap-3">
                              {idealForItems.map((item, idx) => (
                                <div key={idx} className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
                                  {item.trim()}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* WHAT WE DELIVER Section */}
                        {whatWeDeliverItems.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">WHAT WE DELIVER</h3>
                            <div className="grid grid-cols-2 gap-6">
                              {whatWeDeliverItems.map((item, idx) => {
                                const parts = item.split(' - ');
                                const itemTitle = parts[0]?.trim() || '';
                                const itemDesc = parts[1]?.trim() || '';
                                return (
                                  <div key={idx} className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-blue-500/50 transition-colors">
                                    <div className="flex items-start gap-3 mb-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                        <i className="ph-fill ph-check-circle text-blue-500 text-lg"></i>
                                      </div>
                                      <h4 className="font-bold text-white text-sm">{itemTitle}</h4>
                                    </div>
                                    {itemDesc && <p className="text-gray-400 text-sm ml-7">{itemDesc}</p>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Full Description if available */}
                        {fullDescription && (
                          <div className="mt-12 space-y-8 text-gray-400 prose prose-invert max-w-none text-sm leading-relaxed border-t border-brand-border/30 pt-8">
                            {fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                              <p key={idx} className="mb-6">{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })()
            ) : (
              /* Fallback to demo content */
              <section id="meta-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-5 relative">
                    <div className="sticky top-32">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(24,119,242,0.1)]">
                        <i className="ph-fill ph-facebook-logo text-3xl text-[#1877F2]"></i>
                      </div>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Meta Ads Architecture</h2>
                      <p className="text-gray-400 text-lg mb-8 leading-relaxed">We structure ad accounts built for machine learning. Moving away from manual tweaking to dynamic creative testing and broad audience scaling on Facebook and Instagram.</p>
                      <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2 w-fit">
                        Consult on Meta Ads <i className="ph-bold ph-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-blue-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-layout text-xl text-blue-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Account Restructuring</h4>
                        <p className="text-gray-400 text-sm">Consolidating campaigns to test algorithms faster and cut learning phase.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-blue-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-test-tube text-xl text-blue-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Creative Testing Protocol</h4>
                        <p className="text-gray-400 text-sm">Systematic testing of hooks, formats, and copy to find statistical winners.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-blue-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-api text-xl text-blue-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">CAPI Integration</h4>
                        <p className="text-gray-400 text-sm">Flawless Conversion API setup to counter iOS updates and restore data visibility.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-blue-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-chart-bar text-xl text-blue-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Scaling Mechanics</h4>
                        <p className="text-gray-400 text-sm">Vertical and horizontal budget scaling rules without breaking ROI.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 2. Google Ads - FROM DATABASE */}
            {services.find(s => s.slug === 'google-ads') ? (
              (() => {
                const service = services.find(s => s.slug === 'google-ads')!;
                const title = getField(service, 'title');
                const description = getField(service, 'description');
                const fullDescription = getField(service, 'full_description');
                const idealFor = getField(service, 'ideal_for');
                const whatWeDeliver = getField(service, 'what_we_deliver');
                
                const idealForItems = parseItems(idealFor);
                const whatWeDeliverItems = parseItems(whatWeDeliver);
                
                return (
                  <section id="google-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                      <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(234,67,53,0.1)]">
                            <i className="ph-fill ph-google-logo text-3xl text-[#EA4335]"></i>
                          </div>
                          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{title}</h2>
                          <p className="text-gray-400 text-lg mb-8 leading-relaxed">{description}</p>
                          <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-red-600 hover:border-red-600 transition-all flex items-center gap-2 w-fit">
                            Consult on {title} <i className="ph-bold ph-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7">
                        {idealForItems.length > 0 && (
                          <div className="mb-12">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">IDEAL FOR</h3>
                            <div className="flex flex-wrap gap-3">
                              {idealForItems.map((item, idx) => (
                                <div key={idx} className="px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium">
                                  {item.trim()}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {whatWeDeliverItems.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">WHAT WE DELIVER</h3>
                            <div className="grid grid-cols-2 gap-6">
                              {whatWeDeliverItems.map((item, idx) => {
                                const parts = item.split(' - ');
                                const itemTitle = parts[0]?.trim() || '';
                                const itemDesc = parts[1]?.trim() || '';
                                return (
                                  <div key={idx} className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-red-500/50 transition-colors">
                                    <div className="flex items-start gap-3 mb-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                        <i className="ph-fill ph-check-circle text-red-500 text-lg"></i>
                                      </div>
                                      <h4 className="font-bold text-white text-sm">{itemTitle}</h4>
                                    </div>
                                    {itemDesc && <p className="text-gray-400 text-sm ml-7">{itemDesc}</p>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {fullDescription && (
                          <div className="mt-12 space-y-8 text-gray-400 prose prose-invert max-w-none text-sm leading-relaxed border-t border-brand-border/30 pt-8">
                            {fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                              <p key={idx} className="mb-6">{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })()
            ) : (
              /* Fallback to demo content */
              <section id="google-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-5 relative">
                    <div className="sticky top-32">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(234,67,53,0.1)]">
                        <i className="ph-fill ph-google-logo text-3xl text-[#EA4335]"></i>
                      </div>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Google Ads & PMax</h2>
                      <p className="text-gray-400 text-lg mb-8 leading-relaxed">We leverage Google's full suite of search and automation tools. Performance Max campaigns powered by machine learning, feed optimization, and audience insights.</p>
                      <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-red-600 hover:border-red-600 transition-all flex items-center gap-2 w-fit">
                        Consult on Google Ads <i className="ph-bold ph-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-red-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-lightning text-xl text-red-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Performance Max Setup</h4>
                        <p className="text-gray-400 text-sm">Omnichannel campaigns optimized for conversions across Search, Display, YouTube, and Gmail.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-red-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-target text-xl text-red-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Audience Targeting</h4>
                        <p className="text-gray-400 text-sm">Custom audiences from your data, customer match, and lookalike modeling.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-red-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-list-checks text-xl text-red-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Feed Optimization</h4>
                        <p className="text-gray-400 text-sm">Structuring product feeds for maximum relevance and performance in Google Ads.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-red-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-chart-line text-xl text-red-400"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Smart Bidding</h4>
                        <p className="text-gray-400 text-sm">Automated bid strategies powered by ML to maximize conversions within your CPA target.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 3. TikTok Ads - FROM DATABASE */}
            {services.find(s => s.slug === 'tiktok-ads') ? (
              (() => {
                const service = services.find(s => s.slug === 'tiktok-ads')!;
                const title = getField(service, 'title');
                const description = getField(service, 'description');
                const fullDescription = getField(service, 'full_description');
                const idealFor = getField(service, 'ideal_for');
                const whatWeDeliver = getField(service, 'what_we_deliver');
                
                const idealForItems = parseItems(idealFor);
                const whatWeDeliverItems = parseItems(whatWeDeliver);
                
                return (
                  <section id="tiktok-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                      <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <i className="ph-fill ph-tiktok-logo text-3xl text-white"></i>
                          </div>
                          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{title}</h2>
                          <p className="text-gray-400 text-lg mb-8 leading-relaxed">{description}</p>
                          <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2 w-fit">
                            Consult on {title} <i className="ph-bold ph-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7">
                        {idealForItems.length > 0 && (
                          <div className="mb-12">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">IDEAL FOR</h3>
                            <div className="flex flex-wrap gap-3">
                              {idealForItems.map((item, idx) => (
                                <div key={idx} className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium">
                                  {item.trim()}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {whatWeDeliverItems.length > 0 && (
                          <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">WHAT WE DELIVER</h3>
                            <div className="grid grid-cols-2 gap-6">
                              {whatWeDeliverItems.map((item, idx) => {
                                const parts = item.split(' - ');
                                const itemTitle = parts[0]?.trim() || '';
                                const itemDesc = parts[1]?.trim() || '';
                                return (
                                  <div key={idx} className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-white/50 transition-colors">
                                    <div className="flex items-start gap-3 mb-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                        <i className="ph-fill ph-check-circle text-white text-lg"></i>
                                      </div>
                                      <h4 className="font-bold text-white text-sm">{itemTitle}</h4>
                                    </div>
                                    {itemDesc && <p className="text-gray-400 text-sm ml-7">{itemDesc}</p>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {fullDescription && (
                          <div className="mt-12 space-y-8 text-gray-400 prose prose-invert max-w-none text-sm leading-relaxed border-t border-brand-border/30 pt-8">
                            {fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                              <p key={idx} className="mb-6">{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })()
            ) : (
              /* Fallback to demo content */
              <section id="tiktok-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-5 relative">
                    <div className="sticky top-32">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <i className="ph-fill ph-tiktok-logo text-3xl text-white"></i>
                      </div>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">TikTok Ads & Commerce</h2>
                      <p className="text-gray-400 text-lg mb-8 leading-relaxed">TikTok's algorithm is the most powerful creator of demand. We manage branded content and direct response campaigns with a focus on viral mechanics and community building.</p>
                      <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2 w-fit">
                        Consult on TikTok Ads <i className="ph-bold ph-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-white/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-sparkle text-xl text-white"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Branded Content</h4>
                        <p className="text-gray-400 text-sm">Creator partnerships and branded hashtag challenges that feel native to TikTok culture.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-white/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-video-camera text-xl text-white"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Direct Response</h4>
                        <p className="text-gray-400 text-sm">Short-form video ads optimized for conversions and impulse purchases on TikTok Shop.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-white/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-users-three text-xl text-white"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">Community Building</h4>
                        <p className="text-gray-400 text-sm">Organic growth hacks and community engagement strategies that drive loyal followers.</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 border border-brand-border/30 hover:border-white/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                          <i className="ph-fill ph-coins text-xl text-white"></i>
                        </div>
                        <h4 className="font-bold text-white mb-2">TikTok Shop Setup</h4>
                        <p className="text-gray-400 text-sm">Integration and optimization of TikTok Shop for seamless commerce experiences.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Additional Services... */}
          </div>

          {/* Final CTA Module (Identical to Home/About) */}
          <section className="py-24 px-6 border-t border-brand-border/50 relative overflow-hidden">
            <div className="max-w-5xl mx-auto bg-brand-gradient rounded-3xl p-1 md:p-1 relative">
              {/* Inner black box */}
              <div className="bg-[#050505] rounded-[22px] p-10 md:p-20 text-center relative overflow-hidden">
                {/* Glow effect behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-brand-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 relative z-10">Let's Build Your Next<br /> Growth Engine.</h2>
                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">Stop wasting ad spend. Start scaling with a tech-enabled agency that understands unit economics.</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                  <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]" onClick={() => router.push('/contact')}>
                    Request a Proposal
                  </button>
                  <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 active:scale-95 transition-all" onClick={() => router.push('/contact')}>
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer (Identical to Home/About) */}
        <footer className="border-t border-brand-border bg-black pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              
              {/* Brand Col */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6" onClick={() => router.push('/')}>
                  <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                    <i className="ph-bold ph-trend-up text-white text-xl"></i>
                  </div>
                  <span className="font-display font-bold text-xl text-white">Media Today</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                  A modern digital marketing and technology agency. We combine data-driven ad buying, AI automation, and technical development to scale brands in Vietnam and beyond.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-colors">
                    <i className="ph-fill ph-facebook-logo text-xl"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                    <i className="ph-fill ph-tiktok-logo text-xl"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors">
                    <i className="ph-fill ph-linkedin-logo text-xl"></i>
                  </a>
                </div>
              </div>

              {/* Links Col */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Company</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><button onClick={() => router.push('/about-us')} className="hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => router.push('/services')} className="hover:text-white transition-colors">Our Services</button></li>
                  <li><button onClick={() => router.push('/case-studies')} className="hover:text-white transition-colors">Case Studies</button></li>
                  <li><button onClick={() => router.push('/careers')} className="hover:text-white transition-colors">Careers</button></li>
                  <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                </ul>
              </div>

              {/* Services Col */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Services</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="#meta-ads" className="hover:text-brand-primary transition-colors">Meta Ads Growth</a></li>
                  <li><a href="#google-ads" className="hover:text-red-400 transition-colors">Google PMax</a></li>
                  <li><a href="#tiktok-ads" className="hover:text-brand-cyan transition-colors">TikTok Commerce</a></li>
                  <li><a href="#web-dev" className="hover:text-brand-accent transition-colors">Web & SaaS Dev</a></li>
                  <li><a href="#ai-tools" className="hover:text-yellow-400 transition-colors">AI Automation</a></li>
                </ul>
              </div>

              {/* Contact Col */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Get in Touch</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <i className="ph ph-map-pin-line text-lg text-brand-primary shrink-0"></i>
                    <span>{settings.address_en || 'District 1, Ho Chi Minh City,<br />Vietnam'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="ph ph-envelope-simple text-lg text-brand-primary shrink-0"></i>
                    <a href={`mailto:${settings.company_email || 'hello@mediatoday.com.vn'}`} className="hover:text-white transition-colors">{settings.company_email || 'hello@mediatoday.com.vn'}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="ph ph-phone text-lg text-brand-primary shrink-0"></i>
                    <a href={`tel:${(settings.company_phone || '+84 (0) 123 456 789').replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">{settings.company_phone || '+84 (0) 123 456 789'}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-brand-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>&copy; 2024 Media Today. All rights reserved. <span className="text-gray-700">| mediatoday.com.vn</span></p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
