// Internationalization configuration and utilities

export type Locale = 'en' | 'vi' | 'zh-cn' | 'zh-tw';

export const locales: Locale[] = ['en', 'vi', 'zh-cn', 'zh-tw'];
export const defaultLocale: Locale = 'vi';

export const localeNames: Record<Locale, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  'zh-cn': { name: 'Simplified Chinese', nativeName: '简体中文' },
  'zh-tw': { name: 'Traditional Chinese', nativeName: '繁體中文' },
};

// Translation keys type - useful for type-safe translations
export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    solutions: string;
    caseStudies: string;
    careers: string;
    contact: string;
  };
  // Common
  common: {
    viewDetails: string;
    learnMore: string;
    applyNow: string;
    getProposal: string;
    bookConsultation: string;
    contactUs: string;
    submitForm: string;
    email: string;
    phone: string;
    address: string;
  };
  // Footer
  footer: {
    description: string;
    companyLinks: string;
    servicesLinks: string;
    contactInfo: string;
    privacyPolicy: string;
    termsOfService: string;
    copyright: string;
  };
}

// Helper function to get translations for a locale
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}

const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      solutions: 'Solutions',
      caseStudies: 'Case Studies',
      careers: 'Careers',
      contact: 'Contact',
    },
    common: {
      viewDetails: 'View Details',
      learnMore: 'Learn more',
      applyNow: 'Apply Now',
      getProposal: 'Get Proposal',
      bookConsultation: 'Book a Consultation',
      contactUs: 'Contact Us',
      submitForm: 'Submit Form',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
    },
    footer: {
      description: 'A modern digital marketing and technology agency. We combine data-driven ad buying, AI automation, and technical development to scale brands locally and globally.',
      companyLinks: 'Company',
      servicesLinks: 'Services',
      contactInfo: 'Get in Touch',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      copyright: 'All rights reserved',
    },
  },
  vi: {
    nav: {
      home: 'Trang Chủ',
      about: 'Về Chúng Tôi',
      services: 'Dịch Vụ',
      solutions: 'Giải Pháp',
      caseStudies: 'Case Studies',
      careers: 'Tuyển Dụng',
      contact: 'Liên Hệ',
    },
    common: {
      viewDetails: 'Xem Chi Tiết',
      learnMore: 'Tìm hiểu thêm',
      applyNow: 'Ứng Tuyển Ngay',
      getProposal: 'Nhận Đề Xuất',
      bookConsultation: 'Đặt Lịch Tư Vấn',
      contactUs: 'Liên Hệ Chúng Tôi',
      submitForm: 'Gửi Biểu Mẫu',
      email: 'Email',
      phone: 'Điện Thoại',
      address: 'Địa Chỉ',
    },
    footer: {
      description: 'Một công ty tiếp thị kỹ thuật số và công nghệ hiện đại. Chúng tôi kết hợp đặt mua quảng cáo dựa trên dữ liệu, tự động hóa AI và phát triển kỹ thuật để mở rộng thương hiệu trong nước và toàn cầu.',
      companyLinks: 'Công Ty',
      servicesLinks: 'Dịch Vụ',
      contactInfo: 'Liên Hệ',
      privacyPolicy: 'Chính Sách Bảo Mật',
      termsOfService: 'Điều Khoản Dịch Vụ',
      copyright: 'Bản quyền được bảo lưu',
    },
  },
  'zh-cn': {
    nav: {
      home: '首页',
      about: '关于',
      services: '服务',
      solutions: '解决方案',
      caseStudies: '案例研究',
      careers: '招聘',
      contact: '联系',
    },
    common: {
      viewDetails: '查看详情',
      learnMore: '了解更多',
      applyNow: '立即申请',
      getProposal: '获取提案',
      bookConsultation: '预订咨询',
      contactUs: '联系我们',
      submitForm: '提交表格',
      email: '电子邮件',
      phone: '电话',
      address: '地址',
    },
    footer: {
      description: '一家现代数字营销和技术机构。我们结合了数据驱动的广告购买、AI 自动化和技术开发，以扩展本地和全球品牌。',
      companyLinks: '公司',
      servicesLinks: '服务',
      contactInfo: '联系我们',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款',
      copyright: '版权所有',
    },
  },
  'zh-tw': {
    nav: {
      home: '首頁',
      about: '關於',
      services: '服務',
      solutions: '解決方案',
      caseStudies: '案例研究',
      careers: '招聘',
      contact: '聯絡',
    },
    common: {
      viewDetails: '查看詳情',
      learnMore: '深入瞭解',
      applyNow: '立即申請',
      getProposal: '獲取提案',
      bookConsultation: '預約諮詢',
      contactUs: '聯絡我們',
      submitForm: '提交表單',
      email: '電子郵件',
      phone: '電話',
      address: '地址',
    },
    footer: {
      description: '一家現代數位行銷和技術機構。我們結合數據驅動的廣告購買、AI 自動化和技術開發，以擴展本地和全球品牌。',
      companyLinks: '公司',
      servicesLinks: '服務',
      contactInfo: '聯絡我們',
      privacyPolicy: '隱私政策',
      termsOfService: '服務條款',
      copyright: '版權所有',
    },
  },
};
