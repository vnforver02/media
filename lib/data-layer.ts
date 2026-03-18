/**
 * Unified Data Access Layer for Media Today CMS
 * All frontend pages must use these functions to fetch content from database
 */

export type Language = 'en' | 'vi' | 'zh_cn' | 'zh_tw';

// Site Settings
export interface SiteSettings {
  id: number;
  site_name: string;
  logo: string;
  default_language: string;
  company_email: string;
  company_phone: string;
  company_phone_whatsapp: string;
  address_en: string;
  address_vi: string;
  address_zh_cn: string;
  address_zh_tw: string;
  founded_year: number;
  company_intro_en: string;
  company_intro_vi: string;
  company_intro_zh_cn: string;
  company_intro_zh_tw: string;
  seo_title_en: string;
  seo_description_en: string;
  social_facebook: string;
  social_linkedin: string;
  social_instagram: string;
  updated_at: string;
}

// Services
export interface Service {
  id: number;
  slug: string;
  icon: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  description_en: string;
  description_vi: string;
  description_zh_cn: string;
  description_zh_tw: string;
  full_description_en: string;
  full_description_vi: string;
  full_description_zh_cn: string;
  full_description_zh_tw: string;
  sort_order: number;
  is_published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Case Studies
export interface CaseStudy {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  cover_image: string;
  client_type_en: string;
  client_type_vi: string;
  client_type_zh_cn: string;
  client_type_zh_tw: string;
  industry_en: string;
  industry_vi: string;
  industry_zh_cn: string;
  industry_zh_tw: string;
  summary_en: string;
  summary_vi: string;
  summary_zh_cn: string;
  summary_zh_tw: string;
  challenge_en: string;
  challenge_vi: string;
  challenge_zh_cn: string;
  challenge_zh_tw: string;
  strategy_en: string;
  strategy_vi: string;
  strategy_zh_cn: string;
  strategy_zh_tw: string;
  execution_en: string;
  execution_vi: string;
  execution_zh_cn: string;
  execution_zh_tw: string;
  results_en: string;
  results_vi: string;
  results_zh_cn: string;
  results_zh_tw: string;
  seo_title_en: string;
  seo_description_en: string;
  is_published: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Jobs
export interface Job {
  id: number;
  slug: string;
  title_en: string;
  title_vi: string;
  title_zh_cn: string;
  title_zh_tw: string;
  department_en: string;
  department_vi: string;
  department_zh_cn: string;
  department_zh_tw: string;
  location_en: string;
  location_vi: string;
  location_zh_cn: string;
  location_zh_tw: string;
  employment_type_en: string;
  employment_type_vi: string;
  employment_type_zh_cn: string;
  employment_type_zh_tw: string;
  overview_en: string;
  overview_vi: string;
  overview_zh_cn: string;
  overview_zh_tw: string;
  responsibilities_en: string;
  responsibilities_vi: string;
  responsibilities_zh_cn: string;
  responsibilities_zh_tw: string;
  requirements_en: string;
  requirements_vi: string;
  requirements_zh_cn: string;
  requirements_zh_tw: string;
  preferred_skills_en: string;
  preferred_skills_vi: string;
  preferred_skills_zh_cn: string;
  preferred_skills_zh_tw: string;
  benefits_en: string;
  benefits_vi: string;
  benefits_zh_cn: string;
  benefits_zh_tw: string;
  is_published: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Contact Lead
export interface ContactLead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service_needed_en: string;
  monthly_budget: number;
  message: string;
  status: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
}

// Navigation
export interface NavItem {
  id: number;
  label_en: string;
  label_vi: string;
  label_zh_cn: string;
  label_zh_tw: string;
  path: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

// ============ FETCH FUNCTIONS ============

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_BASE}/api/site-settings`, { cache: 'revalidate' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}

/**
 * Get all published services
 */
export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/api/services`, { cache: 'revalidate' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

/**
 * Get single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const services = await getServices();
    return services.find(s => s.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch service:', error);
    return null;
  }
}

/**
 * Get all published case studies
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${API_BASE}/api/case-studies`, { cache: 'revalidate' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return [];
  }
}

/**
 * Get single case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const caseStudies = await getCaseStudies();
    return caseStudies.find(c => c.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    return null;
  }
}

/**
 * Get all published jobs
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_BASE}/api/jobs`, { cache: 'revalidate' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

/**
 * Get single job by slug
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const jobs = await getJobs();
    return jobs.find(j => j.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return null;
  }
}

/**
 * Get navigation items
 */
export async function getNavigation(): Promise<NavItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/navigation`, { cache: 'revalidate' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
    return [];
  }
}

/**
 * Helper to get translated field
 */
export function getTranslated(
  obj: any,
  field: string,
  language: Language
): string {
  if (language === 'en') return obj[`${field}_en`] || '';
  if (language === 'vi') return obj[`${field}_vi`] || '';
  if (language === 'zh_cn') return obj[`${field}_zh_cn`] || '';
  if (language === 'zh_tw') return obj[`${field}_zh_tw`] || '';
  return obj[`${field}_en`] || '';
}
