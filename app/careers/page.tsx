'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';

export default function CareersPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const t = translations[language as Language] || translations.en;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

    return (
      <>
        <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-brand-primary selection:text-white relative">
          <div className="noise"></div>
    <div className="fixed inset-0 bg-glow-mesh pointer-events-none z-[-1]"></div>

    {/* Navigation Header */}
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    <i className="ph-bold ph-trend-up text-white text-xl"></i>
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">Media Today</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
                <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</button>
                <button onClick={() => router.push('/about-us')} className="text-gray-400 hover:text-white transition-colors">{t.nav.about}</button>
                <button onClick={() => router.push('/services')} className="text-gray-400 hover:text-white transition-colors">{t.nav.services}</button>
                <button onClick={() => router.push('/case-studies')} className="text-gray-400 hover:text-white transition-colors">{t.nav.caseStudies}</button>
                <button onClick={() => router.push('/careers')} className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:rounded-t-full transition-colors">{t.nav.careers}</button>
                <button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</button>
            </nav>

            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-2">
                <LanguageSwitcher />
            </div>

            <button className="md:hidden text-gray-300 hover:text-white">
                <i className="ph ph-list text-2xl"></i>
            </button>
        </div>
    </header>

    <main className="pt-20">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-primary/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col items-start space-y-8 z-10">
                    <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white">
                        {t.careers.title}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                        {t.careers.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={() => document.getElementById('positions-section').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 rounded-full bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                            {t.careers.viewPositions}
                            <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                        <button onClick={() => document.getElementById('apply-section').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 rounded-full bg-brand-surface border border-brand-border text-white font-medium hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            {t.common.applyNow}
                        </button>
                    </div>
                </div>

                <div className="relative w-full aspect-[4/3] lg:aspect-square flex justify-center items-center perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent rounded-full blur-[80px]"></div>
                    
                    <div className="relative w-full max-w-md bg-brand-surface/80 backdrop-blur-xl border border-brand-border rounded-2xl p-8 shadow-2xl z-20 animate-float shadow-black/50">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-sm font-medium text-white">{t.careers.teamGrowth}</p>
                                <p className="text-2xl font-bold text-brand-primary">50+ Team</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-brand-gradient/20 flex items-center justify-center">
                                <i className="ph-fill ph-users text-brand-primary text-xl"></i>
                            </div>
                        </div>
                        
                        <div className="space-y-4 mb-6 border-t border-b border-brand-border py-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">{t.careers.openPositions}</span>
                                <span className="text-lg font-bold text-green-400">7</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">{t.careers.departments}</span>
                                <span className="text-lg font-bold text-blue-400">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Hiring Rate</span>
                                <span className="text-lg font-bold text-yellow-400">Fast</span>
                            </div>
                        </div>

                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-brand-surface bg-blue-500 flex items-center justify-center text-white text-xs font-bold">DT</div>
                            <div className="w-8 h-8 rounded-full border-2 border-brand-surface bg-purple-500 flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <div className="w-8 h-8 rounded-full border-2 border-brand-surface bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">ML</div>
                            <div className="w-8 h-8 rounded-full border-2 border-brand-surface bg-orange-500 flex items-center justify-center text-white text-xs font-bold">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Why Work With Us */}
        <section className="bg-black/50 border-y border-brand-border py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12 text-center">Why Work With Us?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-brand-primary/50 transition-colors group">
                        <i className="ph ph-target text-2xl text-brand-primary mb-4"></i>
                        <h3 className="text-white font-bold mb-2">Execution-Focused</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">You'll ship real campaigns, see real results, and directly impact company revenue.</p>
                    </div>

                    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-brand-cyan/50 transition-colors group">
                        <i className="ph ph-lightning text-2xl text-brand-cyan mb-4"></i>
                        <h3 className="text-white font-bold mb-2">Fast-Paced Learning</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Master ads, e-commerce, AI automation, and web dev all within one collaborative environment.</p>
                    </div>

                    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-brand-accent/50 transition-colors group">
                        <i className="ph ph-code text-2xl text-brand-accent mb-4"></i>
                        <h3 className="text-white font-bold mb-2">Tech + Creative Mix</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Work with engineers, designers, and strategists who actually understand growth mechanics.</p>
                    </div>

                    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-yellow-500/50 transition-colors group">
                        <i className="ph ph-rocket text-2xl text-yellow-500 mb-4"></i>
                        <h3 className="text-white font-bold mb-2">Real Projects</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Not simulations. You'll build client campaigns worth $100k+ in ad spend from day one.</p>
                    </div>

                    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-green-500/50 transition-colors group">
                        <i className="ph ph-plant text-2xl text-green-500 mb-4"></i>
                        <h3 className="text-white font-bold mb-2">Growth Culture</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">We invest in your professional development. You grow as our agency grows.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Open Positions */}
        <section id="positions-section" className="max-w-7xl mx-auto px-6 py-24">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{t.nav.careers}</h2>
            <p className="text-gray-400 mb-12 text-lg">7 roles hiring across Marketing, Tech, and Operations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Position Card 1 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-brand-primary/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">TikTok Ads Specialist</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-1 rounded-full">Full-time</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                            <i className="ph ph-tiktok-logo text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Manage high-performing TikTok ad accounts. Run multi-million dollar campaigns. Scale D2C and e-commerce brands on the fastest-growing platform.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Advertising / Marketing</span>
                        <button onClick={() => router.push('/career-detail-tiktok')} className="text-brand-cyan text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 2 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-[#1877F2]/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Facebook Ads Specialist</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Full-time</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <i className="ph ph-facebook-logo text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Build high-ROAS Meta ad campaigns. Test audience angles, creative strategies, and automation setups. Work with 20+ active accounts across multiple industries.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Advertising / Marketing</span>
                        <button onClick={() => router.push('/career-detail-facebook')} className="text-brand-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 3 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-red-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Google Ads Specialist</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Full-time</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                            <i className="ph ph-google-logo text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Specialize in Google Search, Shopping, and Performance Max campaigns. Optimize for high-intent keywords. Master conversion tracking and feed optimization.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Advertising / Marketing</span>
                        <button onClick={() => router.push('/career-detail-google')} className="text-red-400 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 4 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-brand-accent/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">E-commerce Growth Intern</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-brand-accent/20 text-brand-accent px-2 py-1 rounded-full">Internship</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                            <i className="ph ph-shopping-cart text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Start your career managing e-commerce accounts. Learn Shopify setup, product feed optimization, and conversion rate improvements on real client projects.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">E-commerce / Marketing</span>
                        <button onClick={() => router.push('/career-detail-ecommerce')} className="text-brand-accent text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 5 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-yellow-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Marketing Intern</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">Internship</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                            <i className="ph ph-chart-line-up text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Support ad management, content calendar management, and campaign analytics. Build foundational skills in digital marketing and performance tracking.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Marketing / Support</span>
                        <button onClick={() => router.push('/career-detail-marketing')} className="text-yellow-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 6 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-green-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Content / Creative Support</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Full-time</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                            <i className="ph ph-palette text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Create engaging social media content, ad copy, and UGC concepts. Work with designers and video editors to produce high-converting creative assets.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Creative / Content</span>
                        <button onClick={() => router.push('/career-detail-content')} className="text-green-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Position Card 7 */}
                <div className="group bg-brand-surface border border-brand-border rounded-2xl p-8 hover:bg-gray-900 hover:border-cyan-500/50 transition-all md:col-span-2 lg:col-span-1">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Internal Accountant</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">Full-time</span>
                                <span className="text-xs bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full">Ho Chi Minh City</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                            <i className="ph ph-calculator text-xl"></i>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Manage company finances, invoicing, and reporting. Support project accounting and profitability analysis for client campaigns.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Finance / Operations</span>
                        <button onClick={() => router.push('/career-detail-accountant')} className="text-cyan-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <i className="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Hiring Process */}
        <section className="bg-black/50 border-y border-brand-border py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12 text-center">Our Hiring Process</h2>
                
                <div className="flex flex-col md:flex-row gap-8 relative">
                    {/* Desktop Connecting Line */}
                    <div className="hidden md:block absolute top-6 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>

                    {/* Step 1 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-primary flex items-center justify-center text-brand-primary font-bold font-display mx-auto mb-6 relative z-10">01</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full">
                            <h4 className="text-white font-bold mb-2">Application</h4>
                            <p className="text-sm text-gray-400">Submit your resume, portfolio, and a brief message about why you're interested in joining.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-cyan flex items-center justify-center text-brand-cyan font-bold font-display mx-auto mb-6 relative z-10">02</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full">
                            <h4 className="text-white font-bold mb-2">Initial Screening</h4>
                            <p className="text-sm text-gray-400">Our HR team reviews your application and qualifications. Selected candidates get a quick video call.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-brand-accent flex items-center justify-center text-brand-accent font-bold font-display mx-auto mb-6 relative z-10">03</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full">
                            <h4 className="text-white font-bold mb-2">Interview</h4>
                            <p className="text-sm text-gray-400">Meet with the team lead and department head. Discuss your experience and what you're looking to achieve.</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex-1 relative">
                        <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold font-display mx-auto mb-6 relative z-10 shadow-lg shadow-brand-primary/20">04</div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center h-full">
                            <h4 className="text-white font-bold mb-2">Offer & Onboard</h4>
                            <p className="text-sm text-gray-400">Successful candidates receive an offer. Start date is flexible based on your availability.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-brand-gradient rounded-3xl p-1">
                <div className="bg-brand-dark rounded-[22px] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-brand-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
                    
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 relative z-10">{language === 'en' ? 'Ready to Grow with Us?' : language === 'vi' ? 'Sẵn Sàng Phát Triển Cùng Chúng Tôi?' : '准备与我们一起增长吗？'}</h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">{language === 'en' ? "If you're excited about performance marketing, growth systems, and making an impact, we want to hear from you." : language === 'vi' ? 'Nếu bạn hứng thú với tiếp thị hiệu suất, hệ thống tăng trưởng và tạo ảnh hưởng, chúng tôi muốn nghe từ bạn.' : '如果您对性能营销、增长系统和创造影响力感到兴奋，我们想听听您的意见。'}</p>
                    
                    <button id="apply-section" onClick={() => document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10">
                        {t.careers.title}
                    </button>
                </div>
            </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="max-w-2xl mx-auto px-6 py-20">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{t.careers.title}</h2>
            <p className="text-gray-400 mb-12">Fill out the form below. Our team will review and get back to you within 2-3 business days.</p>
            
            <form className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-white font-medium mb-2">{t.contact.name} *</label>
                    <input type="text" placeholder="Your full name" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-white font-medium mb-2">{t.contact.email} *</label>
                    <input type="email" placeholder="your@email.com" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-white font-medium mb-2">{t.contact.phone} *</label>
                    <input type="tel" placeholder="+84 (0) 123 456 789" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                {/* Position */}
                <div>
                    <label className="block text-white font-medium mb-2">{t.contact.serviceNeeded} *</label>
                    <select required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors">
                        <option value="">Select a position</option>
                        <option value="tiktok">TikTok Ads Specialist</option>
                        <option value="facebook">Facebook Ads Specialist</option>
                        <option value="google">Google Ads Specialist</option>
                        <option value="ecommerce">E-commerce Growth Intern</option>
                        <option value="marketing">Marketing Intern</option>
                        <option value="content">Content / Creative Support</option>
                        <option value="accountant">Internal Accountant</option>
                    </select>
                </div>

                {/* LinkedIn / Portfolio */}
                <div>
                    <label className="block text-white font-medium mb-2">LinkedIn Profile or Portfolio URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/yourprofile or your portfolio" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                {/* Resume Upload */}
                <div>
                    <label className="block text-white font-medium mb-2">Resume / CV *</label>
                    <input type="file" accept=".pdf,.doc,.docx" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-primary transition-colors" />
                    <p className="text-xs text-gray-500 mt-2">PDF or Word document, max 5MB</p>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-white font-medium mb-2">{t.contact.message} *</label>
                    <textarea placeholder="Tell us about your interest, experience, and what you're looking to achieve..." required rows="5" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                    {t.contact.send}
                </button>

                <p className="text-xs text-gray-500 text-center">By submitting, you agree to our Privacy Policy and terms.</p>
            </form>
        </section>

    </main>

    {/* Footer */}
    <footer className="border-t border-brand-border bg-black pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => router.push('/')}>
                        <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                            <i className="ph-bold ph-trend-up text-white text-xl"></i>
                        </div>
                        <span className="font-display font-bold text-xl text-white">Media Today</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        {language === 'en' ? 'A modern digital marketing and technology agency. We combine data-driven ad buying, AI automation, and technical development to scale brands in Vietnam and beyond.' : language === 'vi' ? 'Một công ty tiếp thị kỹ thuật số và công nghệ hiện đại. Chúng tôi kết hợp mua quảng cáo theo dữ liệu, tự động hóa AI và phát triển kỹ thuật để mở rộng quy mô thương hiệu ở Việt Nam và ngoài.' : '一家现代数字营销和技术公司。我们结合了数据驱动的广告购买、人工智能自动化和技术开发，以在越南及其他地区扩展品牌规模。'}
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><button onClick={() => router.push('/about-us')} className="hover:text-white transition-colors">{t.nav.about}</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-white transition-colors">{t.nav.services}</button></li>
                        <li><button onClick={() => router.push('/case-studies')} className="hover:text-white transition-colors">{t.nav.caseStudies}</button></li>
                        <li><button onClick={() => router.push('/careers')} className="hover:text-white transition-colors">{t.nav.careers}</button></li>
                        <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">{t.nav.contact}</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Services</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-primary transition-colors">{t.services.facebookAds}</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-red-400 transition-colors">{t.services.googleAds}</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-cyan transition-colors">{t.services.tiktokAds}</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-brand-accent transition-colors">{t.services.saasDevelopment}</button></li>
                        <li><button onClick={() => router.push('/services')} className="hover:text-yellow-400 transition-colors">{t.services.aiSolutions}</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">{t.contact.title}</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <i className="ph ph-map-pin-line text-lg text-brand-primary shrink-0"></i>
                            <span>District 1, Ho Chi Minh City, Vietnam</span>
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
