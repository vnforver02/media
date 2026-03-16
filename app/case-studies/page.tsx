'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

export default function CaseStudiesPage() {
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
                <button onClick={() => router.push('/services')} className="text-gray-400 hover:text-white transition-colors">{t.nav.services}</button>
                <button onClick={() => router.push('/case-studies')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full transition-colors">{t.nav.caseStudies}</button>
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
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="text-center max-w-3xl mx-auto z-10 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-green-400 backdrop-blur-sm mb-8">
                    <i className="ph-fill ph-chart-line-up"></i> Client Success Stories
                </div>
                
                <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white mb-8">
                    Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Growth.</span><br />Delivering Results.
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12">
                    See how we've helped ambitious brands across APAC scale their revenue through data-driven performance marketing and custom technical solutions.
                </p>

                {/* Filter Pills (UI representation) */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button className="px-5 py-2.5 rounded-full border border-brand-primary/50 bg-brand-primary/10 text-white text-sm font-medium transition-all">All Cases</button>
                    <button className="px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-all">E-commerce</button>
                    <button className="px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-all">B2B SaaS</button>
                    <button className="px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-all">Healthcare</button>
                    <button className="px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-all">Real Estate</button>
                </div>
            </div>
        </section>

        {/* 2. Featured Case Study (Detailed Structure Layout) */}
        <section className="max-w-7xl mx-auto px-6 py-10 md:py-20 border-b border-brand-border/50">
            <div className="flex items-center gap-3 mb-8">
                <i className="ph-fill ph-star text-yellow-500 text-xl"></i>
                <h2 className="font-display font-bold text-2xl uppercase tracking-widest text-gray-500">Featured In-Depth Case</h2>
            </div>

            <div className="bg-gradient-to-br from-brand-surface to-[#050505] border border-brand-border rounded-3xl overflow-hidden relative group">
                {/* Top Cover Image */}
                <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" alt="UrbanFit E-commerce Project" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
                    
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider">E-commerce / D2C</span>
                            </div>
                            <h3 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-2">UrbanFit Activewear</h3>
                            <p className="text-xl text-gray-300">Scaling to $2M+ via Meta Ads & Custom Frontend</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <div className="font-display font-bold text-4xl text-green-400">+450%</div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">ROAS</div>
                            </div>
                            <div className="w-px bg-white/20"></div>
                            <div className="text-right">
                                <div className="font-display font-bold text-4xl text-brand-cyan">-60%</div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">CPA</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editorial Content Details */}
                <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                    {/* Background ambient mesh inside the card */}
                    <div className="absolute inset-0 bg-glow-mesh opacity-20 pointer-events-none"></div>

                    {/* Left Sidebar Info */}
                    <div className="lg:col-span-4 space-y-10 relative z-10">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">Services Deployed</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 rounded-lg bg-black border border-brand-border text-sm text-gray-300 flex items-center gap-2"><i className="ph-fill ph-facebook-logo text-[#1877F2]"></i> Meta Ads</span>
                                <span className="px-3 py-1.5 rounded-lg bg-black border border-brand-border text-sm text-gray-300 flex items-center gap-2"><i className="ph-fill ph-google-logo text-[#EA4335]"></i> Google PMax</span>
                                <span className="px-3 py-1.5 rounded-lg bg-black border border-brand-border text-sm text-gray-300 flex items-center gap-2"><i className="ph-bold ph-code text-brand-accent"></i> Web Dev</span>
                                <span className="px-3 py-1.5 rounded-lg bg-black border border-brand-border text-sm text-gray-300 flex items-center gap-2"><i className="ph-fill ph-chart-line-up text-green-500"></i> Server Tracking</span>
                            </div>
                        </div>
                        
                        <div className="p-6 rounded-2xl bg-brand-dark border border-brand-border">
                            <i className="ph-fill ph-quotes text-3xl text-brand-primary mb-4 block"></i>
                            <p className="text-gray-300 italic mb-4 leading-relaxed">"Media Today didn't just run ads; they restructured our entire conversion funnel from the ground up. Their hybrid approach of coding faster landing pages while producing viral creatives was the game-changer."</p>
                            <div>
                                <h5 className="font-bold text-white text-sm">Marcus Le</h5>
                                <p className="text-xs text-gray-500">CMO, UrbanFit</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Narrative */}
                    <div className="lg:col-span-8 space-y-12 relative z-10 text-lg leading-relaxed text-gray-300">
                        
                        {/* Background */}
                        <div>
                            <h3 className="font-display font-bold text-2xl text-white mb-4 border-b border-brand-border pb-2">01 / The Background</h3>
                            <p>UrbanFit, a rapidly growing local activewear brand, hit a severe revenue plateau at $50k MRR. They had a strong product-market fit but were entirely reliant on organic TikTok traffic and highly volatile, unoptimized Facebook "boosted" posts.</p>
                        </div>

                        {/* Challenges */}
                        <div>
                            <h3 className="font-display font-bold text-2xl text-white mb-4 border-b border-brand-border pb-2">02 / The Challenge</h3>
                            <p className="mb-4">As iOS 14.5 updates crippled their Shopify pixel tracking, UrbanFit's Meta ad campaigns were flying blind. Their main hurdles included:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3"><i className="ph-bold ph-x-circle text-red-500 mt-1"></i> <span>Customer Acquisition Cost (CPA) spiking to unsustainable levels.</span></li>
                                <li className="flex items-start gap-3"><i className="ph-bold ph-x-circle text-red-500 mt-1"></i> <span>Creative fatigue occurring within 48 hours of launch.</span></li>
                                <li className="flex items-start gap-3"><i className="ph-bold ph-x-circle text-red-500 mt-1"></i> <span>A bloated Shopify theme causing a 6-second page load time, dropping conversion rates.</span></li>
                            </ul>
                        </div>

                        {/* Strategy & Execution */}
                        <div>
                            <h3 className="font-display font-bold text-2xl text-white mb-4 border-b border-brand-border pb-2">03 / Strategy & Actions Taken</h3>
                            <p className="mb-4">We deployed our hybrid Marketing + Tech approach, executing simultaneously on two fronts:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-black/50 p-6 rounded-xl border border-brand-border">
                                    <h5 className="text-brand-primary font-bold mb-2">Technical Fixes</h5>
                                    <p className="text-sm">We deployed a Google Tag Manager Server-Side container and Facebook Conversions API (CAPI) to restore 95% data visibility. We also coded a headless Next.js landing page for their top-selling product, reducing load times to 0.8 seconds.</p>
                                </div>
                                <div className="bg-black/50 p-6 rounded-xl border border-brand-border">
                                    <h5 className="text-brand-accent font-bold mb-2">Media Architecture</h5>
                                    <p className="text-sm">Account consolidation from 30 messy campaigns down to 3 structure-driven ones. We injected a pipeline of 50+ localized, UGC-style creatives tested dynamically against broad audiences.</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div>
                            <h3 className="font-display font-bold text-2xl text-white mb-4 border-b border-brand-border pb-2">04 / The Result</h3>
                            <p>Within 6 months, the new system transformed their baseline economics. The blazing-fast landing page doubled their CVR instantly, allowing the Meta algorithm to feed on higher quality data. CPA dropped by 60%, and the brand successfully scaled past $2M in tracked revenue while maintaining a blended 450% ROAS.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. Case Studies Grid (List View) */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="font-display font-bold text-3xl text-white mb-12">More Success Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Card 1: B2B SaaS */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="B2B SaaS Analytics" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">B2B SaaS</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-brand-surface">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">TechEdu Enterprise Automation</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                            Restructured Google Search intent campaigns and deployed an AI qualification chatbot on a custom web portal to filter out junk B2B leads.
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-xs text-gray-500">Google Ads</span>
                            <span className="mx-1 text-gray-700">•</span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className="text-xs text-gray-500">AI Bot</span>
                        </div>
                        <div className="flex items-end justify-between border-t border-brand-border pt-6">
                            <div>
                                <div className="text-2xl font-display font-bold text-white">-60%</div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">Cost Per Lead</div>
                            </div>
                            <span className="text-brand-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                View <i className="ph-bold ph-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Healthcare/Clinic */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" alt="Healthcare Clinic" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">Healthcare / Clinic</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-brand-surface">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">Aura Dental Network</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                            Built a hyper-local Meta Ads acquisition system mapped to automated CRM booking funnels to maximize chair utilization across 5 clinics.
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span><span className="text-xs text-gray-500">Meta Ads</span>
                            <span className="mx-1 text-gray-700">•</span>
                            <span className="w-2 h-2 rounded-full bg-brand-cyan"></span><span className="text-xs text-gray-500">CRM Dev</span>
                        </div>
                        <div className="flex items-end justify-between border-t border-brand-border pt-6">
                            <div>
                                <div className="text-2xl font-display font-bold text-white">3x</div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">Monthly Bookings</div>
                            </div>
                            <span className="text-brand-cyan text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                View <i className="ph-bold ph-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 3: Real Estate */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" alt="Luxury Real Estate" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">High-Ticket Real Estate</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-brand-surface">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">Nexus Premium Villas</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                            Engineered a high-ticket lead generation system targeting ultra-high-net-worth individuals using exclusive video creatives and offline conversion tracking.
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-xs text-gray-500">Tracking</span>
                            <span className="mx-1 text-gray-700">•</span>
                            <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span><span className="text-xs text-gray-500">Meta Video</span>
                        </div>
                        <div className="flex items-end justify-between border-t border-brand-border pt-6">
                            <div>
                                <div className="text-2xl font-display font-bold text-white">$15M</div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">Pipeline Generated</div>
                            </div>
                            <span className="text-brand-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                View <i className="ph-bold ph-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 4: Education */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Education Training" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">Education / EdTech</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-brand-surface">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">SkillMaster Academy</h3>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-2">
                            Multi-channel enrollment strategy bridging TikTok organic velocity with Google Search capture.
                        </p>
                        <div className="flex items-end justify-between border-t border-brand-border pt-4 mt-auto">
                            <div className="text-xl font-display font-bold text-white">5k+ <span className="text-xs font-medium text-gray-500 uppercase tracking-widest font-sans block">Students Enrolled</span></div>
                        </div>
                    </div>
                </div>

                {/* Card 5: Cross-Border */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a50?q=80&w=800&auto=format&fit=crop" alt="Cross Border E-commerce" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">Cross-Border Retail</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-brand-surface">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">Velocity APAC Launch</h3>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-2">
                            Total market entry strategy for a US tech brand expanding into Vietnam via TikTok Shop and Shopee.
                        </p>
                        <div className="flex items-end justify-between border-t border-brand-border pt-4 mt-auto">
                            <div className="text-xl font-display font-bold text-white">10k+ <span className="text-xs font-medium text-gray-500 uppercase tracking-widest font-sans block">Orders / Month</span></div>
                        </div>
                    </div>
                </div>

                {/* CTA Card -> Direct to Contact */}
                <div className="group bg-gradient-to-br from-brand-surface to-[#0A0A0A] border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full cursor-pointer p-8 relative items-center justify-center text-center" onClick={() => router.push('/contact')}>
                    <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors"></div>
                    <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 text-brand-primary relative z-10">
                        <i className="ph-bold ph-plus text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Your Brand Here</h3>
                    <p className="text-gray-400 text-sm relative z-10 max-w-xs">Ready to see your own ridiculous metrics? Let's build your case study together.</p>
                </div>

            </div>
        </section>

        {/* Final CTA Module (Identical to Home/About/Services) */}
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

    {/* Footer (Identical to Home/About/Services) */}
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
