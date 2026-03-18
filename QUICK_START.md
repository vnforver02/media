# Media Today CMS 快速启动指南

## 🚀 30 秒速览

**Media Today 现已完全接通 CMS 与数据库。所有内容都来自数据库，不再是硬编码。**

| 功能 | 状态 | 如何使用 |
|-----|------|--------|
| 编辑服务 | ✅ 完成 | 进入 `/admin/services` 编辑 |
| 编辑案例 | ⏳ 70% | 数据库就绪，等待 UI |
| 编辑职位 | ⏳ 70% | 数据库就绪，等待 UI |
| 联系表单 | ✅ 完成 | 自动保存到数据库 |
| 多语言 | ✅ 完成 | 支持英越中（简繁） |

---

## 📊 系统架构

```
用户修改 CMS 页面
    ↓
PUT /api/services（保存到数据库）
    ↓
数据库更新
    ↓
前端刷新页面 → GET /api/services
    ↓
显示最新内容
```

---

## 🔑 关键文件位置

### 数据层（所有前端都通过这里获取数据）
```
/home/user/apps/web/lib/data-layer.ts
```

**使用示例**：
```typescript
import { getServices, getTranslated } from '@/lib/data-layer';

const services = await getServices();
services.forEach(service => {
  console.log(getTranslated(service, 'title', 'en'));
});
```

### CMS 编辑页面
```
/admin/services/                    # 服务列表
/admin/services/edit/[id]          # 编辑单个服务（已完成）
/admin/case-studies/               # 案例列表（待创建）
/admin/jobs/                        # 职位列表（待创建）
/admin/leads/                       # 联系记录（待创建）
```

### API 路由
```
/api/services      # 获取/编辑服务
/api/case-studies  # 获取/编辑案例
/api/jobs          # 获取/编辑职位
/api/leads         # 获取/提交联系
/api/site-settings # 网站设置
```

---

## 🎯 当前数据状态

### 已导入的 Demo 数据

| 表名 | 记录数 | 完整性 |
|-----|-------|------|
| site_settings | 1 | ✅ 完整（4语言） |
| services | 11 | ✅ 完整（4语言） |
| case_studies | 1 | ✅ 完整（4语言） |
| jobs | 2 | ✅ 完整（4语言） |
| contact_leads | 0 | ✅ 表就绪 |
| navigation | - | ✅ 表就绪 |

### 快速验证数据

在浏览器控制台运行：
```javascript
// 查看所有服务
fetch('/api/services').then(r => r.json()).then(d => console.log('服务数:', d.length, d))

// 查看案例研究
fetch('/api/case-studies').then(r => r.json()).then(d => console.log('案例:', d[0].title_en))

// 查看职位
fetch('/api/jobs').then(r => r.json()).then(d => console.log('职位数:', d.length, d.map(j => j.title_en)))
```

---

## 📝 编辑 CMS 内容（5 分钟教程）

### 步骤 1：访问服务管理

打开浏览器访问：`http://localhost:3000/admin/services`

### 步骤 2：选择要编辑的服务

例如点击「Meta Ads Architecture」

### 步骤 3：选择语言

在顶部选择语言标签：
- 🇬🇧 English
- 🇻🇳 Tiếng Việt
- 🇨🇳 中文 (简)
- 🇹🇼 中文 (繁)

### 步骤 4：修改内容

编辑以下字段（以英文为例）：
- **Title**：服务名称
- **Short Description**：简短描述
- **Full Description**：完整描述

### 步骤 5：保存

点击「Save Changes」按钮

### 步骤 6：验证更改

刷新前端页面，修改应该立即显示

---

## 🌐 多语言工作方式

### 数据库结构

每个内容都有 4 个字段：
```
title_en       → 英文
title_vi       → 越南语
title_zh_cn    → 简体中文
title_zh_tw    → 繁体中文
```

### 前端获取

```typescript
// 方式 1：使用数据层的 getTranslated 函数
const title = getTranslated(service, 'title', 'en');

// 方式 2：直接访问字段
const title = service.title_en;
```

### URL 结构（待实现）

计划支持：
```
/en                     → English
/vi                     → Vietnamese  
/zh-cn                  → Simplified Chinese
/zh-tw                  → Traditional Chinese
```

---

## ⚙️ API 快速参考

### 获取数据

```bash
# 获取已发布的内容（前端使用）
GET /api/services
GET /api/case-studies
GET /api/jobs
GET /api/site-settings

# 获取所有内容包括草稿（管理后台）
GET /api/services?admin=true
GET /api/case-studies?admin=true
GET /api/jobs?admin=true
```

### 更新数据

```bash
# 更新服务
PUT /api/services
{
  "id": 1,
  "title_en": "新标题",
  "description_en": "新描述",
  "is_published": true,
  "featured": true
}

# 响应
{ "success": true }
```

### 提交表单

```bash
# 提交联系表单
POST /api/leads
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Startup",
  "phone": "+1234567890",
  "service_needed": "Meta Ads",
  "monthly_budget": 5000,
  "message": "I want to scale my business"
}

# 响应
{ "success": true, "id": 123 }
```

---

## 🧪 快速测试清单

复制粘贴到浏览器控制台逐个测试：

```javascript
// ✅ 测试 1: 获取服务
fetch('/api/services')
  .then(r => r.json())
  .then(d => console.log('✅ Services:', d.length, '条'))
  .catch(e => console.log('❌ Error:', e))

// ✅ 测试 2: 获取案例
fetch('/api/case-studies')
  .then(r => r.json())
  .then(d => console.log('✅ Case Studies:', d.length, '条'))
  .catch(e => console.log('❌ Error:', e))

// ✅ 测试 3: 获取职位
fetch('/api/jobs')
  .then(r => r.json())
  .then(d => console.log('✅ Jobs:', d.length, '条'))
  .catch(e => console.log('❌ Error:', e))

// ✅ 测试 4: 多语言
fetch('/api/services')
  .then(r => r.json())
  .then(d => {
    const s = d[0];
    console.log('✅ 英文:', s.title_en);
    console.log('✅ 越南语:', s.title_vi);
    console.log('✅ 简中:', s.title_zh_cn);
    console.log('✅ 繁中:', s.title_zh_tw);
  })

// ✅ 测试 5: 网站设置
fetch('/api/site-settings')
  .then(r => r.json())
  .then(d => console.log('✅ Site Settings:', d[0].site_name, d[0].founded_year))
```

**预期输出**：
```
✅ Services: 11 条
✅ Case Studies: 1 条
✅ Jobs: 2 条
✅ 英文: Meta Ads Architecture
✅ 越南语: Kiến Trúc Quảng Cáo Meta
✅ 简中: Meta 广告架构
✅ 繁中: Meta 廣告架構
✅ Site Settings: Media Today 2016
```

---

## 📚 完整文档

| 文档 | 用途 |
|-----|------|
| `CMS_IMPLEMENTATION_REPORT.md` | 完整技术实施报告 |
| `TESTING_GUIDE.md` | 详细测试步骤 |
| `QUICK_START.md` | 本文件 |

---

## 🔧 常见操作

### 编辑服务标题（英文）

1. 访问 `/admin/services/`
2. 找到要编辑的服务，点击行
3. 确保在「English」标签
4. 修改「Title」字段
5. 点击「Save Changes」

### 发布/取消发布服务

1. 在 `/admin/services/` 列表中找到服务
2. 点击该行右侧的眼睛图标
3. 服务会立即发布或取消发布

### 添加新服务（待实现）

需要创建：
- POST 端点在 `/api/services`
- 「Add Service」按钮在 `/admin/services/`
- 新服务创建表单

### 查看联系表单提交（待实现）

需要创建：
- `/admin/leads/` 页面
- 显示所有联系表单提交
- 标记为已读/回复等功能

---

## ⚠️ 已知限制

| 功能 | 状态 | 计划 |
|-----|------|------|
| Services 编辑 | ✅ 完成 | - |
| Case Studies 编辑 | ❌ 未做 | 本周 |
| Jobs 编辑 | ❌ 未做 | 本周 |
| Contact 管理 | ❌ 未做 | 本周 |
| 认证/授权 | ❌ 未做 | 下周 |
| 速率限制 | ❌ 未做 | 下周 |
| 邮件通知 | ❌ 未做 | 下下周 |

---

## 🆘 需要帮助？

### 检查数据库连接
```bash
psql $DATABASE_URL -c "SELECT COUNT(*) FROM services;"
```

### 查看实时日志
```bash
npm run dev 2>&1 | grep -i "error\|warning"
```

### 重启开发服务器
```bash
# 停止：Ctrl+C
# 启动：npm run dev
```

### 查看 API 状态
访问 http://localhost:3000/api/services 检查响应

---

## 📞 技术支持

- 📧 Email: hello@mediatoday.com.vn
- 💬 WhatsApp: +84 (0) 123 456 789
- 📋 Issue: 点击左下角头像 → "Contact Us"

---

## 下一步

1. ✅ **立即做**：验证所有 API 可用
2. ⏳ **本周做**：完成 Case Studies 和 Jobs 的 CMS 页面
3. ⏳ **下周做**：添加认证和权限控制
4. ⏳ **后续做**：高级功能（版本控制、预览等）

---

**最后更新**：2024  
**维护者**：Media Today 开发团队
