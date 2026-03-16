// Structured Content Data for CMS
// This file contains all website content in a structured, multilingual format
// Ready to be replaced with database queries

import { Locale } from '@/lib/i18n';

// ============ TYPES ============

export interface LocalizedContent {
  en: string;
  vi: string;
  'zh-cn': string;
  'zh-tw': string;
}

export interface PageMetadata {
  title: LocalizedContent;
  description: LocalizedContent;
  keywords?: LocalizedContent;
}

export interface Service {
  id: string;
  slug: string;
  icon: string; // Phosphor icon name
  color: string; // Tailwind color
  title: LocalizedContent;
  shortDescription: LocalizedContent;
  fullDescription: LocalizedContent;
  features: LocalizedContent[];
  deliverables: LocalizedContent[];
  idealFor: LocalizedContent[];
  sortOrder: number;
  isPublished: boolean;
  featured: boolean;
}

export interface Job {
  id: string;
  slug: string;
  title: LocalizedContent;
  department: LocalizedContent;
  location: LocalizedContent;
  employmentType: LocalizedContent; // 'Full-time' | 'Internship' | 'Contract'
  overview: LocalizedContent;
  responsibilities: LocalizedContent[];
  requirements: LocalizedContent[];
  preferredSkills: LocalizedContent[];
  benefits: LocalizedContent[];
  sortOrder: number;
  isPublished: boolean;
  featured: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: LocalizedContent;
  clientType: LocalizedContent;
  industry: LocalizedContent;
  shortSummary: LocalizedContent;
  challenge: LocalizedContent;
  strategy: LocalizedContent;
  execution: LocalizedContent;
  results: LocalizedContent[];
  sortOrder: number;
  isPublished: boolean;
  featured: boolean;
}

export interface FAQ {
  id: string;
  question: LocalizedContent;
  answer: LocalizedContent;
  category: LocalizedContent;
  sortOrder: number;
  isPublished: boolean;
}

// ============ SERVICES DATA ============

export const services: Service[] = [
  {
    id: 'meta-ads',
    slug: 'meta-ads-architecture',
    icon: 'facebook-logo',
    color: 'blue-500',
    title: {
      en: 'Meta Ads Architecture',
      vi: 'Kiến Trúc Quảng Cáo Meta',
      'zh-cn': 'Meta 广告架构',
      'zh-tw': 'Meta 廣告架構',
    },
    shortDescription: {
      en: 'Advanced audience structuring and dynamic creative testing for maximum ROAS.',
      vi: 'Cấu trúc khán giả nâng cao và kiểm tra sáng tạo động để có ROAS tối đa.',
      'zh-cn': '高级受众结构和动态创意测试以获得最大 ROAS。',
      'zh-tw': '進階受眾結構和動態創意測試以獲得最大 ROAS。',
    },
    fullDescription: {
      en: 'We structure ad accounts built for machine learning. Moving away from manual tweaking to dynamic creative testing and broad audience scaling on Facebook and Instagram.',
      vi: 'Chúng tôi cấu trúc các tài khoản quảng cáo được xây dựng cho máy học. Dịch chuyển từ điều chỉnh thủ công sang kiểm tra sáng tạo động và mở rộng khán giả trên Facebook và Instagram.',
      'zh-cn': '我们构建针对机器学习构建的广告账户。从手动调整转向动态创意测试和在 Facebook 和 Instagram 上的广泛受众扩展。',
      'zh-tw': '我們構建針對機器學習構建的廣告帳戶。從手動調整轉向動態創意測試和在 Facebook 和 Instagram 上的廣泛受眾擴展。',
    },
    features: [
      {
        en: 'Account Restructuring',
        vi: 'Tái Cấu Trúc Tài Khoản',
        'zh-cn': '账户重组',
        'zh-tw': '帳戶重組',
      },
      {
        en: 'Creative Testing Protocol',
        vi: 'Giao Thức Kiểm Tra Sáng Tạo',
        'zh-cn': '创意测试协议',
        'zh-tw': '創意測試協議',
      },
      {
        en: 'CAPI Integration',
        vi: 'Tích Hợp CAPI',
        'zh-cn': 'CAPI 集成',
        'zh-tw': 'CAPI 整合',
      },
    ],
    deliverables: [
      {
        en: 'Consolidating campaigns to feed algorithms faster and exit the learning phase.',
        vi: 'Hợp nhất các chiến dịch để cấp thức nhanh hơn và thoát khỏi giai đoạn học tập.',
        'zh-cn': '合并活动以更快地馈送算法并退出学习阶段。',
        'zh-tw': '合併活動以更快地饋送算法並退出學習階段。',
      },
    ],
    idealFor: [
      {
        en: 'D2C & E-commerce',
        vi: 'D2C & Thương Mại Điện Tử',
        'zh-cn': 'D2C & 电子商务',
        'zh-tw': 'D2C & 電子商務',
      },
    ],
    sortOrder: 1,
    isPublished: true,
    featured: true,
  },
  {
    id: 'google-ads',
    slug: 'google-ads-pmax',
    icon: 'google-logo',
    color: 'red-500',
    title: {
      en: 'Google Ads & PMax',
      vi: 'Quảng Cáo Google & PMax',
      'zh-cn': 'Google Ads & PMax',
      'zh-tw': 'Google Ads & PMax',
    },
    shortDescription: {
      en: 'Capture high-intent demand with precise search campaigns and optimized Performance Max builds.',
      vi: 'Nắm bắt nhu cầu có ý định cao với các chiến dịch tìm kiếm chính xác và xây dựng Hiệu suất Tối đa được tối ưu hóa.',
      'zh-cn': '通过精确的搜索活动和优化的 Performance Max 构建捕获高意图需求。',
      'zh-tw': '通過精確的搜尋活動和優化的 Performance Max 構建捕獲高意圖需求。',
    },
    fullDescription: {
      en: 'Capture high-intent demand. We architect precise search campaigns and deploy highly optimized Performance Max builds to dominate search engine results.',
      vi: 'Nắm bắt nhu cầu có ý định cao. Chúng tôi thiết kế các chiến dịch tìm kiếm chính xác và triển khai các bản dựng Hiệu suất Tối đa được tối ưu hóa cao để thống trị kết quả công cụ tìm kiếm.',
      'zh-cn': '捕获高意图需求。我们设计精确的搜索活动并部署高度优化的 Performance Max 构建以主导搜索引擎结果。',
      'zh-tw': '捕獲高意圖需求。我們設計精確的搜尋活動並部署高度優化的 Performance Max 構建以主導搜尋引擎結果。',
    },
    features: [
      {
        en: 'Performance Max Optimization',
        vi: 'Tối Ưu Hóa Hiệu Suất Tối Đa',
        'zh-cn': '性能最大化优化',
        'zh-tw': '性能最大化優化',
      },
    ],
    deliverables: [],
    idealFor: [
      {
        en: 'B2B SaaS',
        vi: 'B2B SaaS',
        'zh-cn': 'B2B SaaS',
        'zh-tw': 'B2B SaaS',
      },
    ],
    sortOrder: 2,
    isPublished: true,
    featured: true,
  },
  {
    id: 'tiktok-ads',
    slug: 'tiktok-ads-content',
    icon: 'tiktok-logo',
    color: 'white',
    title: {
      en: 'TikTok Ads & Content',
      vi: 'Quảng Cáo TikTok & Nội Dung',
      'zh-cn': 'TikTok 广告和内容',
      'zh-tw': 'TikTok 廣告和內容',
    },
    shortDescription: {
      en: 'Stop making ads. Start making TikToks with creator sourcing and aggressive media buying.',
      vi: 'Ngừng tạo quảng cáo. Bắt đầu tạo TikTok với tìm nguồn người sáng tạo và mua bán phương tiện tích cực.',
      'zh-cn': '停止制作广告。开始制作 TikTok 并进行创作者采购和激进的媒体购买。',
      'zh-tw': '停止製作廣告。開始製作 TikTok 並進行創意人採購和激進的媒體購買。',
    },
    fullDescription: {
      en: 'Stop making ads. Start making TikToks. We handle end-to-end TikTok growth, from creator sourcing and brief writing to aggressive media buying and Shop optimization.',
      vi: 'Ngừng tạo quảng cáo. Bắt đầu tạo TikTok. Chúng tôi xử lý tăng trưởng TikTok end-to-end, từ tìm nguồn người sáng tạo và viết tóm tắt đến mua bán phương tiện tích cực và tối ưu hóa cửa hàng.',
      'zh-cn': '停止制作广告。开始制作 TikTok。我们处理 TikTok 的端到端增长，从创意人采购和简介撰写到激进的媒体购买和商店优化。',
      'zh-tw': '停止製作廣告。開始製作 TikTok。我們處理 TikTok 的端到端增長，從創意人採購和簡介撰寫到激進的媒體購買和商店優化。',
    },
    features: [
      {
        en: 'TikTok Shop Operations',
        vi: 'Hoạt Động Cửa Hàng TikTok',
        'zh-cn': 'TikTok 商店运营',
        'zh-tw': 'TikTok 商店運營',
      },
    ],
    deliverables: [],
    idealFor: [
      {
        en: 'Modern D2C',
        vi: 'D2C Hiện Đại',
        'zh-cn': '现代 D2C',
        'zh-tw': '現代 D2C',
      },
    ],
    sortOrder: 3,
    isPublished: true,
    featured: true,
  },
  {
    id: 'web-dev',
    slug: 'web-saas-development',
    icon: 'code',
    color: 'purple-500',
    title: {
      en: 'Web & SaaS Development',
      vi: 'Phát Triển Web & SaaS',
      'zh-cn': 'Web 和 SaaS 开发',
      'zh-tw': 'Web 和 SaaS 開發',
    },
    shortDescription: {
      en: 'Lightning-fast Next.js websites and high-converting landing pages designed for performance.',
      vi: 'Trang web Next.js siêu nhanh và các trang đích có tỷ lệ chuyển đổi cao được thiết kế để có hiệu suất.',
      'zh-cn': '闪电般快速的 Next.js 网站和为性能而设计的高转换率登陆页面。',
      'zh-tw': '閃電般快速的 Next.js 網站和為性能而設計的高轉換率登陸頁面。',
    },
    fullDescription: {
      en: 'We write code that converts. Whether it\'s a blazing-fast Next.js marketing site, a custom internal tool, or a high-converting landing page, our engineering is purely outcome-driven.',
      vi: 'Chúng tôi viết mã chuyển đổi. Cho dù đó là trang tiếp thị Next.js siêu nhanh, một công cụ nội bộ tùy chỉnh, hay một trang đích có tỷ lệ chuyển đổi cao, kỹ thuật của chúng tôi hoàn toàn hướng đến kết quả.',
      'zh-cn': '我们编写转换代码。无论是闪电般快速的 Next.js 营销网站、自定义内部工具还是高转换率的登陆页面，我们的工程完全是结果驱动的。',
      'zh-tw': '我們編寫轉換代碼。無論是閃電般快速的 Next.js 營銷網站、自定義內部工具還是高轉換率的登陸頁面，我們的工程完全是結果驅動的。',
    },
    features: [],
    deliverables: [],
    idealFor: [],
    sortOrder: 4,
    isPublished: true,
    featured: false,
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation-pipelines',
    icon: 'robot',
    color: 'yellow-500',
    title: {
      en: 'AI Automation Pipelines',
      vi: 'Pipeline Tự Động Hóa AI',
      'zh-cn': 'AI 自动化管道',
      'zh-tw': 'AI 自動化管道',
    },
    shortDescription: {
      en: 'LLM-powered workflows to automate lead qualification, customer service, and insights.',
      vi: 'Quy trình làm việc được cung cấp LLM để tự động hóa xác định nhu cầu khách hàng tiềm năng, dịch vụ khách hàng và thông tin chi tiết.',
      'zh-cn': '由 LLM 驱动的工作流来自动化潜在客户资格认定、客户服务和见解。',
      'zh-tw': '由 LLM 驅動的工作流來自動化潛在客戶資格認定、客戶服務和見解。',
    },
    fullDescription: {
      en: 'Stop throwing human hours at machine tasks. We integrate LLMs and deep automations into your sales and marketing pipelines to drastically cut operational overhead.',
      vi: 'Ngừng ném giờ con người vào các tác vụ máy. Chúng tôi tích hợp LLM và tự động hóa sâu vào các pipeline tiếp thị và bán hàng của bạn để giảm đáng kể chi phí hoạt động.',
      'zh-cn': '停止将人力投入到机器任务中。我们将 LLM 和深度自动化集成到您的销售和营销管道中，以大幅降低运营开销。',
      'zh-tw': '停止將人力投入到機器任務中。我們將 LLM 和深度自動化集成到您的銷售和營銷管道中，以大幅降低運營開銷。',
    },
    features: [],
    deliverables: [],
    idealFor: [],
    sortOrder: 5,
    isPublished: true,
    featured: false,
  },
  {
    id: 'ecommerce-growth',
    slug: 'ecommerce-strategy',
    icon: 'shopping-cart',
    color: 'cyan-500',
    title: {
      en: 'E-commerce Strategy',
      vi: 'Chiến Lược Thương Mại Điện Tử',
      'zh-cn': '电子商务战略',
      'zh-tw': '電子商務戰略',
    },
    shortDescription: {
      en: 'Fix leaking funnels and maximize Customer Lifetime Value with retention strategies.',
      vi: 'Khắc phục các phễu rò rỉ và tối đa hóa Giá trị Thời gian Tồn tại của Khách hàng với các chiến lược giữ chân.',
      'zh-cn': '修复泄漏的漏斗并通过保留策略最大化客户生命周期价值。',
      'zh-tw': '修復泄漏的漏斗並通過保留策略最大化客戶生命週期價值。',
    },
    fullDescription: {
      en: 'Beyond just acquiring traffic, we fix leaking funnels. We optimize your store\'s architecture, implement robust retention strategies, and maximize Customer Lifetime Value (LTV).',
      vi: 'Ngoài việc chỉ thu hút lưu lượng truy cập, chúng tôi khắc phục các phễu rò rỉ. Chúng tôi tối ưu hóa kiến trúc cửa hàng của bạn, triển khai các chiến lược giữ chân mạnh mẽ và tối đa hóa Giá trị Thời gian Tồn tại của Khách hàng (LTV).',
      'zh-cn': '除了仅仅获得流量，我们还修复泄漏的漏斗。我们优化您的商店架构，实施强大的保留策略，并最大化客户生命周期价值 (LTV)。',
      'zh-tw': '除了僅僅獲得流量，我們還修復泄漏的漏斗。我們優化您的商店架構，實施強大的保留策略，並最大化客戶生命週期價值 (LTV)。',
    },
    features: [],
    deliverables: [],
    idealFor: [],
    sortOrder: 6,
    isPublished: true,
    featured: false,
  },
  {
    id: 'china-market',
    slug: 'china-market-expansion',
    icon: 'globe',
    color: 'red-600',
    title: {
      en: 'China Market Expansion',
      vi: 'Mở Rộng Thị Trường Trung Quốc',
      'zh-cn': '中国市场扩展',
      'zh-tw': '中國市場擴展',
    },
    shortDescription: {
      en: 'Localized strategies for penetrating the Chinese market with platform expertise and cultural understanding.',
      vi: 'Các chiến lược địa phương hóa để xâm nhập thị trường Trung Quốc với chuyên môn nền tảng và hiểu biết về văn hóa.',
      'zh-cn': '本地化战略，以利用平台专业知识和文化理解来开发中国市场。',
      'zh-tw': '本地化戰略，以利用平台專業知識和文化理解來開發中國市場。',
    },
    fullDescription: {
      en: 'Expanding internationally? We specialize in helping brands penetrate the Chinese market with localized strategies, platform expertise, and cultural understanding tailored to Chinese consumer behavior.',
      vi: 'Mở rộng quốc tế? Chúng tôi chuyên giúp các thương hiệu xâm nhập thị trường Trung Quốc với các chiến lược địa phương hóa, chuyên môn nền tảng và hiểu biết về văn hóa được điều chỉnh cho hành vi của người tiêu dùng Trung Quốc.',
      'zh-cn': '准备国际扩展？我们专门帮助品牌通过针对中国消费者行为的本地化战略、平台专业知识和文化理解来渗透中国市场。',
      'zh-tw': '準備國際擴展？我們專門幫助品牌通過針對中國消費者行為的本地化戰略、平台專業知識和文化理解來滲透中國市場。',
    },
    features: [],
    deliverables: [],
    idealFor: [],
    sortOrder: 7,
    isPublished: true,
    featured: false,
  },
  {
    id: 'analytics',
    slug: 'analytics-tracking',
    icon: 'chart-line-up',
    color: 'green-500',
    title: {
      en: 'Analytics & Tracking',
      vi: 'Phân Tích & Theo Dõi',
      'zh-cn': '分析和追踪',
      'zh-tw': '分析和追踪',
    },
    shortDescription: {
      en: 'Enterprise-grade server-side tracking for crystal-clear attribution and data accuracy.',
      vi: 'Theo dõi phía máy chủ cấp doanh nghiệp để có giải thích rõ ràng và độ chính xác dữ liệu.',
      'zh-cn': '企业级服务器端跟踪以实现清晰的归因和数据准确性。',
      'zh-tw': '企業級服務器端跟踪以實現清晰的歸因和數據準確性。',
    },
    fullDescription: {
      en: 'Bad data leads to bad media buying. We deploy enterprise-grade server-side tracking to bypass ad blockers, circumvent iOS restrictions, and provide crystal-clear attribution.',
      vi: 'Dữ liệu xấu dẫn đến mua bán phương tiện xấu. Chúng tôi triển khai theo dõi phía máy chủ cấp doanh nghiệp để vượt qua các trình chặn quảng cáo, vòng qua các hạn chế iOS và cung cấp giải thích rõ ràng.',
      'zh-cn': '糟糕的数据导致糟糕的媒体购买。我们部署企业级服务器端跟踪来绕过广告拦截器、规避 iOS 限制并提供清晰的归因。',
      'zh-tw': '糟糕的數據導致糟糕的媒體購買。我們部署企業級服務器端跟踪來繞過廣告攔截器、規避 iOS 限制並提供清晰的歸因。',
    },
    features: [],
    deliverables: [],
    idealFor: [],
    sortOrder: 8,
    isPublished: true,
    featured: false,
  },
];

// ============ JOBS DATA ============

export const jobs: Job[] = [
  {
    id: 'tiktok-specialist',
    slug: 'tiktok-ads-specialist',
    title: {
      en: 'TikTok Ads Specialist',
      vi: 'Chuyên Gia Quảng Cáo TikTok',
      'zh-cn': 'TikTok 广告专家',
      'zh-tw': 'TikTok 廣告專家',
    },
    department: {
      en: 'Advertising / Marketing',
      vi: 'Quảng Cáo / Tiếp Thị',
      'zh-cn': '广告 / 营销',
      'zh-tw': '廣告 / 行銷',
    },
    location: {
      en: 'Ho Chi Minh City',
      vi: 'Thành Phố Hồ Chí Minh',
      'zh-cn': '胡志明市',
      'zh-tw': '胡志明市',
    },
    employmentType: {
      en: 'Full-time',
      vi: 'Toàn Thời Gian',
      'zh-cn': '全职',
      'zh-tw': '全職',
    },
    overview: {
      en: 'Manage high-performing TikTok ad accounts. Run multi-million dollar campaigns. Scale D2C and e-commerce brands on the fastest-growing platform.',
      vi: 'Quản lý các tài khoản quảng cáo TikTok hiệu suất cao. Chạy các chiến dịch có giá trị hàng triệu đô la. Mở rộng các thương hiệu D2C và thương mại điện tử trên nền tảng phát triển nhanh nhất.',
      'zh-cn': '管理高性能 TikTok 广告账户。运营价值数百万美元的活动。在增长最快的平台上扩展 D2C 和电子商务品牌。',
      'zh-tw': '管理高性能 TikTok 廣告帳戶。運營價值數百萬美元的活動。在增長最快的平台上擴展 D2C 和電子商務品牌。',
    },
    responsibilities: [
      {
        en: 'Create and manage TikTok ad campaigns across multiple client accounts',
        vi: 'Tạo và quản lý các chiến dịch quảng cáo TikTok trên nhiều tài khoản khách hàng',
        'zh-cn': '在多个客户账户上创建和管理 TikTok 广告活动',
        'zh-tw': '在多個客戶帳戶上創建和管理 TikTok 廣告活動',
      },
      {
        en: 'Test and optimize creatives, audiences, and bidding strategies',
        vi: 'Kiểm tra và tối ưu hóa chiến lược sáng tạo, khán giả và đấu thầu',
        'zh-cn': '测试和优化创意、受众和竞价策略',
        'zh-tw': '測試和優化創意、受眾和競價策略',
      },
      {
        en: 'Work with content creators and UGC production teams',
        vi: 'Làm việc với các nhà sáng tạo nội dung và các đội sản xuất UGC',
        'zh-cn': '与内容创作者和 UGC 制作团队合作',
        'zh-tw': '與內容創作者和 UGC 製作團隊合作',
      },
      {
        en: 'Manage TikTok Shop integrations and product feed optimization',
        vi: 'Quản lý tích hợp Cửa hàng TikTok và tối ưu hóa nguồn cấp sản phẩm',
        'zh-cn': '管理 TikTok Shop 集成和产品信息源优化',
        'zh-tw': '管理 TikTok Shop 集成和產品信息源優化',
      },
      {
        en: 'Provide weekly performance reports and strategic recommendations',
        vi: 'Cung cấp báo cáo hiệu suất hàng tuần và đề xuất chiến lược',
        'zh-cn': '提供每周性能报告和战略建议',
        'zh-tw': '提供每週性能報告和戰略建議',
      },
    ],
    requirements: [
      {
        en: '2+ years of experience managing TikTok or social media advertising campaigns',
        vi: '2 năm trở lên kinh nghiệm quản lý các chiến dịch quảng cáo TikTok hoặc truyền thông xã hội',
        'zh-cn': '2 年以上 TikTok 或社交媒体广告活动管理经验',
        'zh-tw': '2 年以上 TikTok 或社交媒體廣告活動管理經驗',
      },
      {
        en: 'Strong understanding of e-commerce metrics and conversion tracking',
        vi: 'Hiểu biết sâu sắc về các số liệu thương mại điện tử và theo dõi chuyển đổi',
        'zh-cn': '对电子商务指标和转换跟踪的深入了解',
        'zh-tw': '對電子商務指標和轉換跟踪的深入了解',
      },
      {
        en: 'Proficiency with TikTok Ads Manager and analytics tools',
        vi: 'Thành thạo TikTok Ads Manager và các công cụ phân tích',
        'zh-cn': 'TikTok Ads Manager 和分析工具的熟练使用',
        'zh-tw': 'TikTok Ads Manager 和分析工具的熟練使用',
      },
      {
        en: 'Excellent communication and presentation skills',
        vi: 'Kỹ năng giao tiếp và thuyết trình xuất sắc',
        'zh-cn': '优秀的沟通和演示技能',
        'zh-tw': '優秀的溝通和演示技能',
      },
    ],
    preferredSkills: [
      {
        en: 'Experience with Shopify or other e-commerce platforms',
        vi: 'Kinh nghiệm với Shopify hoặc các nền tảng thương mại điện tử khác',
        'zh-cn': 'Shopify 或其他电子商务平台的经验',
        'zh-tw': 'Shopify 或其他電子商務平台的經驗',
      },
      {
        en: 'Familiarity with creator management and UGC content strategies',
        vi: 'Quen thuộc với quản lý người sáng tạo và chiến lược nội dung UGC',
        'zh-cn': '熟悉创作者管理和 UGC 内容策略',
        'zh-tw': '熟悉創作者管理和 UGC 內容策略',
      },
    ],
    benefits: [
      {
        en: 'Competitive salary + performance bonuses',
        vi: 'Lương cạnh tranh + thưởng hiệu suất',
        'zh-cn': '具有竞争力的薪资 + 绩效奖金',
        'zh-tw': '具有競爭力的薪資 + 績效獎金',
      },
      {
        en: 'Professional development and training budget',
        vi: 'Ngân sách phát triển chuyên nghiệp và đào tạo',
        'zh-cn': '专业发展和培训预算',
        'zh-tw': '專業發展和培訓預算',
      },
      {
        en: 'Health insurance and benefits package',
        vi: 'Bảo hiểm sức khỏe và gói lợi ích',
        'zh-cn': '健康保险和福利套餐',
        'zh-tw': '健康保險和福利套餐',
      },
    ],
    sortOrder: 1,
    isPublished: true,
    featured: true,
  },
  // Add more jobs following same structure - truncating for brevity
];

// ============ CASE STUDIES DATA ============

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-case-1',
    slug: 'd2c-brand-100x-growth',
    title: {
      en: 'D2C Brand: 100x Revenue Growth in 18 Months',
      vi: 'Thương Hiệu D2C: Tăng Trưởng Doanh Thu 100x Trong 18 Tháng',
      'zh-cn': 'D2C 品牌：18 个月内收入增长 100 倍',
      'zh-tw': 'D2C 品牌：18 個月內收入增長 100 倍',
    },
    clientType: {
      en: 'E-commerce / Direct-to-Consumer',
      vi: 'Thương Mại Điện Tử / Bán Trực Tiếp Cho Người Tiêu Dùng',
      'zh-cn': '电子商务 / 直接面向消费者',
      'zh-tw': '電子商務 / 直接面向消費者',
    },
    industry: {
      en: 'Lifestyle Products',
      vi: 'Sản Phẩm Lối Sống',
      'zh-cn': '生活方式产品',
      'zh-tw': '生活方式產品',
    },
    shortSummary: {
      en: 'Scaled a lifestyle brand from $50k to $5M+ monthly revenue through integrated Meta/TikTok strategy and custom SaaS platform.',
      vi: 'Mở rộng một thương hiệu lối sống từ 50 nghìn đô la lên doanh thu hàng tháng 5 triệu đô la trở lên thông qua chiến lược Meta/TikTok tích hợp và nền tảng SaaS tùy chỉnh.',
      'zh-cn': '通过集成的 Meta/TikTok 策略和定制 SaaS 平台，将生活方式品牌从 5 万美元扩展到月收入 500 万美元以上。',
      'zh-tw': '通過集成的 Meta/TikTok 策略和定制 SaaS 平台，將生活方式品牌從 5 萬美元擴展到月收入 500 萬美元以上。',
    },
    challenge: {
      en: 'The brand was spending $200k/month on paid ads but struggling to scale profitably. High CAC, low LTV, poor retention.',
      vi: 'Thương hiệu đang chi 200 nghìn đô la mỗi tháng cho quảng cáo trả phí nhưng vất vả khi mở rộng một cách có lãi. CAC cao, LTV thấp, giữ chân kém.',
      'zh-cn': '该品牌每月在付费广告上支出 20 万美元，但在有利可图地扩展方面苦苦挣扎。高 CAC、低 LTV、保留率差。',
      'zh-tw': '該品牌每月在付費廣告上支出 20 萬美元，但在有利可圖地擴展方面苦苦掙扎。高 CAC、低 LTV、保留率差。',
    },
    strategy: {
      en: 'We restructured their ad stack (Meta/TikTok), implemented server-side tracking, built a custom post-purchase upsell platform, and optimized email/SMS retention flows.',
      vi: 'Chúng tôi tái cấu trúc ngăn xếp quảng cáo của họ (Meta/TikTok), triển khai theo dõi phía máy chủ, xây dựng nền tảng upsell sau mua hàng tùy chỉnh và tối ưu hóa các luồng giữ chân email/SMS.',
      'zh-cn': '我们重组了他们的广告栈 (Meta/TikTok)、实施了服务器端跟踪、构建了定制的购后向上销售平台，并优化了电子邮件/短信保留流程。',
      'zh-tw': '我們重組了他們的廣告棧 (Meta/TikTok)、實施了服務器端跟踪、構建了定制的購後向上銷售平台，並優化了電子郵件/短信保留流程。',
    },
    execution: {
      en: 'Month 1-2: Audit & restructuring. Month 3-6: Creative testing & platform optimization. Month 7-12: Scaling with profitability focus. Month 13-18: Expansion into new markets.',
      vi: 'Tháng 1-2: Kiểm tra & tái cấu trúc. Tháng 3-6: Kiểm tra sáng tạo & tối ưu hóa nền tảng. Tháng 7-12: Mở rộng với tập trung vào khả năng sinh lời. Tháng 13-18: Mở rộng vào các thị trường mới.',
      'zh-cn': '第 1-2 个月：审计和重组。第 3-6 个月：创意测试和平台优化。第 7-12 个月：以盈利能力为重点的扩展。第 13-18 个月：向新市场扩展。',
      'zh-tw': '第 1-2 個月：審計和重組。第 3-6 個月：創意測試和平台優化。第 7-12 個月：以盈利能力為重點的擴展。第 13-18 個月：向新市場擴展。',
    },
    results: [
      {
        en: 'Monthly revenue: $50k → $5.2M (104x growth)',
        vi: 'Doanh thu hàng tháng: 50 nghìn đô la → 5,2 triệu đô la (tăng trưởng 104 lần)',
        'zh-cn': '月度收入：5 万美元 → 520 万美元（增长 104 倍）',
        'zh-tw': '月度收入：5 萬美元 → 520 萬美元（增長 104 倍）',
      },
      {
        en: 'CAC reduced from $85 to $32 (-62%)',
        vi: 'CAC giảm từ 85 đô la xuống 32 đô la (-62%)',
        'zh-cn': 'CAC 从 $85 降至 $32 (-62%)',
        'zh-tw': 'CAC 從 $85 降至 $32 (-62%)',
      },
      {
        en: 'LTV increased 320% through retention optimization',
        vi: 'LTV tăng 320% thông qua tối ưu hóa giữ chân',
        'zh-cn': '通过保留优化，LTV 增长 320%',
        'zh-tw': '通過保留優化，LTV 增長 320%',
      },
      {
        en: 'ROAS improved from 2.1x to 4.8x across all channels',
        vi: 'ROAS cải thiện từ 2,1x lên 4,8x trên tất cả các kênh',
        'zh-cn': '所有渠道的 ROAS 从 2.1 倍改进到 4.8 倍',
        'zh-tw': '所有渠道的 ROAS 從 2.1 倍改進到 4.8 倍',
      },
    ],
    sortOrder: 1,
    isPublished: true,
    featured: true,
  },
];

// ============ FAQ DATA ============

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: {
      en: 'What services does Media Today offer?',
      vi: 'Media Today cung cấp những dịch vụ nào?',
      'zh-cn': 'Media Today 提供哪些服务？',
      'zh-tw': 'Media Today 提供哪些服務？',
    },
    answer: {
      en: 'We specialize in Meta Ads, Google Ads, TikTok growth, high-converting web development, AI automation, e-commerce optimization, analytics setup, and China market expansion.',
      vi: 'Chúng tôi chuyên về Quảng cáo Meta, Quảng cáo Google, tăng trưởng TikTok, phát triển web chuyển đổi cao, tự động hóa AI, tối ưu hóa thương mại điện tử, thiết lập phân tích và mở rộng thị trường Trung Quốc.',
      'zh-cn': '我们专门从事 Meta 广告、Google 广告、TikTok 增长、高转换率网络开发、AI 自动化、电子商务优化、分析设置和中国市场扩展。',
      'zh-tw': '我們專門從事 Meta 廣告、Google 廣告、TikTok 增長、高轉換率網絡開發、AI 自動化、電子商務優化、分析設置和中國市場擴展。',
    },
    category: {
      en: 'Services',
      vi: 'Dịch Vụ',
      'zh-cn': '服务',
      'zh-tw': '服務',
    },
    sortOrder: 1,
    isPublished: true,
  },
];

// Helper function to get content by locale
export function getLocalizedContent<T extends Record<Locale, any>>(
  content: T,
  locale: Locale
): T[Locale] {
  return content[locale] || content.vi; // Default to Vietnamese if locale not found
}
