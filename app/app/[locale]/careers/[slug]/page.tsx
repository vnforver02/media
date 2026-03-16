'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navigation from '@/components/site/Navigation';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';
import { Locale } from '@/lib/i18n';

interface Job {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  department_en: string;
  department_vi: string;
  location: string;
  employment_type: string;
  overview_en: string;
  overview_vi: string;
  overview_zh_cn: string;
  overview_zh_tw: string;
  responsibilities_en: string;
  requirements_en: string;
  preferred_skills_en: string;
  benefits_en: string;
  featured: boolean;
}

function JobDetailContent({ locale, slug }: { locale: Locale; slug: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        const foundJob = data.find((j: Job) => j.slug === slug);
        setJob(foundJob);
        setJobs(data.filter((j: Job) => j.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJobs();
  }, [slug]);

  if (!job) {
    return (
      <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push(`/${locale}`)}>
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <i className="ph-bold ph-trend-up text-white text-xl"></i>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Media Today</span>
            </div>
          </div>
        </header>
        <div className="pt-32 text-center">
          <p className="text-gray-400">
            {locale === 'en' && 'Job not found'}
            {locale === 'vi' && 'Không tìm thấy công việc'}
            {locale === 'zh-cn' && '未找到职位'}
            {locale === 'zh-tw' && '未找到職位'}
          </p>
        </div>
      </div>
    );
  }

  const getJobTitle = (j: Job): string => {
    switch (locale) {
      case 'vi':
        return j.title_vi || j.title_en;
      case 'zh-cn':
        return j.title_zh_cn || j.title_en;
      case 'zh-tw':
        return j.title_zh_tw || j.title_en;
      default:
        return j.title_en;
    }
  };

  const getDepartment = (j: Job): string => {
    switch (locale) {
      case 'vi':
        return j.department_vi || j.department_en;
      default:
        return j.department_en;
    }
  };

  const getOverview = (j: Job): string => {
    switch (locale) {
      case 'vi':
        return j.overview_vi || j.overview_en;
      case 'zh-cn':
        return j.overview_zh_cn || j.overview_en;
      case 'zh-tw':
        return j.overview_zh_tw || j.overview_en;
      default:
        return j.overview_en;
    }
  };

  return (
    <div className="bg-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-brand-primary selection:text-white relative">
      <div className="noise"></div>
      <div className="fixed inset-0 bg-glow-mesh pointer-events-none z-[-1]"></div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-brand-border transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push(`/${locale}`)}>
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <i className="ph-bold ph-trend-up text-white text-xl"></i>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Media Today</span>
          </div>

          <Navigation locale={locale} />

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <button className="md:hidden text-gray-300 hover:text-white">
            <i className="ph ph-list text-2xl"></i>
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <button
            onClick={() => router.push(`/${locale}/careers`)}
            className="mb-6 text-brand-primary hover:text-brand-primary/80 transition-colors flex items-center gap-2"
          >
            <i className="ph-bold ph-arrow-left"></i>
            {locale === 'en' && 'Back to Careers'}
            {locale === 'vi' && 'Quay Lại Tuyển Dụng'}
            {locale === 'zh-cn' && '返回招聘'}
            {locale === 'zh-tw' && '返回招聘'}
          </button>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.1] tracking-tight text-white mb-4">
            {getJobTitle(job)}
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium">
              {getDepartment(job)}
            </span>
            <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-gray-300 text-sm font-medium">
              {job.location}
            </span>
            <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-gray-300 text-sm font-medium">
              {job.employment_type}
            </span>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed">
            {getOverview(job)}
          </p>
        </section>

        {/* Job Details */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {job.responsibilities_en && (
                <div className="mb-12">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">
                    {locale === 'en' && 'Responsibilities'}
                    {locale === 'vi' && 'Trách Nhiệm'}
                    {locale === 'zh-cn' && '职责'}
                    {locale === 'zh-tw' && '職責'}
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities_en.split('\n').filter((item) => item.trim()).map((item, idx) => (
                      <li key={idx} className="text-gray-400 flex gap-3">
                        <span className="text-brand-primary mt-1">•</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements_en && (
                <div className="mb-12">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">
                    {locale === 'en' && 'Requirements'}
                    {locale === 'vi' && 'Yêu Cầu'}
                    {locale === 'zh-cn' && '要求'}
                    {locale === 'zh-tw' && '要求'}
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements_en.split('\n').filter((item) => item.trim()).map((item, idx) => (
                      <li key={idx} className="text-gray-400 flex gap-3">
                        <span className="text-brand-primary mt-1">•</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.preferred_skills_en && (
                <div className="mb-12">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">
                    {locale === 'en' && 'Preferred Skills'}
                    {locale === 'vi' && 'Kỹ Năng Ưu Tiên'}
                    {locale === 'zh-cn' && '优选技能'}
                    {locale === 'zh-tw' && '優選技能'}
                  </h2>
                  <ul className="space-y-3">
                    {job.preferred_skills_en.split('\n').filter((item) => item.trim()).map((item, idx) => (
                      <li key={idx} className="text-gray-400 flex gap-3">
                        <span className="text-brand-primary mt-1">•</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits_en && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-white mb-6">
                    {locale === 'en' && 'Benefits'}
                    {locale === 'vi' && 'Lợi Ích'}
                    {locale === 'zh-cn' && '福利'}
                    {locale === 'zh-tw' && '福利'}
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits_en.split('\n').filter((item) => item.trim()).map((item, idx) => (
                      <li key={idx} className="text-gray-400 flex gap-3">
                        <span className="text-brand-primary mt-1">•</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-28 bg-brand-surface border border-brand-border rounded-lg p-6">
                <h3 className="font-bold text-white mb-6">
                  {locale === 'en' && 'Interested in this role?'}
                  {locale === 'vi' && 'Quan Tâm Đến Vị Trí Này?'}
                  {locale === 'zh-cn' && '对这个角色感兴趣?'}
                  {locale === 'zh-tw' && '對這個角色感興趣?'}
                </h3>
                <button
                  onClick={() => router.push(`/${locale}/contact`)}
                  className="w-full px-6 py-3 rounded-full bg-brand-gradient text-white font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-[0.98] transition-all mb-4"
                >
                  {locale === 'en' && 'Apply Now'}
                  {locale === 'vi' && 'Ứng Tuyển Ngay'}
                  {locale === 'zh-cn' && '立即申请'}
                  {locale === 'zh-tw' && '立即申請'}
                </button>
                <p className="text-sm text-gray-400">
                  {locale === 'en' && 'Send us your resume and a brief introduction.'}
                  {locale === 'vi' && 'Gửi cho chúng tôi CV và giới thiệu ngắn của bạn.'}
                  {locale === 'zh-cn' && '向我们发送您的简历和简短介绍。'}
                  {locale === 'zh-tw' && '向我們發送您的履歷表和簡短介紹。'}
                </p>

                {jobs.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-brand-border">
                    <h4 className="text-white font-bold mb-4">
                      {locale === 'en' && 'Other Opportunities'}
                      {locale === 'vi' && 'Các Cơ Hội Khác'}
                      {locale === 'zh-cn' && '其他机会'}
                      {locale === 'zh-tw' && '其他機會'}
                    </h4>
                    <div className="space-y-3">
                      {jobs.map((otherJob) => (
                        <button
                          key={otherJob.id}
                          onClick={() => router.push(`/${locale}/careers/${otherJob.slug}`)}
                          className="block text-sm text-brand-primary hover:text-brand-primary/80 transition-colors text-left"
                        >
                          {getJobTitle(otherJob)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function JobDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const [locale, setLocale] = useState<Locale>('vi');
  const [slug, setSlug] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      const { locale: localeParam, slug: slugParam } = await params;
      setLocale(localeParam);
      setSlug(slugParam);
      setIsReady(true);
    };

    initPage();
  }, [params]);

  if (!isReady) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDetailContent locale={locale} slug={slug} />
    </Suspense>
  );
}
