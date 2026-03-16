# Media Today - Multilingual Admin CMS System

## 🎯 Overview

This is a complete multilingual Content Management System (CMS) for Media Today built with Next.js 15. The system includes:

- **Frontend**: 4-language multilingual website (`/en`, `/vi`, `/zh-cn`, `/zh-tw`)
- **Admin Panel**: Secure backend to manage all website content
- **Data Management**: Structured content ready for database integration
- **Authentication**: Protected admin routes with mock authentication

---

## 📋 Quick Start

### Admin Login

**URL**: `http://localhost:3000/admin/login`

**Demo Credentials:**
- Username: `admin`
- Password: `demo2024`

### Accessing the Frontend

- English: `http://localhost:3000/en`
- Vietnamese: `http://localhost:3000/vi`
- Simplified Chinese: `http://localhost:3000/zh-cn`
- Traditional Chinese: `http://localhost:3000/zh-tw`

---

## 🏗️ Project Architecture

### Directory Structure

```
/app
  /[locale]                    # Multilingual frontend pages
    /page.tsx                 # Home page
    /about/page.tsx
    /services/page.tsx
    /careers/page.tsx
    /case-studies/page.tsx
    /contact/page.tsx
  /admin                       # Admin CMS area
    /login/page.tsx           # Admin login page
    /layout.tsx               # Admin layout with sidebar
    /page.tsx                 # Dashboard
    /services/page.tsx        # Services management
    /careers/page.tsx         # Jobs management
    /case-studies/page.tsx    # Case studies management
    /leads/page.tsx           # Contact form leads
    /pages/page.tsx           # Page content management
    /faqs/page.tsx            # FAQ management
    /navigation/page.tsx      # Navigation menu
    /settings/page.tsx        # Site settings
    /languages/page.tsx       # Language/translation management
    /media/page.tsx           # Media/image library

/components
  /site                        # Frontend components
    /LanguageSwitcher.tsx     # Language selector
  /admin                       # Admin components
    /AdminSidebar.tsx         # Admin navigation sidebar

/data
  /content.ts                  # All website content (structured & multilingual)

/lib
  /i18n.ts                    # Internationalization configuration
  /auth.ts                    # Admin authentication utility
  
/middleware.ts                # Locale routing middleware
```

---

## 🌐 Multilingual System

### Supported Languages

1. **English** (`en`) - Default for international audience
2. **Vietnamese** (`vi`) - Default locale, local market focus
3. **Simplified Chinese** (`zh-cn`) - Mainland China market
4. **Traditional Chinese** (`zh-tw`) - Taiwan/Hong Kong market

### How It Works

1. **URL-based routing**: All content is accessed via `/[locale]/path`
   - Middleware automatically redirects `/path` → `/vi/path` (default locale)

2. **Language Switcher**: Located in header, allows switching between languages
   - Preserves current page when switching
   - Stored in component state (can add localStorage persistence)

3. **Content Structure**: All content uses `LocalizedContent` type
   ```typescript
   interface LocalizedContent {
     en: string;
     vi: string;
     'zh-cn': string;
     'zh-tw': string;
   }
   ```

### Adding New Multilingual Content

In `/data/content.ts`:

```typescript
const newService: Service = {
  id: 'my-service',
  title: {
    en: 'Service Name in English',
    vi: 'Tên Dịch Vụ Tiếng Việt',
    'zh-cn': '服务名称 (简体中文)',
    'zh-tw': '服務名稱 (繁體中文)',
  },
  // ... other fields
};
```

---

## 🛠️ Admin CMS Features

### Dashboard (`/admin`)

Overview of:
- Published services count
- Active job postings
- Case studies
- Contact leads
- System status
- Recent activity

### Pages Management (`/admin/pages`)

Edit main website pages:
- Home page sections
- About page content
- Contact page details

### Services Management (`/admin/services`)

- View all services
- Publish/unpublish services
- Mark as featured
- Filter by status
- All 7 core services pre-loaded

### Careers & Jobs (`/admin/careers`)

- Post new job openings
- Manage existing positions
- Track applications
- Support for all 7 positions:
  - TikTok Ads Specialist
  - Facebook Ads Specialist
  - Google Ads Specialist
  - E-commerce Growth Intern
  - Marketing Intern
  - Content / Creative Support
  - Internal Accountant

### Contact Leads (`/admin/leads`)

- Track all form submissions
- Manage lead status (New → Contacted → Qualified → Closed)
- Search and filter leads
- View lead details
- Track monthly ad budget expectations

### Case Studies (`/admin/case-studies`)

- Add new case studies
- Manage client information
- Track project results
- Publish/unpublish

### FAQ Management (`/admin/faqs`)

- Create frequently asked questions
- Organize by category
- Translate to all languages

### Navigation (`/admin/navigation`)

- Manage header navigation menu
- Toggle visibility
- Reorder items
- Manage footer links

### Site Settings (`/admin/settings`)

Configure:
- Company name and branding
- Contact information (email, phone, WhatsApp, Zalo)
- Company address
- Founded year (2016)
- Social media links
- Default language
- SEO meta tags
- Company introduction

### Language Management (`/admin/languages`)

- View supported languages
- Manage translation status
- Switch between language contexts

### Media Manager (`/admin/media`)

- Upload images and media files
- Organize media library
- Link media to pages/posts

---

## 🔐 Authentication

### Current Implementation (Mock)

Located in `/lib/auth.ts`:

- **Mock credentials**: `admin` / `demo2024`
- **Session storage**: localStorage
- **Token storage**: JWT-like mock tokens
- **Protection**: Protected routes check `isAuthenticated()`

### Demo Admin User

```json
{
  "id": "1",
  "username": "admin",
  "email": "admin@mediatoday.com",
  "role": "admin"
}
```

### How to Upgrade to Real Authentication

Replace mock auth in `/lib/auth.ts` with:

1. **NextAuth.js** (recommended)
   - Database session storage
   - Multiple auth providers
   - Built-in security

2. **Clerk** (modern alternative)
   - OAuth + passkeys
   - Pre-built UI
   - Enterprise features

3. **Custom JWT + Database**
   - Fine-grained control
   - PostgreSQL/Neon integration
   - API-based validation

---

## 📊 Data Structure

### Content Schema (`/data/content.ts`)

All data is structured and type-safe:

```typescript
interface Service {
  id: string;
  slug: string;
  icon: string;           // Phosphor icon name
  color: string;          // Tailwind color
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
```

Similar structures for:
- `Job` (career postings)
- `CaseStudy` (portfolio items)
- `FAQ` (frequently asked questions)

---

## 🚀 Deploying to Production

### Before Deployment

1. **Replace Mock Data**
   - Switch from `/data/content.ts` to real database queries
   - Update API routes to fetch from database

2. **Implement Real Authentication**
   - Set up NextAuth.js or alternative
   - Configure database for user sessions
   - Add password hashing

3. **Add Database**
   - Create Neon PostgreSQL project
   - Create tables for content, users, leads
   - Migrate `/data/content.ts` to database

4. **Environment Variables**
   ```env
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=...
   ```

5. **Build & Deploy**
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Content Management Workflow

### Publishing a Service

1. Navigate to `/admin/services`
2. Click "Edit" on a service
3. Update multilingual content
4. Toggle "Published" status
5. Optional: Mark as "Featured"
6. Changes sync immediately to frontend

### Adding a Job Posting

1. Go to `/admin/careers`
2. Click "Post New Job"
3. Fill in:
   - Position title (all languages)
   - Department
   - Location
   - Job description
   - Requirements
   - Benefits
4. Publish to make visible on `/careers`

### Managing Contact Leads

1. Navigate to `/admin/leads`
2. View all form submissions
3. Update lead status:
   - **New**: Just submitted
   - **Contacted**: Initial outreach made
   - **Qualified**: Sales-qualified lead
   - **Closed**: Converted or no longer relevant
4. Export as CSV for CRM integration

---

## 🔄 Frontend & Backend Integration

### Content Flow

```
Admin Panel (Edit)
      ↓
/data/content.ts (in-memory or database)
      ↓
API Routes (optional future layer)
      ↓
Frontend Components (read-only)
      ↓
User Views in [locale] Pages
```

### Current Flow (Mock Data)

Frontend components directly import from `/data/content.ts`:

```typescript
// In /app/[locale]/services/page.tsx
import { services, getLocalizedContent } from '@/data/content';

export default function ServicesPage() {
  return services.map(service => (
    <ServiceCard
      title={getLocalizedContent(service.title, locale)}
      // ...
    />
  ));
}
```

### Future Flow (Database)

1. Admin updates content via CMS
2. Changes saved to PostgreSQL
3. Frontend fetches via API routes:
   ```typescript
   // /app/api/services/route.ts
   const services = await sql`SELECT * FROM services WHERE published = true`;
   ```
4. Frontend displays latest content

---

## 🛡️ Security Considerations

### Current (Demo) Limitations

- ✅ Credentials are hardcoded (demo only)
- ✅ No password hashing
- ✅ No session expiration
- ✅ No rate limiting
- ✅ No audit logging

### Production Security

Implement:

1. **Authentication**
   - Real password hashing (bcrypt)
   - JWT with expiration
   - Secure HTTP-only cookies

2. **Authorization**
   - Role-based access control (RBAC)
   - Fine-grained permissions
   - Audit logging for admin actions

3. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - SQL injection prevention (via parameterized queries)

4. **Data Protection**
   - HTTPS only
   - Encrypted sensitive data
   - Regular backups
   - GDPR compliance for leads

---

## 🐛 Troubleshooting

### Admin Login Not Working

- Check browser localStorage isn't cleared
- Verify correct username/password: `admin` / `demo2024`
- Try in incognito window

### Language Switcher Not Working

- Ensure middleware is enabled
- Check that URLs include locale prefix
- Verify Phosphor icons are loaded

### Content Not Showing

- Check `isPublished: true` in data
- Verify locale is supported
- Check browser console for errors

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `/lib/i18n.ts` | Language config, locale types |
| `/lib/auth.ts` | Authentication utilities |
| `/middleware.ts` | URL locale routing |
| `/data/content.ts` | All website content (structured) |
| `/components/site/LanguageSwitcher.tsx` | Language selector component |
| `/components/admin/AdminSidebar.tsx` | Admin navigation sidebar |
| `/app/admin/login/page.tsx` | Admin login page |
| `/app/admin/layout.tsx` | Admin layout wrapper |
| `/app/admin/page.tsx` | Admin dashboard |

---

## 🎓 Learning Resources

- [Next.js 15 Documentation](https://nextjs.org)
- [Internationalization (i18n) Best Practices](https://en.wikipedia.org/wiki/Internationalization_and_localization)
- [TypeScript for Type Safety](https://www.typescriptlang.org)
- [Tailwind CSS Styling](https://tailwindcss.com)

---

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review the code comments
3. Contact Media Today team

---

**Last Updated**: January 2024
**Version**: 1.0.0
