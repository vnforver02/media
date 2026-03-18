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

export default function AboutUsPage() {
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
        console.log('[About Us Page] Fetched site settings:', data);
        setSettings(data[0] || {});
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    
    fetchSettings();
    
    // 自动刷新：每 5 秒检查一次新数据
    const interval = setInterval(() => {
      console.log('[About Us Page] Auto-refreshing site settings...');
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
                <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</button>
                <button onClick={() => router.push('/about-us')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full transition-colors">{t.nav.about}</button>
                <button onClick={() => router.push('/services')} className="text-gray-400 hover:text-white transition-colors">{t.nav.services}</button>
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
        {/* 1. Hero / Introduction */}
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-32">
            {/* Subtle background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center z-10 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-brand-primary backdrop-blur-sm mb-8">
                    <i className="ph-fill ph-code"></i> Marketing Meets Engineering
                </div>
                
                <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white mb-8">
                    We engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-accent">unfair advantages</span> for ambitious brands.
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
                    Media Today is a hybrid growth agency. We dismantle the traditional separation between ad buying, software development, and AI integration to build full-stack revenue engines.
                </p>
                
                <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-brand-border bg-brand-surface relative shadow-2xl shadow-black">
                    {/* Placeholder for team or office image */}
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" alt="Media Today Team Collaboration" className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>

        {/* 2. Mission & Vision (Bento Grid) */}
        <section className="max-w-7xl mx-auto px-6 py-10 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission Card */}
                <div className="group bg-gradient-to-br from-brand-surface to-[#0A0A0A] border border-brand-border rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
                            <i className="ph ph-flag-pennant text-3xl text-brand-primary"></i>
                        </div>
                        <h2 className="font-display font-bold text-2xl text-white mb-4 uppercase tracking-wider text-xs">Our Mission</h2>
                        <h3 className="text-3xl font-bold text-white mb-6 leading-tight">To replace guesswork with systems.</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Founded in 2016, we exist to empower businesses with transparent, data-driven, and scalable marketing infrastructures. We align every click, pixel, and line of code directly with our clients' bottom-line revenue growth.
                        </p>
                    </div>
                </div>

                {/* Vision Card */}
                <div className="group bg-gradient-to-br from-brand-surface to-[#0A0A0A] border border-brand-border rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-8">
                            <i className="ph ph-eye text-3xl text-brand-accent"></i>
                        </div>
                        <h2 className="font-display font-bold text-2xl text-white mb-4 uppercase tracking-wider text-xs">Our Vision</h2>
                        <h3 className="text-3xl font-bold text-white mb-6 leading-tight">To be the apex growth partner in APAC.</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            By converging top-tier creative talent, performance media buying, and modern AI/SaaS technology under one roof, we aim to be the definitive standard for what a modern agency should be.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. The Hybrid Advantage (Marketing + Tech) */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-y border-brand-border/50 bg-[#050505] relative">
            {/* Subtle background grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">Why we speak both <span className="text-brand-primary">Marketing</span> and <span className="text-brand-accent">Code.</span></h2>
                    
                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>Most agencies only know how to buy ads. When campaigns fail, they blame the algorithm. Most dev shops only know how to write code. When products fail, they blame the marketing.</p>
                        
                        <p>We realized that to truly scale a business today, you cannot separate acquisition from the technical infrastructure that supports it.</p>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-1">
                                <i className="ph-bold ph-check text-brand-primary"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Server-Side Tracking Mastery</h4>
                                <p className="text-sm text-gray-400">We write custom API integrations to ensure flawless data attribution when browser pixels fail.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-1">
                                <i className="ph-bold ph-check text-brand-accent"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">High-Speed Landing Pages</h4>
                                <p className="text-sm text-gray-400">We build Next.js frontends that load in milliseconds, dropping bounce rates and doubling ROAS.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 mt-1">
                                <i className="ph-bold ph-check text-brand-cyan"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">AI Automation Pipelines</h4>
                                <p className="text-sm text-gray-400">Deploying LLMs to automatically qualify leads generated from our Meta and Google campaigns.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Element */}
                <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
                    <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-[80px] rounded-full"></div>
                    
                    {/* Left Brain (Tech) */}
                    <div className="absolute left-0 md:left-4 w-56 md:w-64 bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-2xl backdrop-blur-md z-20 hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center"><i className="ph ph-terminal-window text-xl text-brand-primary"></i></div>
                            <span className="font-bold text-white">Technology</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-brand-primary w-[80%]"></div></div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-brand-primary w-[65%]"></div></div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-brand-primary w-[90%]"></div></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 font-mono">React, Node.js, Python, AWS</p>
                    </div>

                    {/* Center connector */}
                    <div className="absolute z-10 text-white animate-pulse">
                        <i className="ph-fill ph-arrows-left-right text-4xl text-gray-600"></i>
                    </div>

                    {/* Right Brain (Marketing) */}
                    <div className="absolute right-0 md:right-4 top-12 w-56 md:w-64 bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-2xl backdrop-blur-md z-20 hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center"><i className="ph ph-megaphone text-xl text-brand-accent"></i></div>
                            <span className="font-bold text-white">Marketing</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs"><span className="text-gray-400">Meta Ads</span><span className="text-green-400">+12% ROAS</span></div>
                            <div className="flex justify-between items-center text-xs"><span className="text-gray-400">Google Ads</span><span className="text-green-400">-5% CPA</span></div>
                            <div className="flex justify-between items-center text-xs"><span className="text-gray-400">TikTok</span><span className="text-green-400">Viral</span></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 font-mono">Strategy, Creative, Analytics</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Local Mastery (Vietnam Focus) */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}></div>

            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mx-auto mb-6">
                    <i className="ph-fill ph-map-pin text-2xl text-red-500"></i>
                </div>
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">Deep Local Expertise.<br />Built for <span className="text-gray-500">Global Scale.</span></h2>
                <p className="text-gray-400 text-lg">
                    Every market has its own rhythm. Winning requires more than just translating copy—it requires deep understanding of local consumer psychology, platforms, payment behaviors, and cultural dynamics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3">Deep Local Expertise</h3>
                    <p className="text-sm text-gray-400">Deep understanding of local platform ecosystems, marketplace dynamics, and emerging commerce channels. We speak the language of your local market.</p>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3">Cultural Mastery</h3>
                    <p className="text-sm text-gray-400">We craft creatives that resonate authentically, navigating cultural trends, communication styles, and visual preferences that drive genuine action.</p>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3">Cross-Border Bridge</h3>
                    <p className="text-sm text-gray-400">We are the trusted partner for international brands looking to expand into new markets without stumbling over local barriers and cultural misunderstandings.</p>
                </div>
            </div>
        </section>

        {/* 5. Core Values Grid */}
        <section className="border-t border-brand-border/50 py-24 bg-black/30">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12 text-center">Our Core Values</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Value 1 */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:-translate-y-1 hover:border-brand-primary/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                            <i className="ph ph-chart-bar text-2xl text-blue-500"></i>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Data Over Ego</h4>
                        <p className="text-sm text-gray-400">We let numbers win arguments. Creative opinions are hypotheses; data is the objective truth.</p>
                    </div>

                    {/* Value 2 */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:-translate-y-1 hover:border-brand-accent/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                            <i className="ph ph-lightning text-2xl text-purple-500"></i>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Speed to Execution</h4>
                        <p className="text-sm text-gray-400">In digital marketing, perfection is the enemy of profit. We launch fast, learn faster, and iterate continuously.</p>
                    </div>

                    {/* Value 3 */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:-translate-y-1 hover:border-brand-cyan/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                            <i className="ph ph-lock-key-open text-2xl text-cyan-500"></i>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Radical Transparency</h4>
                        <p className="text-sm text-gray-400">No hidden margins, no vanity metrics. You see exactly what we see. We operate as an extension of your team.</p>
                    </div>

                    {/* Value 4 */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 hover:-translate-y-1 hover:border-yellow-500/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6">
                            <i className="ph ph-puzzle-piece text-2xl text-yellow-500"></i>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Systematic Thinking</h4>
                        <p className="text-sm text-gray-400">We don't do ad-hoc tactics. Every campaign, script, and design fits into a larger, predictable growth system.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. Timeline / Evolution (Optional but requested) */}
        <section className="max-w-4xl mx-auto px-6 py-24">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-16 text-center">Our Evolution</h2>
            
            <div className="relative border-l border-brand-border ml-4 md:ml-0 md:border-l-0">
                {/* Center Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-border -translate-x-1/2"></div>

                {/* Timeline Item 0 */}
                <div className="relative pl-8 md:pl-0 mb-16 md:w-1/2 md:-ml-px pr-0 md:pr-12 text-left md:text-right">
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-brand-dark border-2 border-gray-500 rounded-full md:left-auto md:-right-[6.5px]"></div>
                    <span className="text-gray-500 font-mono text-sm tracking-widest font-bold">2016</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">Foundation</h4>
                    <p className="text-sm text-gray-400">Media Today was founded as a boutique digital marketing agency with a singular mission: deliver measurable results for ambitious businesses through data-driven paid advertising and strategic media buying.</p>
                </div>

                {/* Timeline Item 1 */}
                <div className="relative pl-8 md:pl-0 mb-16 md:w-1/2 md:ml-auto md:-mr-px pl-0 md:pl-12 text-left">
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-brand-dark border-2 border-brand-primary rounded-full md:-left-[6.5px]"></div>
                    <span className="text-brand-primary font-mono text-sm tracking-widest font-bold">2021</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">Platform Mastery</h4>
                    <p className="text-sm text-gray-400">Expanded our team and deepened expertise across Meta, Google, and TikTok ecosystems. Became known for delivering exceptional ROAS for e-commerce, D2C, and service-based brands across multiple markets.</p>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pl-8 md:pl-0 mb-16 md:w-1/2 md:-ml-px pr-0 md:pr-12 text-left md:text-right">
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-brand-dark border-2 border-brand-cyan rounded-full md:left-auto md:-right-[6.5px]"></div>
                    <span className="text-brand-cyan font-mono text-sm tracking-widest font-bold">2022</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">Tech Integration</h4>
                    <p className="text-sm text-gray-400">Launched our internal development division to build high-converting web assets, custom SaaS platforms, and enterprise-grade tracking infrastructure. Realized that ads + tech = unstoppable growth.</p>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pl-8 md:pl-0 mb-16 md:w-1/2 md:-ml-px pr-0 md:pr-12 text-left md:text-right">
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-brand-dark border-2 border-brand-accent rounded-full md:left-auto md:-right-[6.5px]"></div>
                    <span className="text-brand-accent font-mono text-sm tracking-widest font-bold">2023</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">AI & Automation</h4>
                    <p className="text-sm text-gray-400">Integrated generative AI and automated workflows into our service stack. Now our clients can scale lead nurturing, customer service, and customer insights without scaling headcount.</p>
                </div>

                {/* Timeline Item 4 */}
                <div className="relative pl-8 md:pl-0 md:w-1/2 md:ml-auto md:-mr-px pl-0 md:pl-12 text-left">
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-brand-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] md:-left-[6.5px] animate-pulse"></div>
                    <span className="text-white font-mono text-sm tracking-widest font-bold">PRESENT</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">Full-Stack Growth</h4>
                    <p className="text-sm text-gray-400">Operating as a complete revenue engine for international and premium local brands, combining Strategy, Creative, Media, and Technology.</p>
                </div>
            </div>
        </section>

        {/* 7. CTA Module (Identical to Home) */}
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

    {/* Footer (Identical to Home) */}
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
                            <span>{settings.address_en || 'District 1, Ho Chi Minh City,<br />Vietnam'}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="ph ph-envelope-simple text-lg text-brand-primary shrink-0"></i>
                            <a href={`mailto:${settings.company_email || 'hello@mediatoday.com.vn'}`} className="hover:text-white transition-colors">{settings.company_email || 'hello@mediatoday.com.vn'}</a>
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
