'use client';

import { useRouter } from 'next/navigation';

export default function CareerDetailFacebookPage() {
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
            <button onClick={() => router.push('/careers')} className="flex items-center gap-2 text-brand-primary hover:text-brand-cyan transition-colors mb-8 font-medium">
                <i className="ph-bold ph-arrow-left"></i>
                Back to All Positions
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                            <i className="ph ph-facebook-logo text-3xl text-blue-500"></i>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Facebook Ads Specialist</h1>
                            <p className="text-gray-400 mt-2">Full-time • Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">Performance Marketing</span>
                        <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">Growth Marketing</span>
                        <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium border border-yellow-500/20">Experience Required</span>
                    </div>
                </div>
                <button onClick="document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})" className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold hover:scale-105 transition-all">
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
                            Manage Meta's (Facebook & Instagram) advertising platform with mastery. You'll architect campaigns for 15-25 active accounts, ranging from SaaS to e-commerce to local services—each with unique KPIs and growth targets.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            This role requires deep understanding of Meta's algorithm, audience dynamics, and creative testing frameworks. You'll be responsible for ROAS optimization, budget allocation, and scaling profitable campaigns.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Key Responsibilities</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-blue-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Account Architecture</h3>
                                    <p className="text-gray-400">Build optimized Meta ad account structures. Design audience segmentation and creative testing strategies for each vertical.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-blue-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Campaign Optimization</h3>
                                    <p className="text-gray-400">Daily management, bid strategy optimization, audience refinement, and conversion API setup for maximum ad efficiency.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-blue-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Creative & Reporting</h3>
                                    <p className="text-gray-400">Collaborate with creative teams on ad variations. Build dashboards and monthly reports for client stakeholders.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-blue-400 text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Budget Scaling</h3>
                                    <p className="text-gray-400">Strategically allocate and scale budgets to top-performing campaigns. Kill underperforming audiences and test new angles.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6\">What We're Looking For</h2>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 mb-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <i className="ph ph-star text-yellow-500"></i>
                                Required Skills
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">2+ years managing Meta (Facebook/Instagram) advertising campaigns</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Proficiency in Meta Ads Manager and Business Suite</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Track record of managing 15+ concurrent accounts profitably</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Understanding of conversion APIs, pixel setup, and advanced tracking</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-blue-400 shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Strong analytical mindset with spreadsheet expertise</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Preferred Qualifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Meta Ads Manager Certification</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Experience with e-commerce and DTC brands</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Experience managing agency multi-client campaigns</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Knowledge of lookalike and custom audiences</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">What You'll Get</h2>
                        <div className="space-y-3">
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-suitcase text-blue-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Competitive Salary</h3>
                                    <p className="text-gray-400 text-sm">Salary based on experience + monthly/quarterly performance bonuses</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-graduation-cap text-brand-accent text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Training & Certification</h3>
                                    <p className="text-gray-400 text-sm">Budget for Meta certifications, industry courses, and conferences</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-rocket text-green-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold\">Portfolio Diversity</h3>
                                    <p className="text-gray-400 text-sm">Work across multiple industries and verticals to build deep expertise</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-users text-cyan-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Team Collaboration</h3>
                                    <p className="text-gray-400 text-sm">Work with strategists, designers, and engineers in an agile environment</p>
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
                                    <p className="text-white">Performance Marketing</p>
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
                                <button onClick={() => router.push('/career-detail-google')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">Google Ads Specialist</p>
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
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
                    <p className="text-gray-400 mb-8">Tell us about your Meta ads experience and why you'd be great for the team.</p>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Full Name" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            <input type="email" placeholder="Email Address" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="tel" placeholder="Phone" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            <input type="url" placeholder="LinkedIn Profile" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                        </div>

                        <input type="file" accept=".pdf,.doc,.docx" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-primary" />
                        <p className="text-xs text-gray-500">Resume/CV (PDF or Word, max 5MB)</p>

                        <textarea placeholder="What's your most successful Meta campaign and why?" required rows="5" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary resize-none"></textarea>

                        <button type="submit" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    <footer className="border-t border-brand-border bg-black pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; 2024 Media Today. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" onClick={() => router.push('/careers')} className="hover:text-white transition-colors">Back to Careers</a>
                </div>
            </div>
        </div>
    </footer>
        </div>
      </>
    );
}
