'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

export default function ContactPage() {
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
                <button onClick={() => router.push('/case-studies')} className="text-gray-400 hover:text-white transition-colors">{t.nav.caseStudies}</button>
                <button onClick={() => router.push('/careers')} className="text-gray-400 hover:text-white transition-colors">{t.nav.careers}</button>
                <button onClick={() => router.push('/contact')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full transition-colors">{t.nav.contact}</button>
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
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border bg-brand-surface/50 text-xs font-medium text-brand-accent backdrop-blur-sm mb-6">
                <i className="ph-fill ph-paper-plane-tilt"></i> Get in Touch
            </div>
            
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white mb-6">
                Let's Build Your Next<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-accent">Growth Engine.</span>
            </h1>
            
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Whether you need a full funnel overhaul, advanced technical development, or a comprehensive media buying strategy, our team is ready to execute.
            </p>
        </section>

        {/* Main Contact Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left Sidebar: Info */}
                <div className="lg:col-span-5 space-y-8">
                    
                    {/* Contact Information Cards */}
                    <div className="space-y-4">
                        {/* Direct Contact */}
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-primary/30 transition-colors group">
                            <h3 className="text-lg font-bold text-white mb-6 font-display">Chat With Us</h3>
                            
                            <div className="space-y-6 text-sm">
                                <a href="mailto:hello@mediatoday.com.vn" className="flex items-start gap-4 hover:translate-x-1 transition-transform">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <i className="ph-fill ph-envelope-simple text-blue-500 text-lg"></i>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Email Us</p>
                                        <p className="text-white font-medium">hello@mediatoday.com.vn</p>
                                    </div>
                                </a>
                                
                                <a href="tel:+84123456789" className="flex items-start gap-4 hover:translate-x-1 transition-transform">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <i className="ph-fill ph-phone text-green-500 text-lg"></i>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Call Us</p>
                                        <p className="text-white font-medium">+84 (0) 123 456 789</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Headquarters Location */}
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 overflow-hidden relative group">
                            <h3 className="text-lg font-bold text-white mb-6 font-display relative z-10">Headquarters</h3>
                            
                            <div className="flex items-start gap-4 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-fill ph-map-pin text-brand-accent text-lg"></i>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-300 leading-relaxed">Level 12, Nexus Tower<br />Nguyen Huu Canh Street, District 1<br />Ho Chi Minh City, Vietnam</p>
                                </div>
                            </div>

                            {/* Map Visual Placeholder */}
                            <div className="w-full h-40 rounded-xl overflow-hidden relative border border-brand-border">
                                <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=800&auto=format&fit=crop" alt="Ho Chi Minh City" className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-primary/30 flex items-center justify-center animate-pulse-slow">
                                    <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_15px_#3B82F6]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Partnership Note */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-surface to-brand-dark border border-brand-border">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="ph-fill ph-handshake text-brand-cyan text-lg"></i>
                                <h4 className="font-bold text-white text-sm">Partnership & Media Inquiries</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Are you an agency looking to white-label our tech/media services, or a media outlet seeking expert commentary? Please select "Partnership" in the inquiry form.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar: The Form */}
                <div className="lg:col-span-7">
                    <div className="bg-gradient-to-br from-brand-surface to-[#0A0A0A] border border-brand-border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                        {/* Ambient glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="mb-8 relative z-10">
                            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">Request a Proposal</h2>
                            <p className="text-gray-400 text-sm">Fill out the form below. Our strategy team will review your business and get back to you within 24 hours.</p>
                        </div>

                        <form className="space-y-6 relative z-10" onSubmit="event.preventDefault(); alert('Form submission simulated successfully.');">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300 block">First Name</label>
                                    <input type="text" id="firstName" required
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="John" />
                                </div>
                                {/* Last Name */}
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300 block">Last Name</label>
                                    <input type="text" id="lastName" required
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="Doe" />
                                </div>
                            </div>

                            {/* Work Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Work Email</label>
                                    <input type="email" id="email" required
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="john@company.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-300 block">Phone Number <span className="text-gray-600 font-normal">(Optional)</span></label>
                                    <input type="tel" id="phone"
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="+84 90 123 4567" />
                                </div>
                            </div>

                            {/* Company Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium text-gray-300 block">Company Name</label>
                                    <input type="text" id="company" required
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="Acme Corp" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="website" className="text-sm font-medium text-gray-300 block">Website URL <span className="text-gray-600 font-normal">(Optional)</span></label>
                                    <input type="url" id="website"
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all"
                                        placeholder="https://" />
                                </div>
                            </div>

                            {/* Service Selection */}
                            <div className="space-y-2">
                                <label htmlFor="service" className="text-sm font-medium text-gray-300 block">Primary Service Needed</label>
                                <div className="relative">
                                    <select id="service" required
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all cursor-pointer">
                                        <option value="" disabled selected className="text-gray-600">Select an option...</option>
                                        <option value="meta">Meta Ads Management</option>
                                        <option value="google">Google Search / PMax</option>
                                        <option value="tiktok">TikTok Commerce & Content</option>
                                        <option value="webdev">Web / Landing Page Development</option>
                                        <option value="ai">AI Automations / CRM Integration</option>
                                        <option value="full">Full Funnel Growth Strategy</option>
                                        <option value="partnership">Partnership / General Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            {/* Current Budget (Optional) */}
                            <div className="space-y-2">
                                <label htmlFor="budget" className="text-sm font-medium text-gray-300 block">Estimated Monthly Budget <span className="text-gray-600 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <select id="budget"
                                        className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all cursor-pointer">
                                        <option value="" disabled selected className="text-gray-600">Select budget range...</option>
                                        <option value="under5k">Under $5,000</option>
                                        <option value="5k-15k">$5,000 - $15,000</option>
                                        <option value="15k-50k">$15,000 - $50,000</option>
                                        <option value="over50k">$50,000+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300 block">Project Details / Goals</label>
                                <textarea id="message" rows="4" required
                                    className="w-full bg-[#050505] border border-brand-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all resize-y"
                                    placeholder="Tell us about your current roadblocks, target metrics, or specific technical requirements..."></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button type="submit" 
                                    className="w-full py-4 rounded-xl bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2 group">
                                    Send Inquiry <i className="ph-bold ph-paper-plane-right group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.</p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>

    </main>

    {/* Footer (Identical to previous pages) */}
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
