'use client';

import { useRouter } from 'next/navigation';

export default function CareerDetailTiktokPage() {
  const router = useRouter();

    return (
      <>
        <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-brand-primary selection:text-white">
          <div className="noise"></div>
    <div className="fixed inset-0 bg-glow-mesh pointer-events-none z-[-1]"></div>

    {/* Header */}\n    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border">
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
        {/* Hero Section */}
        <section className="relative max-w-5xl mx-auto px-6 pt-16 pb-10">
            <button onClick={() => router.push('/careers')} className="flex items-center gap-2 text-brand-cyan hover:text-brand-primary transition-colors mb-8 font-medium">
                <i className="ph-bold ph-arrow-left"></i>
                Back to All Positions
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center">
                            <i className="ph ph-tiktok-logo text-3xl text-brand-cyan"></i>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">TikTok Ads Specialist</h1>
                            <p className="text-gray-400 mt-2">Full-time • Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-medium border border-brand-cyan/20">Advertising</span>
                        <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">Growth Marketing</span>
                        <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium border border-yellow-500/20">Experience Required</span>
                    </div>
                </div>
                <button onClick="document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})" className="px-6 py-3 rounded-full bg-brand-cyan text-black font-bold hover:scale-105 transition-all">
                    Apply Now
                </button>
            </div>
        </section>

        <section className="border-t border-brand-border"></section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* Job Overview */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">About This Role</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            You'll manage high-performing TikTok Shop & Ads accounts, driving millions in revenue for D2C and e-commerce brands. This is a hands-on position working directly with real clients, real budgets, and real growth metrics.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            You'll move fast, test aggressively, and scale what works. This isn't a "follow best practices" role—it's about finding what actually drives ROI for TikTok's unique audience dynamics.
                        </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Key Responsibilities</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-brand-cyan text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Campaign Setup & Optimization</h3>
                                    <p className="text-gray-400">Build & manage TikTok Shop campaigns, audience targeting strategies, and creative testing frameworks.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-brand-cyan text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Performance Monitoring</h3>
                                    <p className="text-gray-400">Daily management of 8-15 active TikTok accounts. Analyze metrics, identify bottlenecks, and implement improvements.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-brand-cyan text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Budget Allocation & Scaling</h3>
                                    <p className="text-gray-400">Strategically distribute ad spend across top performers. Scale winners, kill losers, test new angles.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-brand-cyan text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Creative Direction & Collaboration</h3>
                                    <p className="text-gray-400">Work with our creative team to develop high-converting ad creatives and UGC content.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0 mt-1">
                                    <i className="ph-bold ph-check text-brand-cyan text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Client Communication</h3>
                                    <p className="text-gray-400">Provide weekly/monthly performance reports. Present findings and recommendations to clients.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">What We're Looking For</h2>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 mb-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <i className="ph ph-star text-yellow-500"></i>
                                Required Experience
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">1-2+ years managing TikTok Ads campaigns professionally</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Demonstrated expertise with TikTok Shop setup and catalog management</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Proven track record of scaling campaigns profitably (3x+ ROAS minimum)</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Strong understanding of e-commerce KPIs and conversion funnels</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Comfort with data analysis, spreadsheets, and reporting tools</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-brand-cyan shrink-0 mt-1">•</span>
                                    <span className="text-gray-400">Fast execution mindset—move first, optimize later mentality</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Preferred Skills */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Nice-to-Have Skills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Experience with TikTok's audience insights & analytics</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Experience managing influencer partnerships on TikTok</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Familiarity with TikTok's creator marketplace</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <i className="ph ph-lightning text-green-500 text-lg shrink-0 mt-0.5"></i>
                                <span className="text-gray-400">Prior e-commerce or D2C growth experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">What You'll Get</h2>
                        <div className="space-y-3">
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-suitcase text-brand-primary text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Competitive Salary & Benefits</h3>
                                    <p className="text-gray-400 text-sm">Salary commensurate with experience + performance bonuses</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-graduation-cap text-brand-accent text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Professional Development</h3>
                                    <p className="text-gray-400 text-sm">Training budget for courses, certifications, and industry events</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-rocket text-green-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Real Impact & Ownership</h3>
                                    <p className="text-gray-400 text-sm">Manage high-budget accounts, see direct impact on client growth</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-brand-surface border border-brand-border rounded-lg p-4">
                                <i className="ph ph-users text-cyan-500 text-xl shrink-0 mt-0.5"></i>
                                <div>
                                    <h3 className="text-white font-bold">Collaborative Culture</h3>
                                    <p className="text-gray-400 text-sm">Work with strategists, creatives, and engineers who share your execution mindset</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        {/* Quick Info */}
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
                                    <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Experience Level</p>
                                    <p className="text-white">1-2+ Years</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button onClick="document.getElementById('apply-form').scrollIntoView({behavior: 'smooth'})" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                            Apply for This Role
                        </button>

                        {/* Share */}
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 text-sm">Share This Position</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-black/50 hover:bg-black transition-colors text-white text-sm">
                                    <i className="ph ph-facebook-logo"></i>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-black/50 hover:bg-black transition-colors text-white text-sm">
                                    <i className="ph ph-twitter-logo"></i>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-black/50 hover:bg-black transition-colors text-white text-sm">
                                    <i className="ph ph-linkedin-logo"></i>
                                </button>
                            </div>
                        </div>

                        {/* Related Positions */}
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 text-sm">Other Positions</h3>
                            <div className="space-y-2">
                                <button onClick={() => router.push('/career-detail-facebook')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">Facebook Ads Specialist</p>
                                    <p className="text-gray-500 text-xs mt-1">Full-time</p>
                                </button>
                                <button onClick={() => router.push('/career-detail-google')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">Google Ads Specialist</p>
                                    <p className="text-gray-500 text-xs mt-1">Full-time</p>
                                </button>
                                <button onClick={() => router.push('/career-detail-content')} className="block text-left w-full p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm">
                                    <p className="text-white font-semibold">Content / Creative Support</p>
                                    <p className="text-gray-500 text-xs mt-1">Full-time</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="bg-black/50 border-y border-brand-border py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Apply Now</h2>
                    <p className="text-gray-400 mb-8">Submit your application and we'll get back to you within 2-3 business days.</p>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-medium mb-2">Full Name *</label>
                                <input type="text" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">Email *</label>
                                <input type="email" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-medium mb-2">Phone *</label>
                                <input type="tel" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">LinkedIn Profile</label>
                                <input type="url" placeholder="https://linkedin.com/in/" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Years of TikTok Ads Experience *</label>
                            <select required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary">
                                <option value="">Select experience level</option>
                                <option value="1">1 year</option>
                                <option value="2">2 years</option>
                                <option value="3">3+ years</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Portfolio / Case Studies URL</label>
                            <input type="url" placeholder="Link to your work" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary" />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Upload Resume *</label>
                            <input type="file" accept=".pdf,.doc,.docx" required className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-primary" />
                            <p className="text-xs text-gray-500 mt-2">PDF or Word, max 5MB</p>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Tell us about your best TikTok campaign *</label>
                            <textarea required rows="5" placeholder="What was the campaign? What were the results? What did you learn?" className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    {/* Footer */}
    <footer className="border-t border-brand-border bg-black pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; 2024 Media Today. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" onClick={() => router.push('/careers')} className="hover:text-white transition-colors">Back to Careers</a>
                </div>
            </div>
        </div>
    </footer>
        </div>
      </>
    );
}
