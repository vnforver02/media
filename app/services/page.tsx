'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

export default function ServicesPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
            
            {/* 1. Meta Ads */}
            <section id="meta-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left: Sticky Header */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(24,119,242,0.1)]">
                                <i className="ph-fill ph-facebook-logo text-3xl text-[#1877F2]"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Meta Ads Architecture</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                We structure ad accounts built for machine learning. Moving away from manual tweaking to dynamic creative testing and broad audience scaling on Facebook and Instagram.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2 w-fit">
                                Consult on Meta Ads <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    {/* Right: Details */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Target Clients */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">D2C & E-commerce</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Local Lead Gen</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Info-Products</span>
                            </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-blue-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Account Restructuring</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Consolidating campaigns to feed algorithms faster and exit the learning phase.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-blue-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Creative Testing Protocol</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Systematic testing of hooks, formats, and copy to find statistical winners.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-blue-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">CAPI Integration</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Flawless Conversion API setup to counter iOS updates and restore data visibility.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-blue-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Scaling Mechanics</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Vertical and horizontal budget scaling rules without breaking ROI.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Google Ads */}
            <section id="google-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(234,67,53,0.1)]">
                                <i className="ph-fill ph-google-logo text-3xl text-[#EA4335]"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Google Ads & PMax</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Capture high-intent demand. We architect precise search campaigns and deploy highly optimized Performance Max builds to dominate search engine results.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-red-500 hover:border-red-500 transition-all flex items-center gap-2 w-fit">
                                Consult on Google Ads <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">B2B SaaS</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">High-Ticket Services</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">E-commerce Catalogs</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Performance Max Optimization</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Advanced asset grouping, audience signals, and feed structuring for PMax dominance.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Intent Search Architecture</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Ruthless keyword pruning and SKAG/STAG setups tailored to buyer intent.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Competitor Intercept</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Legal, strategic campaigns to capture traffic searching for your direct competitors.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Offline Conversion Tracking</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Feeding qualified lead data from your CRM back to Google's bidding algorithm.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TikTok Ads */}
            <section id="tiktok-ads" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                <i className="ph-fill ph-tiktok-logo text-3xl text-white"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">TikTok Ads & Content</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Stop making ads. Start making TikToks. We handle end-to-end TikTok growth, from creator sourcing and brief writing to aggressive media buying and Shop optimization.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-white hover:text-black transition-all flex items-center gap-2 w-fit">
                                Consult on TikTok <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Modern D2C</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">App Installs</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Viral Physical Products</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-white/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-white text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">TikTok Shop Operations</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Seamless integration and scaling of GMV directly within the platform ecosystem.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-white/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-white text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">UGC Creator Management</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Sourcing native creators, drafting hooks, and managing content delivery pipelines.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-white/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-white text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Spark Ads Scaling</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Boosting high-performing organic content through structured ad campaigns.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-white/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-white text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Trend Velocity Tracking</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Rapidly adapting to weekly audio and format trends to maintain low CPMs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Web & SaaS Development */}
            <section id="web-dev" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                                <i className="ph-bold ph-code text-3xl text-brand-accent"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Web & SaaS Development</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                We write code that converts. Whether it's a blazing-fast Next.js marketing site, a custom internal tool, or a high-converting landing page, our engineering is purely outcome-driven.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-brand-accent hover:border-brand-accent transition-all flex items-center gap-2 w-fit">
                                Discuss Tech Needs <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Funded Startups</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Brands needing CRO</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Corporate Redesigns</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-brand-accent text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Next.js & React Frontends</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Lightning-fast, SEO-optimized web applications with seamless user experiences.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-brand-accent text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Conversion Landing Pages</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Psychology-driven page architecture specifically designed to receive ad traffic.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-brand-accent text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Headless Architecture</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Decoupled systems using modern CMS (Sanity, Strapi) for total content flexibility.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-brand-accent text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Custom Web Apps & Dashboards</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Functional tools and portals with complex logic and database integrations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. AI Tools & Automation */}
            <section id="ai-tools" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                                <i className="ph-fill ph-robot text-3xl text-yellow-500"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">AI Solutions & Automations</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Stop throwing human hours at machine tasks. We integrate LLMs and deep automations into your sales and marketing pipelines to drastically cut operational overhead.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-yellow-500 hover:border-yellow-500 transition-all flex items-center gap-2 w-fit">
                                Automate Workflows <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Lead-Heavy Services</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Clinics & Real Estate</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">B2B Sales Teams</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-yellow-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">AI Lead Qualification</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Chatbots trained on your business data to interact with and score incoming ad leads 24/7.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-yellow-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">CRM Integrations</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Connecting Facebook/Google leads directly into HubSpot, Salesforce, or local Vietnamese CRMs.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-yellow-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Automated Follow-ups</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Multi-channel drip campaigns (Email, SMS, Zalo) triggered by user behavior.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-yellow-500 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Internal Tooling</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Custom scripting (Python/Node) to automate data entry and reporting generation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. E-commerce Growth */}
            <section id="ecom-growth" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                {/* Shortened layout for lower sections to maintain rhythm */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                <i className="ph-bold ph-shopping-cart text-3xl text-brand-cyan"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">E-commerce Strategy</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Beyond just acquiring traffic, we fix leaking funnels. We optimize your store's architecture, implement robust retention strategies, and maximize Customer Lifetime Value (LTV).
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-brand-cyan font-medium hover:bg-brand-cyan hover:text-black transition-all flex items-center gap-2 w-fit">
                                Scale Store <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Email & SMS Retention Flow</h5>
                                    <p className="text-xs text-gray-400">Klaviyo mastery for abandoned cart, welcome series, and post-purchase upsells.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Shopify / WooCommerce Dev</h5>
                                    <p className="text-xs text-gray-400">Custom theme modifications focused on increasing Average Order Value (AOV).</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Offer Architecture</h5>
                                    <p className="text-xs text-gray-400">Structuring bundles, subscriptions, and pricing tiers for higher profitability.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Funnel Analytics</h5>
                                    <p className="text-xs text-gray-400">Identifying and fixing drop-off points in the cart and checkout process.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. China Market Expansion */}
            <section id="china-market" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                                <i className="ph-fill ph-globe text-3xl text-red-600"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">China Market Expansion</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Expanding internationally? We specialize in helping brands penetrate the Chinese market with localized strategies, platform expertise, and cultural understanding tailored to Chinese consumer behavior.
                            </p>
                            <button onClick={() => router.push('/contact')} className="px-6 py-3 rounded-full border border-brand-border bg-brand-surface text-white font-medium hover:bg-red-600 hover:border-red-600 transition-all flex items-center gap-2 w-fit">
                                Explore China Growth <i className="ph-bold ph-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">Ideal For</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">Cross-Border Brands</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">E-commerce Growth</span>
                                <span className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-gray-300">International Expansion</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-600 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Douyin & Little Red Book Strategy</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">End-to-end content strategy, influencer partnerships, and paid ads on China's premier social platforms.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-600 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Tmall & Taobao Marketplace</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Store optimization, product listing mastery, and algorithmic bidding on Alibaba's massive platform.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-600 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">WeChat Marketing & Mini-Programs</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Leveraging WeChat's ecosystem for customer acquisition, retention, and community building.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className="ph-fill ph-check-circle text-red-600 text-lg"></i>
                                        <h5 className="font-bold text-white text-sm">Localization & Compliance</h5>
                                    </div>
                                    <p className="text-xs text-gray-400">Cultural adaptation of content, legal compliance, and payment integration with Chinese payment systems.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Analytics & Tracking */}
            <section id="analytics" className="py-24 border-t border-brand-border/50 group scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <i className="ph-bold ph-chart-line-up text-3xl text-green-500"></i>
                            </div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Analytics & Tracking</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Bad data leads to bad media buying. We deploy enterprise-grade server-side tracking to bypass ad blockers, circumvent iOS restrictions, and provide crystal-clear attribution.
                            </p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6">What We Deliver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">GTM Server-Side Containers</h5>
                                    <p className="text-xs text-gray-400">Cloud-hosted tagging infrastructure for maximum data accuracy and security.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">GA4 Mastery</h5>
                                    <p className="text-xs text-gray-400">Complex event setups, custom reporting, and BigQuery data exports.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Multi-Touch Attribution</h5>
                                    <p className="text-xs text-gray-400">Understanding exactly which channels contribute to conversion over a long sales cycle.</p>
                                </div>
                                <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                                    <h5 className="font-bold text-white text-sm mb-1">Dashboard Engineering</h5>
                                    <p className="text-xs text-gray-400">Looker Studio / Tableau builds for real-time executive visibility on ROAS.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                            <span>District 1, Ho Chi Minh City,<br />Vietnam</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="ph ph-envelope-simple text-lg text-brand-primary shrink-0"></i>
                            <a href="mailto:hello@mediatoday.com.vn" className="hover:text-white transition-colors">hello@mediatoday.com.vn</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="ph ph-phone text-lg text-brand-primary shrink-0"></i>
                            <span>+84 (0) 123 456 789</span>
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
