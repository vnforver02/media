# Media Today CMS 测试指南

## 测试前准备

1. 确保应用正在运行：`npm run dev`
2. 打开浏览器访问：`http://localhost:3000`
3. 登录后台：`http://localhost:3000/admin/login`

---

## 测试 1: Site Settings（网站设置）

### 1.1 查询网站设置

**步骤**：
```bash
# 在浏览器控制台运行
fetch('/api/site-settings')
  .then(r => r.json())
  .then(d => console.log(d))
```

**预期结果**：
```json
[{
  "id": 1,
  "site_name": "Media Today",
  "company_email": "hello@mediatoday.com.vn",
  "founded_year": 2016,
  "address_en": "District 1, Ho Chi Minh City, Vietnam",
  "address_vi": "Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
  ...
}]
```

✅ **通过**：返回正确的网站设置数据

---

## 测试 2: Services（服务）

### 2.1 获取已发布的服务

**步骤**：
```bash
fetch('/api/services')
  .then(r => r.json())
  .then(d => console.log('已发布服务:', d.length, d))
```

**预期结果**：
- ✅ 返回 11 条已发布的服务
- ✅ 每条包含所有语言字段（title_en, title_vi 等）
- ✅ 包含 icon, sort_order, is_published, featured

**示例数据**：
```json
[
  {
    "id": 1,
    "slug": "meta-ads",
    "title_en": "Meta Ads Architecture",
    "title_vi": "Kiến Trúc Quảng Cáo Meta",
    "title_zh_cn": "Meta 广告架构",
    "is_published": true,
    "featured": true
  },
  ...
]
```

### 2.2 管理员获取全部服务（包括草稿）

**步骤**：
```bash
fetch('/api/services?admin=true')
  .then(r => r.json())
  .then(d => console.log('全部服务:', d.length))
```

**预期结果**：
- ✅ 返回超过 11 条（包括未发布的）
- ✅ 包含草稿状态的服务

### 2.3 编辑服务（通过 CMS）

**步骤**：
1. 访问 `/admin/services/`
2. 找到「Meta Ads Architecture」服务
3. 点击编辑按钮打开编辑页面
4. 在「English」标签下修改标题：`Meta Ads Architecture → Meta Ads - Advanced Strategy`
5. 点击「Save Changes」按钮

**预期结果**：
- ✅ 显示「Service saved successfully!」
- ✅ 返回服务列表页面
- ✅ 修改立即生效

### 2.4 验证修改是否生效

**步骤**：
```bash
# 刷新前端查询
fetch('/api/services')
  .then(r => r.json())
  .then(d => {
    const metaAds = d.find(s => s.slug === 'meta-ads');
    console.log('修改后的标题:', metaAds.title_en);
  })
```

**预期结果**：
- ✅ 标题已更新为「Meta Ads - Advanced Strategy」

### 2.5 多语言编辑测试

**步骤**：
1. 再次编辑「Meta Ads Architecture」
2. 点击「🇻🇳 Tiếng Việt」标签
3. 修改越南语标题：`Kiến Trúc Quảng Cáo Meta → Kiến Trúc Quảng Cáo Meta - Chiến Lược Nâng Cao`
4. 保存更改

**预期结果**：
- ✅ 越南语标题独立修改
- ✅ 英文标题保持不变
- ✅ 其他语言标题保持不变

### 2.6 发布/取消发布测试

**步骤**：
1. 在服务列表找任意服务
2. 在操作列点击眼睛图标（发布/取消发布）
3. 确认操作

**前端验证**：
```bash
fetch('/api/services')
  .then(r => r.json())
  .then(d => {
    console.log('已发布服务数:', d.length);
    // 应该减少 1
  })
```

**预期结果**：
- ✅ 取消发布后，列表中消失
- ✅ 重新发布后，列表中出现

---

## 测试 3: Case Studies（案例研究）

### 3.1 获取案例研究

**步骤**：
```bash
fetch('/api/case-studies')
  .then(r => r.json())
  .then(d => console.log('案例研究:', d))
```

**预期结果**：
- ✅ 返回 1 条已发布的案例：「NEXUS E-Commerce」
- ✅ 包含所有字段：标题、描述、挑战、策略、执行、结果等
- ✅ 所有内容都有 4 种语言版本

**验证内容**：
```bash
fetch('/api/case-studies')
  .then(r => r.json())
  .then(d => {
    const nexus = d[0];
    console.log('标题:', nexus.title_en);
    console.log('中文标题:', nexus.title_zh_cn);
    console.log('挑战:', nexus.challenge_en.substring(0, 50) + '...');
    console.log('结果:', nexus.results_en.substring(0, 50) + '...');
  })
```

**预期输出**：
```
标题: NEXUS E-Commerce: From 5K to 150K Monthly Revenue
中文标题: NEXUS 电子商务：从 5K 到 150K 月收入
挑战: The challenge was multi-layered: poor tracking meant we couldn't...
结果: After 90 days: 150K monthly revenue (30x growth). ROAS increased...
```

✅ **通过**：所有案例数据完整且正确

---

## 测试 4: Jobs（职位）

### 4.1 获取职位列表

**步骤**：
```bash
fetch('/api/jobs')
  .then(r => r.json())
  .then(d => {
    console.log('职位数:', d.length);
    d.forEach(job => {
      console.log(`- ${job.title_en} (${job.location_en})`);
    })
  })
```

**预期结果**：
```
职位数: 2
- Performance Marketing Manager (Ho Chi Minh City, Vietnam)
- Senior Product Engineer (Ho Chi Minh City, Vietnam)
```

### 4.2 验证多语言职位信息

**步骤**：
```bash
fetch('/api/jobs')
  .then(r => r.json())
  .then(d => {
    const job = d[0];
    console.log('英文:', job.title_en);
    console.log('越南语:', job.title_vi);
    console.log('简中:', job.title_zh_cn);
    console.log('繁中:', job.title_zh_tw);
  })
```

**预期结果**：
- ✅ 所有字段都有 4 种语言版本
- ✅ 包含详细的职责、要求、福利描述

✅ **通过**：职位数据完整

---

## 测试 5: Contact Leads（联系表单）

### 5.1 提交联系表单

**步骤**：
1. 访问 `/contact` 页面
2. 填写表单：
   - 名字：John Doe
   - 邮箱：john@example.com
   - 公司：Tech Startup
   - 电话：+1234567890
   - 服务需求：Meta Ads
   - 月度预算：5000
   - 消息：Interested in scaling my e-commerce business
3. 点击「Send Message」

**预期结果**：
- ✅ 显示成功消息
- ✅ 表单数据保存到数据库

### 5.2 验证表单数据是否保存

**步骤**：
```bash
fetch('/api/leads?admin=true')
  .then(r => r.json())
  .then(d => {
    const latest = d[d.length - 1];
    console.log('最新提交:', {
      name: latest.name,
      email: latest.email,
      company: latest.company,
      message: latest.message.substring(0, 50) + '...'
    });
  })
```

**预期结果**：
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Startup",
  "message": "Interested in scaling my e-commerce business..."
}
```

✅ **通过**：表单数据正确保存

---

## 测试 6: 多语言数据访问

### 6.1 数据层 getTranslated 函数测试

**步骤**：
在浏览器控制台中测试数据层函数（需要在组件中）

```typescript
import { getServices, getTranslated } from '@/lib/data-layer';

const services = await getServices();
const service = services[0];

console.log('English:', getTranslated(service, 'title', 'en'));
console.log('Vietnamese:', getTranslated(service, 'title', 'vi'));
console.log('Simplified Chinese:', getTranslated(service, 'title', 'zh_cn'));
console.log('Traditional Chinese:', getTranslated(service, 'title', 'zh_tw'));
```

**预期结果**：
```
English: Meta Ads Architecture
Vietnamese: Kiến Trúc Quảng Cáo Meta
Simplified Chinese: Meta 广告架构
Traditional Chinese: Meta 廣告架構
```

✅ **通过**：多语言提取函数工作正常

---

## 测试 7: API 缓存和性能

### 7.1 首次请求和缓存

**步骤**：
```bash
# 首次请求
console.time('first-request');
const res1 = await fetch('/api/services');
const data1 = await res1.json();
console.timeEnd('first-request');

# 第二次请求（缓存）
console.time('cached-request');
const res2 = await fetch('/api/services');
const data2 = await res2.json();
console.timeEnd('cached-request');

console.log('数据相同:', JSON.stringify(data1) === JSON.stringify(data2));
```

**预期结果**：
- ✅ 第一次请求可能需要 100-500ms
- ✅ 缓存请求应该更快
- ✅ 返回相同的数据

---

## 测试 8: 错误处理

### 8.1 无效的 service ID

**步骤**：
```bash
fetch('/api/services')
  .then(r => r.json())
  .then(d => console.log('有效请求:', d.length > 0))

# 无效请求不应导致错误
```

**预期结果**：
- ✅ API 返回正确数据
- ✅ 没有 500 错误

### 8.2 恶意输入测试

**步骤**：
```bash
# SQL 注入测试
fetch("/api/services' OR '1'='1")
  .then(r => console.log('状态:', r.status))
```

**预期结果**：
- ✅ 返回 404 或正确的错误
- ✅ 不执行注入的 SQL

✅ **通过**：基本安全保护有效

---

## 综合测试清单

### 功能测试
- [ ] Site Settings 数据正确加载
- [ ] Services 列表显示 11 条记录
- [ ] Case Studies 显示 NEXUS 案例
- [ ] Jobs 显示 2 条职位
- [ ] Contact 表单可成功提交
- [ ] 所有数据都支持 4 种语言

### CMS 功能测试
- [ ] 可以编辑 Service 标题
- [ ] 可以编辑 Service 描述
- [ ] 可以发布/取消发布 Service
- [ ] 可以标记/取消标记 Service 为精选
- [ ] 编辑后前端立即可见

### 多语言测试
- [ ] English 内容正确显示
- [ ] Vietnamese 内容正确显示
- [ ] Simplified Chinese 内容正确显示
- [ ] Traditional Chinese 内容正确显示
- [ ] 语言之间相互独立

### 性能测试
- [ ] API 响应时间 < 500ms
- [ ] 缓存工作正常
- [ ] 并发请求无问题

### 安全测试
- [ ] SQL 注入被防止
- [ ] XSS 攻击被防止
- [ ] 草稿内容默认不显示
- [ ] 只有 admin=true 时显示全部

---

## 测试报告模板

```markdown
# 测试执行报告

**测试日期**：[日期]
**测试人员**：[姓名]
**测试环境**：[开发/生产]

## 总体结果

- ✅ Site Settings: 通过
- ✅ Services: 通过  
- ✅ Case Studies: 通过
- ✅ Jobs: 通过
- ✅ Contact Leads: 通过

## 详细结果

### Site Settings
- [✅/❌] 数据加载
- [✅/❌] 四语言支持
- [✅/❌] 编辑功能

### Services
- [✅/❌] 列表显示
- [✅/❌] 编辑功能
- [✅/❌] 多语言
- [✅/❌] 发布状态

... 以此类推

## 发现的问题

1. [问题描述]
   - 优先级：[高/中/低]
   - 影响：[描述影响]
   - 建议：[建议修复方案]

## 签名

测试人员：_________________  
日期：_________________
```

---

## 故障排除

### 问题 1: API 返回 404

**可能原因**：
- 数据库连接失败
- 表不存在
- API 路由不存在

**解决方案**：
```bash
# 检查数据库连接
echo $DATABASE_URL

# 检查表是否存在
psql $DATABASE_URL -c "\dt"

# 查看 API 日志
npm run dev | grep -i error
```

### 问题 2: 编辑后前端不更新

**可能原因**：
- ISR 缓存未过期
- 浏览器缓存

**解决方案**：
```bash
# 清除浏览器缓存：Ctrl+Shift+Delete
# 或等待 1 小时 ISR 重新验证

# 临时禁用缓存
fetch('/api/services', { 
  cache: 'no-store' 
})
```

### 问题 3: 多语言字段为空

**可能原因**：
- 数据库字段名错误
- 翻译文本未导入

**解决方案**：
```bash
# 检查字段
SELECT column_name FROM information_schema.columns 
WHERE table_name='services';

# 检查数据
SELECT title_en, title_vi, title_zh_cn FROM services LIMIT 1;
```

---

**最后更新**：2024  
**版本**：1.0
