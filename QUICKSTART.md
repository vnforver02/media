# 🚀 Media Today CMS - Quick Start Guide

## 30 Seconds to Admin Dashboard

### Step 1: Access Admin Login
```
http://localhost:3000/admin/login
```

### Step 2: Enter Demo Credentials
```
Username: admin
Password: demo2024
```

### Step 3: You're In! 🎉

---

## What You Can Do Right Now

### 📱 View Multilingual Frontend

- **English**: http://localhost:3000/en
- **Vietnamese**: http://localhost:3000/vi  
- **Simplified Chinese**: http://localhost:3000/zh-cn
- **Traditional Chinese**: http://localhost:3000/zh-tw

Use the 🌐 language switcher in the header to change languages.

---

## Admin Dashboard Tour

### 1. **Dashboard** (`/admin`)
Overview of your website content:
- Published services count
- Active job postings
- Contact leads received
- System status

### 2. **Services Management** (`/admin/services`)
Manage your 8 core services:
- View all services
- Publish/unpublish
- Mark as featured
- Filter by status

### 3. **Careers & Jobs** (`/admin/careers`)
Manage job postings:
- View all 7 positions
- Add new jobs
- Track published vs draft
- Job type indicators

### 4. **Contact Leads** (`/admin/leads`)
Track inquiries:
- 47 total leads with details
- Update lead status
- Track budget information
- Search/filter by company or person

### 5. **Site Settings** (`/admin/settings`)
Configure global settings:
- Company name & info
- Contact details
- Social media links
- SEO metadata
- Default language

### 6. **Other Modules**
- **Case Studies** - Portfolio management
- **FAQ** - Knowledge base
- **Navigation** - Menu configuration
- **Languages** - Translation status
- **Media** - Image library
- **Pages** - Edit page content

---

## Key Features

### ✨ Multilingual Everything
- All content supports 4 languages
- Language tabs in admin forms
- Frontend auto-detects user language

### 🔐 Protected Admin Area
- Secure login required
- Session management
- Demo credentials for testing

### 📊 Content Management
- Publish/unpublish controls
- Featured content flagging
- Draft/published status tracking
- Multilingual content fields

### 🎨 Professional UI
- Dark theme (matches brand)
- Responsive design
- Collapsible sidebar
- Real-time filtering

---

## Try These Actions

### ✅ Example 1: Publish a Service
1. Go to `/admin/services`
2. Find "TikTok Ads & Content"
3. Click eye icon to publish
4. Verify on `/vi/services` (Vietnamese page)

### ✅ Example 2: Check Contact Leads
1. Go to `/admin/leads`
2. View 47 sample leads
3. Change lead status (New → Contacted → Qualified)
4. See lead details with budget info

### ✅ Example 3: Switch Languages
1. Go to `/en` (English home)
2. Click 🌐 in header
3. Select "Tiếng Việt" 
4. Auto-redirects to `/vi` (Vietnamese version)

### ✅ Example 4: Update Site Settings
1. Go to `/admin/settings`
2. Update company phone or email
3. Change default language to English
4. Click "Save All Changes"

---

## Important Files to Know

| File | What It Does |
|------|------|
| `/data/content.ts` | All website content (services, jobs, case studies) |
| `/lib/i18n.ts` | Language configuration and translation helpers |
| `/lib/auth.ts` | Admin authentication system |
| `/middleware.ts` | URL locale routing (/en, /vi, etc.) |
| `/components/admin/AdminSidebar.tsx` | Admin navigation menu |
| `/ADMIN_CMS_GUIDE.md` | Full system documentation |

---

## Current Limitations (Mock System)

⚠️ This is a **mock/demo system**. Here's what won't persist:

- ❌ Changes to content don't save to database (because we're using mock data)
- ❌ Admin only works locally (no real authentication)
- ❌ No email notifications
- ❌ No file uploads (media manager is UI-only)

---

## Upgrade to Production

When ready, add:

### 1. Real Database
```bash
# Create Neon PostgreSQL project
# Update API routes to query real data
```

### 2. Real Authentication
```bash
# Install NextAuth.js
npm install next-auth
# Configure with GitHub/Google OAuth or email
```

### 3. Form Submissions
```bash
# Add /api/contact route
# Save submissions to database
# Send email notifications
```

---

## Troubleshooting

**Q: Login not working?**
- Use exact credentials: `admin` / `demo2024`
- Check localStorage isn't cleared
- Try incognito window

**Q: Language switcher not working?**
- Ensure you're on a locale route (`/en`, `/vi`, etc.)
- Check 🌐 icon in header

**Q: Admin sidebar disappeared?**
- Click hamburger/sidebar toggle button
- Refresh page

**Q: Services not showing?**
- Ensure `isPublished: true` in data
- Check correct locale route

---

## Next Steps

1. **Explore the Admin Panel** - Click through all modules
2. **Read `/ADMIN_CMS_GUIDE.md`** - Full system documentation
3. **Review `/data/content.ts`** - Understand content structure
4. **When ready, add database** - Switch from mock to real data
5. **Deploy to production** - Use Vercel for automatic deployments

---

## Support

- 📖 Full docs: `ADMIN_CMS_GUIDE.md`
- 💡 Implementation details: `IMPLEMENTATION_SUMMARY.md`
- 🔍 Code comments throughout codebase
- Contact: Media Today team

---

**You're all set! Login to `/admin/login` and start exploring. 🎉**
