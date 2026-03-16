'use client';

import { useRouter } from 'next/navigation';

export default function CareerDetailGooglePage() {
  const router = useRouter();

    return (
      <>
        <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-brand-primary selection:text-white">
          <div className="noise"></div>
    <div className="fixed inset-0 bg-glow-mesh pointer-events-none z-[-1]"></div>

    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                    <i className="ph-bold ph-trend-up text-white text-xl"></i>
                </div>
                <span className="font-display font-bold text-xl text-white">Media Today</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
                <button onClick={() => router.push('/careers')} className="text-sm font-medium text-gray-300 hover:text-white">Back to Careers</button>
            </div>
        </div>
    </header>

    <main className="pt-20">
        <section className="relative max-w-5xl mx-auto px-6 pt-16 pb-10">
            <button onClick={() => router.push('/careers')} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-8 font-medium">
                <i className="ph-bold ph-arrow-left"></i>
                Back to All Positions
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                            <i className="ph ph-google-logo text-3xl text-red-500"></i>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Google Ads Specialist</h1>
                            <p className="text-gray-400 mt-2">Full-time • Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20">Search & Shopping</span>
                        <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">High-Intent Marketing</span>
                        <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium border border-yellow-500/20">Experience Required</span>
                    </div>
                </div>
                <button onClick="document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})" className="px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:scale-105 transition-all">
                    Apply Now
                </button>
            </div>
        </section>

        <section className="border-t border-brand-border"></section>

        <section className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-2 space-y-12">
                    
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">About This Role</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Master Google's search and shopping advertising platforms. You'll manage Performance Max, Search campaigns, and Shopping feeds for e-commerce and SaaS clients targeting high-intent customers.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            This is a technical role requiring deep knowledge of Google Ads interfaces, bid strategies, feed optimization, and conversion tracking. You'll work across Search, Shopping, Display, and Performance Max campaigns.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Key Responsibilities</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-red-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Search & PMax Campaign Management</h3>
                                    <p className="text-gray-400">Design and manage Google Search campaigns, Performance Max campaigns, and Shopping feeds for 12-18 active accounts.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-red-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Feed & Product Optimization</h3>
                                    <p className="text-gray-400">Optimize product feeds for Google Merchant Center. Fix feed quality issues, improve product data, and boost shopping visibility.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-red-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Bid Strategy & Budget Allocation</h3>
                                    <p className="text-gray-400">Implement smart bidding strategies (Target ROAS, Target CPA). Allocate budgets across campaigns based on performance data.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-red-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Conversion Tracking & Analytics</h3>
                                    <p className="text-gray-400">Set up GA4 conversion tracking, UTM parameters, and enhanced e-commerce tracking for accurate ROI measurement.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 mb-6">
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">2+ years managing Google Ads campaigns (Search, Shopping, PMax)</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Proficiency with Google Ads interface and Google Merchant Center</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Experience with feed optimization and product data management</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Strong understanding of conversion tracking and Google Analytics</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-red-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Analytical mindset with hands-on spreadsheet experience</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
                        <div className="space-y-3">
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-suitcase text-red-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Competitive Salary & Bonuses</h3>
                                    <p className="text-gray-400 text-sm">Experience-based salary + performance bonuses</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-graduation-cap text-brand-accent text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Google Certification Support</h3>
                                    <p className="text-gray-400 text-sm">Budget for Google Ads certifications and training</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-rocket text-green-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Technical Growth</h3>
                                    <p className="text-gray-400 text-sm">Work with advanced tracking, APIs, and optimization tools</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 text-lg">Position Details</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Type</p>
                                    <p className="text-white">Full-time, Permanent</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Location</p>
                                    <p className="text-white">Ho Chi Minh City, Vietnam</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Department</p>
                                    <p className="text-white">Search Marketing</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Experience</p>
                                    <p className="text-white">2+ Years</p>
                                </div>
                            </div>
                        </div>

                        <button onClick="document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                            Apply for This Role
                        </button>

                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 text-sm">Other Positions</h3>
                            <div className="space-y-2">
                                <button onClick={() => router.push('/career-detail-tiktok')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">TikTok Ads Specialist</p>
                                    <p className="text-gray-500 text-xs mt-1">Full-time</p>
                                </button>
                                <button onClick={() => router.push('/career-detail-facebook')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">Facebook Ads Specialist</p>
                                    <p className="text-gray-500 text-xs mt-1">Full-time</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="apply-form" className="bg-black/50 border-y border-brand-border py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Apply Now</h2>
                    <p className="text-gray-400 mb-8">Tell us about your Google Ads experience and your best campaign results.</p>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Full Name" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            <input type="email" placeholder="Email" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <input type="tel" placeholder="Phone" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                        <input type="file" accept=".pdf,.doc,.docx" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-primary" />
                        <textarea placeholder="Your best Google Ads achievement?" required rows="4" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary resize-none"></textarea>
                        <button type="submit" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">Submit Application</button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    <footer className="border-t border-brand-border bg-black pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; 2024 Media Today. All rights reserved.</p>
                <a href="#" onClick={() => router.push('/careers')} className="hover:text-white transition-colors">Back to Careers</a>
            </div>
        </div>
    </footer>
        </div>
      </>
    );
}
