'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

interface SiteSettings {
  company_email?: string;
  company_phone?: string;
  company_phone_whatsapp?: string;
}

export default function HomePage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    setMounted(true);
    
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings?t=' + Date.now()); // 防止缓存
        const data = await res.json();
        console.log('[Home Page] Fetched site settings:', data);
        setSettings(data[0] || {});
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    
    fetchSettings();
    
    // 自动刷新：每 5 秒检查一次新数据
    const interval = setInterval(() => {
      console.log('[Home Page] Auto-refreshing site settings...');
      fetchSettings();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const t = translations[language as Language] || translations.en;

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
                <button onClick={() => router.push('/')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full">{t.nav.home}</button>
                <button onClick={() => router.push('/about-us')} className="text-gray-400 hover:text-white transition-colors">{t.nav.about}</button>
                <button onClick={() => router.push('/services')} className="text-gray-400 hover:text-white transition-colors">{t.nav.services}</button>
                <button onClick={() => router.push('/case-studies')} className="text-gray-400 hover:text-white transition-colors">{t.nav.caseStudies}</button>
                <button onClick={() => router.push('/careers')} className="text-gray-400 hover:text-white transition-colors">{t.nav.careers}</button>
                <button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</button>
                <a href="/database" className="text-gray-400 hover:text-white transition-colors" download>Database</a>
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
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40">
            {/* Subtle background elements */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-primary/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Content */}
                <div className="flex flex-col items-start space-y-8 z-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-brand-cyan backdrop-blur-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                            Performance Marketing
                        </span>
                        <span className="px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-gray-300 backdrop-blur-sm">
                            AI Solutions
                        </span>
                        <span className="px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-gray-300 backdrop-blur-sm">
                            Web Dev
                        </span>
                    </div>
                    
                    <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white">
                        Accelerate Growth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-accent">Data & AI.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                        We build scalable growth systems for modern businesses. Integrating digital marketing, custom SaaS, and creative strategy to dominate the Vietnamese market & beyond.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={() => router.push('/services')} className="px-8 py-4 rounded-full bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                            Explore Services
                            <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                        <button onClick={() => router.push('/contact')} className="px-8 py-4 rounded-full bg-brand-surface border border-brand-border text-white font-medium hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            Contact Us
                        </button>
                    </div>
                </div>

                {/* Right Visual: Abstract Dashboard */}
                <div className="relative w-full aspect-[4/3] lg:aspect-square flex justify-center items-center perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent rounded-full blur-[80px]"></div>
                    
                    {/* Main Card */}
                    <div className="relative w-full max-w-md bg-brand-surface/80 backdrop-blur-xl border border-brand-border rounded-2xl p-6 shadow-2xl z-20 animate-float shadow-black/50">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-gradient p-[1px]">
                                    <div className="w-full h-full bg-brand-surface rounded-full flex items-center justify-center">
                                        <i className="ph-fill ph-rocket-launch text-brand-primary"></i>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Campaign ROAS</p>
                                    <p className="text-xs text-green-400">+342.5% this month</p>
                                </div>
                            </div>
                            <i className="ph ph-dots-three text-gray-500"></i>
                        </div>
                        
                        {/* Chart Abstraction */}
                        <div className="h-32 flex items-end gap-2 mb-6">
                            <div className="w-1/6 bg-brand-primary/20 hover:bg-brand-primary/40 rounded-t-sm h-1/4 transition-colors relative group"><div className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs bg-black px-2 py-1 rounded text-white transition-opacity">Q1</div></div>
                            <div className="w-1/6 bg-brand-primary/40 hover:bg-brand-primary/60 rounded-t-sm h-2/4 transition-colors"></div>
                            <div className="w-1/6 bg-brand-cyan/50 hover:bg-brand-cyan/70 rounded-t-sm h-1/2 transition-colors"></div>
                            <div className="w-1/6 bg-brand-cyan/70 hover:bg-brand-cyan/90 rounded-t-sm h-3/4 transition-colors"></div>
                            <div className="w-1/6 bg-brand-gradient rounded-t-sm h-full relative group">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                            </div>
                        </div>

                        {/* Mini metrics */}
                        <div className="grid grid-cols-2 gap-4 border-t border-brand-border pt-4">
                            <div>
                                <p className="text-xs text-gray-500">Conversions</p>
                                <p className="text-lg font-bold text-white">12,408</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">CPA</p>
                                <p className="text-lg font-bold text-white">$2.40</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 1 */}
                    <div className="absolute -right-8 top-1/4 w-48 bg-black/60 backdrop-blur-md border border-brand-border rounded-xl p-4 shadow-xl z-30 transform translate-z-10 animate-float" style={{ animationDelay: '1s' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <i className="ph-fill ph-robot text-brand-accent text-xl"></i>
                            <span className="text-sm font-medium text-white">AI Optimization</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-accent w-[85%]"></div>
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="absolute -left-6 bottom-1/4 w-56 bg-brand-surface/90 backdrop-blur-md border border-brand-border rounded-xl p-4 shadow-xl z-10 transform -translate-z-10 animate-float" style={{ animationDelay: '2s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 flex items-center justify-center">
                                <i className="ph-fill ph-facebook-logo text-[#1877F2]"></i>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Ads Active</p>
                                <p className="text-xs text-gray-400">Scale stage</p>
                            </div>
                            <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 2. Brand Trust Section */}
        <section className="border-y border-brand-border bg-black/50 py-10">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-medium text-gray-500 mb-8 tracking-widest uppercase">Trusted by ambitious brands across APAC</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Stylized Text as Placeholders for Logos */}
                    <div className="font-display font-bold text-xl md:text-2xl text-white">NEXUS<span className="text-brand-primary">.</span></div>
                    <div className="font-display font-bold text-xl md:text-2xl text-white tracking-tighter">AcmeCorp</div>
                    <div className="font-display font-black text-xl md:text-2xl text-white italic">Velocity</div>
                    <div className="font-display font-medium text-xl md:text-2xl text-white flex items-center gap-1"><i className="ph-fill ph-hexagon"></i> Zenith</div>
                    <div className="font-display font-bold text-xl md:text-2xl text-white tracking-widest">AURA</div>
                </div>
            </div>
        </section>

        {/* 3. Core Services */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">Full-Stack Growth <span className="text-brand-primary">Engine</span></h2>
                <p className="text-gray-400 text-lg">We don't just run ads. We build comprehensive ecosystems that combine traffic generation, conversion architecture, and AI automation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Service Card 1 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-brand-primary/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <i className="ph ph-facebook-logo text-2xl text-[#1877F2]"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Meta Ads Architecture</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Advanced audience structuring, dynamic creative testing, and machine-learning-friendly campaign setups for maximum ROAS.</p>
                    <button className="text-brand-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                {/* Service Card 2 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-red-500/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                        <i className="ph ph-google-logo text-2xl text-[#EA4335]"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Google Performance Max</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Intent-based search campaigns, high-converting shopping feeds, and full-funnel PMax strategies to capture high-value demand.</p>
                    <button className="text-brand-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                {/* Service Card 3 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-brand-cyan/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                        <i className="ph ph-tiktok-logo text-2xl text-white"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">TikTok Shop & Growth</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Viral content creation strategies, influencer seeding, and aggressive TikTok ad scaling for modern D2C and e-commerce brands.</p>
                    <button className="text-brand-cyan text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                {/* Service Card 4 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-brand-accent/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <i className="ph ph-code text-2xl text-brand-accent"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">High-Converting Web & SaaS</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Custom Next.js websites, blazing fast landing pages, and functional SaaS dashboards designed for maximum user conversion.</p>
                    <button className="text-brand-accent text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                {/* Service Card 5 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                        <i className="ph ph-robot text-2xl text-yellow-500"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">AI Automation Pipelines</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Implementing LLM-powered chatbots, automated lead scoring, and workflow automations to reduce costs and scale operations.</p>
                    <button className="text-yellow-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>

                {/* Service Card 6 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-green-500/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                        <i className="ph ph-chart-line-up text-2xl text-green-500"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Data & Tracking Setup</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Server-side tagging, Google Analytics 4 mastery, Pixel configurations, and robust attribution modeling for accurate ROI.</p>
                    <button className="text-green-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all" onClick={() => router.push('/services')}>
                        Learn more <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>

        {/* 4. Why Choose Us (Bento Grid) */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-10 text-center md:text-left">The Media Today <span className="text-brand-accent">Advantage</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                {/* Large Card */}
                <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-brand-surface to-black border border-brand-border p-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-glow-mesh opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-auto border border-white/10">
                            <i className="ph ph-target text-3xl text-brand-primary"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Performance-Driven Mentality</h3>
                        <p className="text-gray-400 text-lg max-w-md">We don't care about vanity metrics. Our entire architecture is built around driving actual revenue, reducing CAC, and scaling your bottom line. Period.</p>
                    </div>
                </div>

                {/* Small Card 1 */}
                <div className="rounded-3xl bg-brand-surface border border-brand-border p-8 relative overflow-hidden">
                    <i className="ph ph-map-pin-line text-3xl text-brand-cyan mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Local Mastery</h3>
                    <p className="text-gray-400 text-sm">Deep understanding of Vietnamese consumer behavior combined with international standards.</p>
                </div>

                {/* Small Card 2 */}
                <div className="rounded-3xl bg-brand-surface border border-brand-border p-8 relative overflow-hidden">
                    <i className="ph ph-lightning text-3xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Agile Execution</h3>
                    <p className="text-gray-400 text-sm">Speed matters. We test rapidly, kill losers instantly, and scale winners aggressively.</p>
                </div>

                {/* Wide Card */}
                <div className="md:col-span-3 rounded-3xl bg-gradient-to-r from-brand-accent/20 to-brand-primary/10 border border-brand-border p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Tech meets Creative</h3>
                        <p className="text-gray-400 max-w-xl">We are the rare breed of agency that writes clean Next.js code while producing high-converting TikTok UGC. Both brains in one team.</p>
                    </div>
                    <button className="shrink-0 px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform" onClick={() => router.push('/contact')}>
                        Work With Us
                    </button>
                </div>
            </div>
        </section>

        {/* 5. Data Metrics Section */}
        <section className="border-y border-brand-border bg-black/30 py-20 my-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-[100px]"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">100+</div>
                        <div className="text-sm text-gray-400 font-medium">Campaigns Scaled</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">$50M+</div>
                        <div className="text-sm text-gray-400 font-medium">Ad Spend Managed</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">50+</div>
                        <div className="text-sm text-gray-400 font-medium">Brand Partners</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">1 Team</div>
                        <div className="text-sm text-brand-primary font-medium">Strategy + Tech + Creative</div>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. Solutions by Business Type */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Tailored Solutions</h2>
                    <p className="text-gray-400">One size fits nobody. We deploy specific growth playbooks based on your industry dynamics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Sol 1 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-storefront text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">E-commerce & D2C</h4>
                    <p className="text-sm text-gray-400 mb-4">Scaling ROAS through catalog ads, retention emails, and TikTok Shop optimization.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
                {/* Sol 2 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-stethoscope text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">Clinics & Beauty</h4>
                    <p className="text-sm text-gray-400 mb-4">Lead generation via local SEO, conversion-optimized landing pages, and appointment booking funnels.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
                {/* Sol 3 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-student text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">Education & Training</h4>
                    <p className="text-sm text-gray-400 mb-4">High-quality lead volume generation via Meta & Google search for enrollments.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
                {/* Sol 4 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-buildings text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">Real Estate & Interior</h4>
                    <p className="text-sm text-gray-400 mb-4">Premium visual content strategy and highly targeted lead acquisition for high-ticket sales.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
                {/* Sol 5 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-rocket text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">SaaS & Startups</h4>
                    <p className="text-sm text-gray-400 mb-4">B2B LinkedIn ads, PLG dashboards, technical SEO, and conversion rate optimization.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
                {/* Sol 6 */}
                <div className="group bg-brand-surface border border-brand-border rounded-xl p-6 hover:bg-gray-800 transition-colors">
                    <i className="ph ph-globe-hemisphere-east text-2xl text-white mb-4"></i>
                    <h4 className="text-lg font-bold text-white mb-2">Cross-Border Brands</h4>
                    <p className="text-sm text-gray-400 mb-4">Localization strategy, regional setup, and international ad scaling across APAC.</p>
                    <a href="#" className="text-xs text-brand-primary font-medium uppercase tracking-wider group-hover:underline">Explore <i className="ph-bold ph-arrow-right inline"></i></a>
                </div>
            </div>
        </section>

        {/* 7. Case Studies */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-brand-border/50">
            <div className="flex justify-between items-center mb-12">
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white">Proven Results</h2>
                <button className="hidden md:flex items-center gap-2 text-white hover:text-brand-primary transition-colors font-medium" onClick={() => router.push('/case-studies')}>
                    View all cases <i className="ph-bold ph-arrow-right"></i>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Case 1 */}
                <div className="group cursor-pointer" onClick={() => router.push('/case-studies')}>
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 mb-6 relative">
                        {/* Using a tech/business unsplash image */}
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Dashboard" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">E-commerce</div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">Scaling a Local Fashion Brand</h3>
                            <p className="text-gray-400 text-sm">Meta Ads • Shopify Dev • CRO</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">+450%</div>
                            <div className="text-xs text-gray-500 uppercase font-medium">ROAS</div>
                        </div>
                    </div>
                </div>

                {/* Case 2 */}
                <div className="group cursor-pointer" onClick={() => router.push('/case-studies')}>
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 mb-6 relative">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Analytics" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">SaaS / B2B</div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">B2B Lead Gen Automation</h3>
                            <p className="text-gray-400 text-sm">Google Ads • AI Chatbot • Webflow</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">-60%</div>
                            <div className="text-xs text-gray-500 uppercase font-medium">Cost per Lead</div>
                        </div>
                    </div>
                </div>

                {/* Case 3 */}
                <div className="group cursor-pointer hidden lg:block" onClick={() => router.push('/case-studies')}>
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 mb-6 relative">
                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" alt="Social Media" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">Retail</div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">Omnichannel Launch Strategy</h3>
                            <p className="text-gray-400 text-sm">TikTok Shop • Creative Direction</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">10k+</div>
                            <div className="text-xs text-gray-500 uppercase font-medium">Monthly Orders</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button className="w-full md:hidden mt-8 py-4 border border-brand-border rounded-xl text-white font-medium hover:bg-gray-900 transition-colors" onClick={() => router.push('/case-studies')}>
                View all cases
            </button>
        </section>

        {/* 8. How We Work (Workflow) */}
        <section className="bg-[#0A0A0A] border-y border-brand-border/50 py-24 relative overflow-hidden">
            {/* Subtle lines pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">Our Growth Protocol</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">A systematic, engineering-like approach to marketing. No guesswork, just data-driven execution.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative">
                    {/* Desktop Connecting Line */}
                    <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>

                    {/* Step 1 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-primary flex items-center justify-center text-brand-primary font-bold font-display mx-auto mb-6 relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">01</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full hover:-translate-y-1 transition-transform">
                            <h4 className="text-white font-bold mb-2">Discovery & Audit</h4>
                            <p className="text-sm text-gray-400">Deep dive into your analytics, current pixel data, competitors, and unit economics.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-cyan flex items-center justify-center text-brand-cyan font-bold font-display mx-auto mb-6 relative z-10">02</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full hover:-translate-y-1 transition-transform">
                            <h4 className="text-white font-bold mb-2">Strategy Architecture</h4>
                            <p className="text-sm text-gray-400">Mapping the full funnel: media buying plan, creative angles, and tech stack setup.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-accent flex items-center justify-center text-brand-accent font-bold font-display mx-auto mb-6 relative z-10">03</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full hover:-translate-y-1 transition-transform">
                            <h4 className="text-white font-bold mb-2">Launch & Execute</h4>
                            <p className="text-sm text-gray-400">Deploying tracking tags, developing web assets, and pushing campaigns live.</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-yellow-500 flex items-center justify-center text-yellow-500 font-bold font-display mx-auto mb-6 relative z-10">04</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full hover:-translate-y-1 transition-transform">
                            <h4 className="text-white font-bold mb-2">Optimize & AI Tuning</h4>
                            <p className="text-sm text-gray-400">Daily management, split testing creatives, and leveraging algorithms to cut wasted spend.</p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold font-display mx-auto mb-6 relative z-10 shadow-lg shadow-brand-primary/20">05</div>
                        <div className="bg-brand-gradient p-[1px] rounded-xl h-full hover:-translate-y-1 transition-transform">
                            <div className="bg-brand-surface rounded-xl p-6 text-center h-full">
                                <h4 className="text-white font-bold mb-2">Scale Vertically</h4>
                                <p className="text-sm text-gray-400">Once ROI is proven, we inject budget, expand channels, and dominate market share.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 9. Testimonials */}
        <section className="max-w-7xl mx-auto px-6 py-24">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12 text-center">Client Feedback</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quote 1 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 flex flex-col">
                    <div className="flex gap-1 text-yellow-500 mb-6">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-300 mb-8 flex-1 italic text-lg leading-relaxed">"Media Today entirely restructured our Google and Meta accounts. Not only did our CPA drop by 40% in month two, but the new Next.js landing page they built doubled our conversion rate."</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">David Tran</h4>
                            <p className="text-sm text-gray-500">CEO, TechEdu Vietnam</p>
                        </div>
                    </div>
                </div>

                {/* Quote 2 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -z-0"></div>
                    <div className="flex gap-1 text-yellow-500 mb-6 relative z-10">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-300 mb-8 flex-1 italic text-lg leading-relaxed relative z-10">"Most agencies just push buttons. This team actually understands business models. They integrated an AI CRM for our clinic network that automatically qualifies leads from ads. Absolute game changer."</p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Sarah Nguyen</h4>
                            <p className="text-sm text-gray-500">Founder, Aura Aesthetics</p>
                        </div>
                    </div>
                </div>

                {/* Quote 3 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 flex flex-col">
                    <div className="flex gap-1 text-yellow-500 mb-6">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-300 mb-8 flex-1 italic text-lg leading-relaxed">"Scaling our D2C brand on TikTok was tough until Media Today took over. Their combination of viral creative direction and aggressive ad buying scaled our daily orders 5x within 3 months."</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Marcus Le</h4>
                            <p className="text-sm text-gray-500">CMO, UrbanFit</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 10. FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
                <h2 className="font-display font-bold text-3xl text-white mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
                {/* FAQ Item 1 */}
                <details className="group bg-brand-surface border border-brand-border rounded-xl">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-brand-primary transition-colors">
                        <span>What specific services does Media Today provide?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">
                            <i className="ph-bold ph-caret-down"></i>
                        </span>
                    </summary>
                    <div className="text-gray-400 mt-2 px-6 pb-6 text-sm leading-relaxed">
                        We provide end-to-end digital growth services. This includes Performance Marketing (Meta, Google, TikTok Ads), Custom Web/Landing Page Development (Next.js/React), AI Solutions (Automations, Bots), and Data Analytics & Conversion Rate Optimization (CRO).
                    </div>
                </details>

                {/* FAQ Item 2 */}
                <details className="group bg-brand-surface border border-brand-border rounded-xl">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-brand-primary transition-colors">
                        <span>Do you only work with companies in Vietnam?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">
                            <i className="ph-bold ph-caret-down"></i>
                        </span>
                    </summary>
                    <div className="text-gray-400 mt-2 px-6 pb-6 text-sm leading-relaxed">
                        No. While we have deep expertise and a strong footprint in the Vietnamese local market, we regularly partner with international brands looking to enter APAC, as well as global D2C and SaaS companies seeking high-performance agency partners.
                    </div>
                </details>

                {/* FAQ Item 3 */}
                <details className="group bg-brand-surface border border-brand-border rounded-xl">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-brand-primary transition-colors">
                        <span>Can I hire you just for website development without ads?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">
                            <i className="ph-bold ph-caret-down"></i>
                        </span>
                    </summary>
                    <div className="text-gray-400 mt-2 px-6 pb-6 text-sm leading-relaxed">
                        Absolutely. While our integrated approach yields the best results, our Tech division operates independently and can build standalone custom SaaS platforms, corporate websites, or high-converting landing pages for your business.
                    </div>
                </details>

                {/* FAQ Item 4 */}
                <details className="group bg-brand-surface border border-brand-border rounded-xl">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-brand-primary transition-colors">
                        <span>How do we start a partnership?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">
                            <i className="ph-bold ph-caret-down"></i>
                        </span>
                    </summary>
                    <div className="text-gray-400 mt-2 px-6 pb-6 text-sm leading-relaxed">
                        The first step is a Discovery Call. We will assess your current business metrics, goals, and bottlenecks. If we are a mutual fit, our team will design a custom Growth Proposal and execute it within an agreed timeline.
                    </div>
                </details>
            </div>
        </section>

        {/* 11. Final CTA */}
        <section className="py-24 px-6 relative overflow-hidden">
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

    {/* 12. Footer */}
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
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-primary transition-colors">Meta Ads Growth</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-red-400 transition-colors">Google PMax</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-cyan transition-colors">TikTok Commerce</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-accent transition-colors">Web & SaaS Dev</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-yellow-400 transition-colors">AI Automation</button></li>
                    </ul>
                </div>

                {/* Contact Col */}
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Get in Touch</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <i className="ph ph-map-pin-line text-lg text-brand-primary shrink-0"></i>
                            <span>District 1, Ho Chi Minh City,<br />Vietnam</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="ph ph-envelope-simple text-lg text-brand-primary shrink-0"></i>
                            <a href="mailto:hello@mediatoday.com.vn" className="hover:text-white transition-colors">hello@mediatoday.com.vn</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="ph ph-phone text-lg text-brand-primary shrink-0"></i>
                            <a href={`tel:${(settings.company_phone || '+84 (0) 123 456 789').replace(/[^\\d+]/g, '')}`} className="hover:text-white transition-colors">{settings.company_phone || '+84 (0) 123 456 789'}</a>
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
