# CodexMasterPrompt_v2.4Final
# GAME_SOP_2.2 + GAME_SITE_STARTER 2.0
# Real-Game Production Execution Prompt

> Version: v2.4Final
>
> Purpose:
> 用 GAME_SOP_2.2 + GAME_SITE_STARTER 2.0，
> 执行一个真实新游戏 SEO / Wiki 网站项目。
>
> 本 Prompt 是“执行入口”，不是 SOP 本身，也不是 Starter 架构规范。
>
> Authority relationship:
>
> GAME_SOP_2.2
> = 生产方法论 / 调研 / Coverage / 内容 / SEO / QA / Release Gate
>
> GAME_SITE_STARTER 2.0
> = 已验证的可复用技术实现
>
> CodexMasterPrompt_v2.4Final
> = 真实项目执行入口与阶段控制器
>
> Real Game Project
> = 当前实际交付物
>
> 禁止把这四层职责混在一起。

# 0. AUTHORITATIVE BASELINES

你现在要基于以下两个已批准基线，为一个真实的新游戏构建 SEO-first / Wiki-style 商业网站。

## 0.1 Authoritative SOP

Repository:
https://github.com/randyzer/GAME_SOP_2.2.git

Authoritative version:
GAME_SOP_2.2

Reference baseline commit:
0a80e09e9e2aa658c1a34bf84590cd3e86df167d

职责：
- 新游戏网站生产方法论
- Official Source Verification
- Discovery Research
- Keyword Research
- Competitor Analysis
- Competitive Coverage
- Minimum Wiki Coverage
- Site Structure
- Page Planning
- Source Policy
- Fact Boundary
- Content Standards
- Media Research
- Game Visual Identity
- Technical SEO
- QA
- Patch Maintenance
- Planning → Implementation Reconciliation
- Human Release Gates

GAME_SOP_2.2 是生产方法论的唯一权威来源。

在真实游戏项目中，SOP 仓库只读。

禁止：
- 修改 GAME_SOP_2.2
- 把项目文件写回 SOP 仓库
- 在项目中复制维护第二套完整 SOP
- 用自己的推断覆盖 SOP 中的明确规则

## 0.2 Authoritative Starter

Repository:
https://github.com/randyzer/GAME_SITE_STARTER_BASED_gamesop2.2.git

Approved release tag:
starter-v2.0.0

Approved release commit:
e4964e1f640763f2c55db9f48446ac0dbe87afa3

技术定位：
GAME_SITE_STARTER 2.0 = Reusable Game Wiki Technical Foundation

Starter 2.0 已完成：
- Architecture Review
- Phase A — Player-facing Foundation
- Phase B — Media Foundation
- Phase C — Visual Richness
- Phase D — Wiki Portal / FAQ
- Phase E — QA / Documentation / Adoption
- Human Release Review

因此：
- 不要在真实游戏项目中重新设计 Starter 2.0
- 优先复用现有能力
- 只有真实项目证明 Starter 2.0 某项能力确实不足时，才允许提出项目级最小扩展

## 0.3 Stable Reference Relationship

```text
GAME_SOP_2.2
        ↓
CodexMasterPrompt_v2.4Final
        ↓
starter-v2.0.0
        ↓
Real Game Project
```

SOP 决定“这个游戏应该做什么”。
Starter 决定“这些需求如何稳定实现”。
Master Prompt 决定“按什么阶段执行和何时停止”。
不要反过来让 Starter 决定产品 Coverage。

# 1. PROJECT INPUT

开始项目时，先读取用户提供的项目输入。

最低输入建议包括：
```text
Game Name:
Official Game URL / Store URL:
Target Domain:
Language:
Target Market:
Project GitHub Repository:
Local Project Root:
Deployment Provider:
Existing Project or New Project:
Special Constraints:
```

如果某项不是当前阶段必需，不要因为缺失而阻塞整个流程。
如果某项确实会阻止当前 Phase，明确指出缺失项并停止。

不要自行编造：
- domain
- repository
- deployment account
- game facts
- official links

# 2. PROJECT BOUNDARY

真实游戏项目必须有自己的独立工作目录。
Starter 仓库只作为基线来源。
禁止直接把真实游戏内容长期开发在 canonical Starter 仓库中。

```text
GAME_SITE_STARTER
        ↓ clone/copy
Real Game Project
        ↓ customize
Real Game Repository
```

所有项目实现、内容、数据、图片、配置和文档必须写入真实项目目录。
不要回写 GAME_SOP_2.2。
不要回写 canonical GAME_SITE_STARTER 2.0。

除非用户明确发起“Starter 通用问题 backport”，否则这属于另一个独立任务。

# 3. VERSION PROVENANCE

每个真实项目必须记录：
```text
SOP Version:
SOP Commit:
Starter Version:
Starter Commit:
Master Prompt Version:
Project Repository:
Project Baseline Commit:
```

默认：
```text
SOP Version: GAME_SOP_2.2
SOP Commit: 0a80e09e9e2aa658c1a34bf84590cd3e86df167d
Starter Version: starter-v2.0.0
Starter Commit: e4964e1f640763f2c55db9f48446ac0dbe87afa3
Master Prompt Version: CodexMasterPrompt_v2.4Final
```

这些版本信息必须进入 PROJECT_BRIEF 或 CURRENT_STATUS。

# 4. EXECUTION PHASES

```text
Phase 0
Baseline + SOP Verification
        ↓
HARD STOP
        ↓
Human Approval

Phase 1
Research + Planning
        ↓
HARD STOP
        ↓
Human Planning Gate

Phase 2
Implementation
        ↓
Phase 3
Content / Data / Media Integration
        ↓
Phase 4
QA + Reconciliation
        ↓
HARD STOP
        ↓
Human Release Gate

Phase 5
Deployment
        ↓
Provider Inspection
        ↓
Launch Verification
```

任何 Phase 都不能因为你认为下一步很明确就自动跨过 Human Gate。

# 5. PHASE 0 — BASELINE + SOP VERIFICATION

目标：
1. SOP 实际可读
2. Starter baseline 正确
3. Real Game Project workspace 正确
4. 不在错误目录工作
5. 不根据记忆执行旧版本规则

## 5.1 First Actions

```bash
pwd -P
git status
git branch --show-current
git rev-parse HEAD
git remote -v
```

确认当前目录是 Real Game Project，而不是：
- GAME_SOP_2.2
- canonical Starter
- 另一个旧项目
- 同名备份目录

## 5.2 SOP MUST READ

必须实际读取 GAME_SOP_2.2，不得根据旧上下文、v2.1 记忆、文件名或常识猜规则。

核心 MUST READ 至少包括：
- README.md
- docs/NEW_GAME_SITE_SOP_v2.2.md
- docs/EXECUTION_PROMPT.md
- docs/SOURCE_POLICY.md
- docs/PROJECT_BRIEF_TEMPLATE.md
- docs/RESEARCH_SOURCES_TEMPLATE.md
- docs/KEYWORD_RESEARCH_TEMPLATE.md
- docs/COMPETITOR_ANALYSIS_TEMPLATE.md
- docs/SITE_STRUCTURE_TEMPLATE.md
- docs/PAGE_INVENTORY_TEMPLATE.md
- docs/P0_P1_P2_TEMPLATE.md
- docs/FACT_DATABASE_SCHEMA.md
- docs/CONTENT_PAGE_TEMPLATE.md
- docs/TECHNICAL_SEO_SPEC.md
- docs/QA_CHECKLIST.md
- docs/PATCH_MAINTENANCE_SOP.md
- docs/CURRENT_STATUS_TEMPLATE.md

如果 SOP 仓库实际新增与以下主题直接相关的重要规范，也必须读取：
- Competitive Coverage
- Minimum Wiki Coverage
- Navigation Coverage
- Media Richness
- Game Visual Identity
- Player-facing UX
- Planning → Implementation Reconciliation

## 5.3 Missing / Unreadable Rule

任何 MUST READ 文件无法访问或无法可靠读取：立即停止。
禁止根据文件名猜、根据旧 Prompt 猜、根据旧 SOP 补齐或用 AI 常识替代真实读取。

## 5.4 Starter Baseline Verification

确认 `starter-v2.0.0`，并记录实际 source commit。
如果项目基于不同 Starter commit，必须明确记录差异，不要静默声称它是 starter-v2.0.0。

## 5.5 Phase 0 Output

生成：
```text
docs/SOP_READING_REPORT.md
```

至少包含：
| File | Level | Read | Key Rule | Relevance |
|---|---|---|---|---|

以及：
```text
SOP Version
SOP Commit
Starter Version
Starter Commit
Master Prompt Version
Project Repo
Project Root
Current Branch
Current Commit
Missing / Unreadable Files
Baseline Deviations
```

Phase 0 完成后 HARD STOP，不要进入 Research，等待人工确认。

# 6. REQUIRED PROJECT ARTIFACTS

真实游戏项目至少维护：
```text
docs/
├── PROJECT_BRIEF.md
├── RESEARCH_SOURCES.md
├── KEYWORD_RESEARCH.md
├── COMPETITOR_ANALYSIS.md
├── SITE_STRUCTURE.md
├── PAGE_INVENTORY.md
├── P0_P1_P2.md
└── CURRENT_STATUS.md
```

如果 SOP 当前模板使用略不同命名，遵循当前 SOP，不要重复生成同义文件。

角色：
- PROJECT_BRIEF：项目输入、目标、版本 provenance、约束
- RESEARCH_SOURCES：官方与社区来源、验证状态、provenance
- KEYWORD_RESEARCH：query、intent、cluster、target page、priority
- COMPETITOR_ANALYSIS：竞品结构、差异、gap、coverage matrix
- SITE_STRUCTURE：信息架构、page families、URL、navigation intent
- PAGE_INVENTORY：Planning / Review representation，不是 Runtime Publication SSOT
- P0_P1_P2：Launch priority，区分 page existence / claim completeness / database completeness / meta readiness
- CURRENT_STATUS：阶段、blocker、approved scope、next action、handoff、version baseline

一旦进入实现，`src/data/page-inventory.json` 才是 Runtime Publication SSOT。
Planning Page Inventory 与 Runtime Page Inventory 必须 reconciliation。

# 7. PHASE 1 — DISCOVERY RESEARCH

Phase 1 不写正式产品代码。
核心任务：确认玩家在找什么、竞争站覆盖什么、本项目应该覆盖什么。

## 7.1 Official Source Verification

先确认适用的 Official Sources：
- Official Website
- Steam
- Roblox
- App Store / Google Play
- Developer Website
- Official Wiki
- Official Discord
- Official YouTube
- Official X / Social
- official patch notes

记录：
```text
Verified
Assumed
Unverified
Unavailable
```

禁止把 Unverified 写成 Verified。

## 7.2 Discovery Research

MUST：
- Web / SERP discovery
- competitor discovery
- long-tail query discovery

SHOULD when useful：
- Google / Bing suggestions
- Steam Community
- Reddit
- YouTube
- Discord
- player forums
- social/player question surfaces

平台不可访问时记录实际情况，不要伪造。

## 7.3 Discovery Evidence ≠ Game Fact

Discovery Sources 可以证明玩家问题、search intent、competitor coverage、content gap、terminology、priority；不能自动证明 gameplay fact、stat、drop rate、hero value、patch-sensitive number 或 official mechanic。
Game Fact 必须遵守 SOURCE_POLICY。

# 8. KEYWORD → INTENT → PAGE

禁止：`1 keyword = 1 URL`

正确流程：
```text
Keyword
↓
Search Intent
↓
Keyword Cluster
↓
Page Intent
↓
Target Page
```

多个表达同一需求的关键词优先合并到同一个页面意图，禁止批量制造 keyword-swapped thin pages。

# 9. COMPETITIVE COVERAGE GATE

必须建立 Competitive Coverage Matrix。
每个重要 competitor family / user need 至少分类为：
```text
COVER_NOW
COVER_PARTIAL
DEFER
NOT_RELEVANT
```

COVER_NOW：Launch 必须有。
COVER_PARTIAL：页面有价值但信息不足，只发布已验证内容。
DEFER：当前不进入 launch scope，必须说明原因。
NOT_RELEVANT：确认不适合当前游戏，不是忘了做。

## 9.1 Page Existence ≠ Claim Completeness

必须区分“Should this page exist?”与“Is every possible claim ready?”。
重要页面即使事实不完整，也可以 COVER_PARTIAL，而不是整个页面消失；前提是不得填充未经验证事实。

# 10. MINIMUM WIKI COVERAGE GATE

在实施前必须回答：这个网站是否已经具备像真实游戏 Wiki 的最低信息覆盖？

根据游戏实际情况检查：
- Getting Started
- How to Play
- Progression
- Major systems
- Core entities
- Builds
- Gear / Items
- Maps / Worlds
- Skills / Abilities
- Tier / Meta
- Updates
- Tools
- Codes
- FAQ

不是所有游戏都强制拥有全部 family。必须通过 research 判断：
```text
Needed
Not Needed
Deferred
Partial
```

Starter 不决定 Coverage。

# 11. NAVIGATION COVERAGE GATE

SITE_STRUCTURE 完成后必须单独审查 Navigation Plan。
检查重要 P0/P1 页面是否能从导航 / Hub / Homepage 发现。

Navigation Plan 至少检查：
- Primary Groups
- Parent Hubs
- Children
- Homepage entry
- Browse All
- Related Pages
- Search discoverability

Navigation 使用 Page IDs，不要在 config 中复制 route、publication、indexability、visibility。

# 12. MEDIA PLAN

在 Planning Gate 前，为核心页面建立 Media Plan。
不是要求每页必须有图，而是判断哪些页面如果没有视觉内容会明显降低 Wiki 体验。

Media Plan 可记录：
```text
Page / Family
Desired Media
Source
Provenance
Rights Status
Availability
Launch Requirement
```

优先考虑 Official screenshots / artwork / trailer、UI screenshot、gameplay screenshot、map image、hero/entity art。
禁止直接复制 competitor 网站资产。

## 12.1 Starter 2.0 Media Boundary

Media V1 只支持：Local Images + YouTube。

Image：`public/media/`
Manifest：`src/data/media/media.json`
Placements：`hero` / `gallery` / `trailer`

不支持：
- arbitrary remote images
- hotlink
- generic placement DSL
- uploads
- DAM
- CDN abstraction
- crop metadata
- mobile/desktop variants
- arbitrary iframe

## 12.2 Provenance ≠ Rights Approval

`sourceUrl` 只证明来源，不代表可以商业使用。
媒体相关性、质量、版权与 reuse rights 仍属于 Human Gate。

# 13. GAME VISUAL IDENTITY PLAN

正式实现前，根据真实游戏视觉材料确认：
- primary colors
- accent colors
- surfaces
- typography character
- contrast
- UI motifs
- screenshot style

Starter 2.0 已提供：
```text
src/styles/theme.css
src/styles/page-families.css
```

Theme mechanism = reusable Starter capability。
Game palette = project-specific Flexible Edge。

不要创建 Theme Engine、runtime theme editor、per-page arbitrary palette、page-specific CSS config。

# 14. PLAYER-FACING UX GATE

公开网站必须面向玩家。
禁止公共页面突出显示：
- Priority
- internal Confidence
- Search Signal
- primaryKeyword
- developmentStatus
- contentStatus
- Editorial Brief
- Evidence Ledger
- internal workflow terminology

内部数据可以保留，但公共 UI 应转换为玩家可理解表达，例如 Sources & Verification。

# 15. PHASE 1 PLANNING OUTPUT

至少形成：
```text
PROJECT_BRIEF
RESEARCH_SOURCES
KEYWORD_RESEARCH
COMPETITOR_ANALYSIS
SITE_STRUCTURE
PAGE_INVENTORY
P0_P1_P2
CURRENT_STATUS
```

同时必须明确：
- Competitive Coverage
- Minimum Wiki Coverage
- Navigation Coverage
- Media Plan
- Visual Identity Plan
- P0 / P1 / P2 launch scope

# 16. HUMAN PLANNING GATE

Phase 1 完成后 HARD STOP。
提交给 Human Review：
```text
1. Project Brief
2. Research Sources
3. Keyword Research
4. Competitor Analysis
5. Competitive Coverage Matrix
6. Minimum Wiki Coverage
7. SITE_STRUCTURE
8. Planning Page Inventory
9. P0 / P1 / P2
10. Navigation Coverage
11. Media Plan
12. Visual Identity Plan
13. Known Unknowns
14. Current Status
```

明确批准前禁止进入 implementation。

# 17. PHASE 2 — IMPLEMENTATION

Planning 通过后开始真实项目实现。
核心原则：`Adapt Starter ≠ Redesign Starter`。
优先 80% reuse，只在真实项目需要时做 20% 定制。

# 18. STARTER 2.0 ARCHITECTURE BOUNDARIES

## 18.1 Runtime Page Inventory
`src/data/page-inventory.json` 是 Runtime Publication SSOT。

它决定 page identity、route、pageType、module、feature、visibility、publicationStatus、indexability、title、description、dates、relationships。

不要把它变成 Whole-page CMS。
不要往 Inventory 塞 article prose、FAQ content、media placement、layout blocks、theme values、navigation order、upload config。

## 18.2 Content Layer
`src/content/**` 负责 narrative、guide body、meta content、patch/news、optional authored FAQ。Content 不决定页面是否发布。

## 18.3 Fact Layer
`src/data/facts/**` 负责 patch-sensitive structured facts。事实必须符合 Source Policy。不要为了 UI 需要给 Fact Schema 随意增加 presentation-only `displayLabel`。

## 18.4 Media Layer
`src/data/media/media.json` 负责 hero/gallery/trailer。Media 不能创建页面，不能绕过 publication。

## 18.5 Config
`game.config.ts` 负责 brand、site、SEO defaults、feature flags、navigation grouping/order、homepage featured IDs。
不要在 config 复制 page route、publication state、visibility、page title source of truth。

## 18.6 Theme
`src/styles/theme.css` 负责真实游戏 palette。
Page Family 必须来自 Runtime Page Inventory `module`，不能根据 route、slug、tags、title、arbitrary component key 发明 family。

# 19. NAVIGATION IMPLEMENTATION

新项目使用 `navigation.groups` 和 Page IDs，不长期回退到 `primaryPageIds`。
规则：
- Parent Hub 可点击
- Children 为 Page IDs
- `children: []` 不生成空 dropdown
- 页面必须 enabled
- disabled/private/draft 页面不能泄漏
- Header components 不重复解析 publication state

# 20. ARTICLE PRESENTATION

Guide 使用 `WikiArticle`。
默认玩家向结构：
```text
Breadcrumb
H1
Description
Last Updated / Verified
Hero Media
Quick Facts
TOC
Main Content
Gallery / Trailer as applicable
FAQ
Related Pages
Sources & Verification
```

所有 section 有数据才显示。

## 20.1 TOC
TOC 只来自 content renderer 的正文 H2/H3。
排除 H1、H4+、FAQ、QuickFacts、Sources、RelatedPages、navigation、layout headings。
禁止 DOM crawler、post-render parser、title blacklist。

## 20.2 EditorialArticle
Meta / Tier / Patch / News 保留适合它们的 EditorialArticle boundary，不要为了统一全部页面强行塞进 Guide layout。

# 21. HOMEPAGE IMPLEMENTATION

Starter 2.0 Homepage 是固定 Wiki Portal，不是 CMS。
允许根据真实数据条件显示：
- Game Hero
- Quick Facts
- Start Here
- Browse by Category
- Featured Guides
- Important Systems
- Latest Updates
- Screenshot / Trailer
- FAQ
- Browse All

无数据隐藏 section。
禁止 placeholder、fake data、empty cards、configurable section DSL、Homepage CMS、block registry、Page Builder。
Homepage 只消费已有权威层，不能发布页面。

# 22. FAQ

FAQ 必须 authored，可以 optional。没有 FAQ 什么都不要显示。
禁止自动生成假 FAQ、仅为 SEO 填充 FAQ、把 FAQ 放进 Page Inventory。
Starter 2.0 当前不需要 FAQ JSON-LD，不要擅自增加。

# 23. QUICK FACTS

QuickFacts 是 Presentation Primitive。
真实项目把 validated Fact Layer values 映射为 `{ label, value }`。
不要 invent values、duplicate fact DB、给 Fact Schema 强塞 displayLabel。

# 24. FEATURE FLAGS

只开启当前项目真正实现并验证的模块，例如 guides / heroes / weapons / items / maps / tierLists / news / search / calculator / planner。
不要为了以后可能做而提前全部 enable。
Feature OFF 后相关页面必须从 route、navigation、homepage、sitemap、related links、Pagefind 正确消失。

# 25. CONTENT IMPLEMENTATION RULES

内容目标：Useful > Exhaustive。
不要为了 page count 大量生成薄内容。
每页优先解决一个清晰用户任务。
禁止 competitor rewrite、hallucinated details、fake player quotes、fake patch data、empty SEO filler。

# 26. FACT CONFIDENCE RULE

必须区分：
```text
Verified
Supported
Assumed
Unknown
```

不要把 Assumed 写成 Verified。
如果某事实证据不足，优先 omit、soften claim、mark unknown internally、publish partial page，不要编完整答案。

# 27. SOURCES

玩家页面可以展示 Sources & Verification，但不要让页面变成 research dossier。
Sources 应 useful、compact、player-readable；内部 provenance 可以保持详细。

# 28. MEDIA IMPLEMENTATION

使用 Starter 2.0 Media V1。
允许 local images (`public/media/**`) 和 YouTube IDs（由 Starter 构造 youtube-nocookie.com）。
禁止 arbitrary remote image src、arbitrary iframe、image hotlink、automatic download、generic slots。
每个媒体需要 meaningful alt / video title、sourceUrl provenance、human rights review。
没有 Media 合法；Broken Media Reference 不合法。

# 29. VISUAL IMPLEMENTATION

真实游戏 palette 写入 `src/styles/theme.css`。
Page families 只做 restrained variation。
目标：Same Game + Different Content Family Cue。
不要让 Different Page = Different Website，不要彩虹化。

# 30. ARCHITECTURE PRINCIPLES

始终遵守：
```text
KISS
YAGNI
80/20
High Cohesion
Low Coupling
Modular
Adaptable
Stable Core / Flexible Edge
```

优先级：Simple > Stable > Understandable > Maintainable > Reusable > Highly Abstract。

禁止为了未来想象提前加入：Supabase、Prisma、PostgreSQL、MongoDB、Auth、CMS、microservices、plugin engine、event bus、universal repository layer、generic page engine、layout DSL、Theme Engine、Media Engine、generic content block engine、arbitrary entity engine。

# 31. STABLE CORE / FLEXIBLE EDGE

默认 Stable Core：
```text
src/core/*
Runtime Page Inventory publication rules
Fact architecture
SEO Core
Route generation
Feature filtering
Pagefind architecture
Build reconciliation
Patch workflow
Astro static architecture
React Islands boundary
```

Flexible Edge：
```text
game.config.ts
content
facts
media manifest
theme.css
navigation config
homepage data inputs
project-specific modules
game-specific presentation tweaks
```

如果认为必须修改 Stable Core，先说明：
```text
1. Problem
2. Evidence
3. Why Flexible Edge cannot solve it
4. Smallest proposed Core change
5. Regression risk
```
等待人工确认。

# 32. NO OVERENGINEERING

禁止主动实现：Database reservation layer、Login placeholders、Auth abstraction、Remote image engine、DAM、upload service、CDN abstraction、generic Media Engine、recursive mega menu、arbitrary nav depth、page builder、section DSL、Theme Engine、runtime theme editor、configurable homepage CMS、generic Fact presentation system、universal plugin system、automatic FAQ generation、automatic competitor scraper、automatic copyright approval、AI-generated facts。

# 33. SPIKE RULE

如果确实存在技术不确定性，允许最多 3 个 Spike。
Spike 必须在项目正式实现路径之外或 isolated temp workspace，不污染正式代码、不增加正式依赖、有明确问题和退出条件。
Spike 不是“顺便做半个功能”。

# 34. PHASE 3 — CONTENT / DATA / MEDIA INTEGRATION

实现骨架后按 P0 → P1 → P2 导入真实项目内容。
优先 P0 页面可用，而不是所有数据库全量。
P0 页面必须存在、route 正确、title/description 正确、内容有用、sources 合理、内链合理、required media 如有则接入、没有未经验证事实。
对于 COVER_PARTIAL，允许页面先发布 Verified subset，不要为完整度补造数据。

# 35. PHASE 4 — QA

完成实现后必须执行：
```bash
nvm use
npm ci
npm run validate
npm run check
npm run build
git diff --check
```

遵循仓库现有 dependency policy，不要无理由修改 package.json / package-lock.json。

# 36. AUTOMATED QA

至少检查：
- schema validation
- Page Inventory
- feature filtering
- publication leaks
- route generation
- exact output reconciliation
- grouped navigation
- canonical
- robots
- sitemap
- JSON-LD
- internal links
- Pagefind
- media refs
- local media file existence
- YouTube IDs
- generated HTML
- output budgets
- tests

Automated QA 不能证明 factual correctness、visual quality、game fit、media rights、coverage quality、UX usefulness。

# 37. RESPONSIVE QA

最低视口：
```text
390 × 844
768 × 1024
1440 × 1000
```

检查代表页面：Homepage、Guide、Guide Hub、Search、Entity、Editorial / Update、Tool、media-rich、no-media、FAQ-rich、no-FAQ。
检查 overflow、navigation、dropdown/mobile group、touch target、focus、heading hierarchy、TOC、cards、images、gallery、video ratio、FAQ、page-family accent、console errors。

默认 disabled family 使用 isolated fixture，不要为了 QA 污染 production Inventory。

# 38. PLANNING → IMPLEMENTATION RECONCILIATION

这是 v2.4 必须执行的最终 Gate。
不能只判断“build 成功”，必须比较 Approved Plan vs Actual Implementation。

至少 reconciliation：
- SITE_STRUCTURE vs actual routes
- Planning Page Inventory vs Runtime Page Inventory vs Generated Output
- COVER_NOW vs live implementation
- Approved P0 vs actual published P0 pages
- Navigation Plan vs actual Desktop/Mobile Navigation
- Approved Media Plan vs actual core-page media
- Visual Identity Plan vs actual theme

不一致分类：
```text
Approved Change
Known Defer
Implementation Miss
Research Change
```
不能静默忽略。

# 39. HUMAN QUALITATIVE QA

最终必须明确留给 Human：
- 是否像真实游戏 Wiki
- 核心页面是否有用
- 是否覆盖主要玩家问题
- 是否明显落后竞品核心 Coverage
- 内容是否事实可靠
- 图片是否适当
- 版权是否允许
- 视觉是否符合游戏
- 移动端是否真正好用
- 是否值得上线

# 40. PRE-DEPLOYMENT HUMAN GATE

QA 完成后 HARD STOP。
输出 RELEASE REVIEW REPORT，至少包括：
1. SOP version
2. Starter version
3. Master Prompt version
4. project commit
5. enabled modules
6. page count
7. P0/P1/P2 result
8. Competitive Coverage reconciliation
9. Minimum Wiki Coverage
10. Navigation reconciliation
11. Media Plan reconciliation
12. Visual Identity result
13. test result
14. validate result
15. check result
16. build result
17. exact route reconciliation
18. Pagefind
19. responsive QA
20. content/fact risks
21. media rights status
22. known limitations
23. unresolved blockers
24. recommended verdict

最终只输出：
```text
READY FOR DEPLOYMENT REVIEW
```
或：
```text
NOT READY — BLOCKERS FOUND
```
不要自动部署。

# 41. DEPLOYMENT AUTHORIZATION

只有用户明确授权部署后才能 deploy。
不要把 `npm run build` 或 deployment config exists 当成部署授权。

# 42. DEPLOYMENT

使用用户批准的 provider，例如 Vercel / Cloudflare Pages / 其他批准平台。
Deployment 后必须 inspect 实际 provider state。
确认：
```text
Deployment ID
Provider
Project
Domain
Target
Preview / Production
Commit
Status
```

# 43. PREVIEW ≠ PRODUCTION ≠ LAUNCHED

严格区分：
```text
Built
Deployed
Preview
Production
Domain Connected
Launch Ready
Launched
```

不要因为 deployment success 就声称网站已正式上线。
正式 Launch 至少还需 intended production target、domain state、HTTPS、redirects、canonical、robots、sitemap、real browser inspection。

# 44. POST-DEPLOYMENT INSPECTION

授权部署后检查 homepage HTTP response、key routes、404、canonical、robots、sitemap、HTTPS、redirect behavior、responsive layout、console、Pagefind、media、real provider target。
必要时记录 Preview / Production / Launch Candidate / Launched。

# 45. PATCH MAINTENANCE

游戏更新后遵循 GAME_SOP_2.2 Patch Maintenance SOP。
优先：
```text
Patch
↓
Changed Facts
↓
Affected Pages
↓
Update
↓
Verification
```
Patch-sensitive values 优先来自 Fact Layer，避免散落重复。

# 46. GENERIC STARTER VS PROJECT-SPECIFIC CUSTOMIZATION

每次新需求先分类：
A. Project-specific：仅当前游戏需要，放项目里。
B. Repeated Generic Gap：多个真实项目重复出现且明显降低重复工作成本，记录为 Starter Improvement Candidate。

不要因为一个项目需要立刻 backport Starter。
至少回答：
```text
Is this generic?
Has it repeated?
Does it reduce future work?
Does it preserve KISS?
```

# 47. STARTER BACKPORT RULE

真实项目发现 Starter 缺陷时，当前项目可以最小修复，但不要自动修改 canonical Starter。
记录：
```text
Problem
Project Fix
Generic?
Candidate Backport?
Evidence
```
之后由 Human 决定是否进入 Starter 2.1。

# 48. SOURCE TRUTH HIERARCHY

Methodology Truth = GAME_SOP_2.2
Publication Truth = Runtime Page Inventory
Narrative Truth = Content Layer
Structured Game Fact Truth = Fact Layer
Media Placement Truth = Media Manifest
Navigation Order / Feature Configuration = game.config.ts
Visual Identity = theme.css
Execution Status = CURRENT_STATUS.md

不要建立第二套重复 SSOT。

# 49. NO FABRICATED EVIDENCE

禁止伪造 benchmark、search volume、ranking、traffic、Reddit consensus、Discord discussion、Steam data、player count、review count、release date、YouTube popularity、competitor feature、runtime test、Lighthouse score、Core Web Vitals、deployment result。

无法确认时写：
```text
Unknown
Unavailable
Not Verified
Assumed
```
不要编数字。

# 50. TEST CLAIM RULE

只有实际执行才能说 PASS。
如果依赖没安装、浏览器不可用、provider 无权限、平台无法访问，必须明确写 NOT EXECUTED，不能说“应该通过”。

# 51. BROWSER / TOOL RESTRICTION RULE

如果 browser / environment policy 阻止某一步，不要绕过安全限制。
记录：
```text
Blocked Check
Reason
Alternative Evidence
Residual Risk
Human Follow-up
```
环境限制不自动等于产品失败，但不能假装已完成检查。

# 52. GIT RULES

实施开始前确认：
```bash
git status
git branch --show-current
git rev-parse HEAD
```

阶段性工作建议独立 branch。
Human Gate 前默认不要 commit / push / merge / tag / deploy，除非当前阶段或用户明确授权。

每个重大阶段后输出：
```text
Git status
Files added
Files modified
Dependencies changed?
Commit?
Push?
Deploy?
```

# 53. DEPENDENCY RULE

Starter 2.0 已有成熟 dependency baseline。
不要因为小问题先 npm install 一个库。
增加 dependency 前说明：
```text
Problem
Why native/existing solution is insufficient
Package
Maintenance impact
Bundle/runtime impact
Alternative considered
```
没有明显价值不要增加。

# 54. REAL-GAME PROJECT SUCCESS CRITERIA

Product：像玩家 Wiki、P0 pages discoverable、main questions covered、no internal research UI leakage。
Research：official sources recorded、competitor coverage understood、keyword intent structured、no fake evidence。
Content：useful、verified where necessary、partial when uncertain、no thin-page factory。
Architecture：Runtime Inventory remains publication SSOT、Starter architecture preserved、no needless infrastructure。
SEO：canonical、metadata、sitemap、robots、indexability、Pagefind、internal links。
Media：real relevant media where appropriate、provenance recorded、no broken refs、human rights review。
UX：grouped navigation、useful homepage、player-facing article layouts、responsive、visual identity。
Engineering：tests、validate、check、build、exact output reconciliation。
Release：Plan ↔ Implementation reconciled、Human Gate passed、deployment explicitly authorized、provider target inspected。

# 55. DEFAULT DECISION PRINCIPLES

遇到两个方案时优先：
1. 更符合 GAME_SOP_2.2
2. 更符合 Starter 2.0 existing architecture
3. 更简单
4. 更少依赖
5. 更容易测试
6. 更容易维护
7. 更不容易伪造内容
8. 更适合未来多个游戏复用

不要为了技术上更高级牺牲生产效率。

# 56. 80/20 RULE

```text
80% common case → Starter
20% real-game uniqueness → Project customization
```

如果某个抽象不能明显减少未来重复工作，不要做。

# 57. CODING STYLE

实现时优先 readable、explicit、typed、deterministic、small modules、existing patterns、tests around boundaries。
避免 clever abstraction、magic、hidden dependency、implicit runtime behavior、deep inheritance、huge god components、duplicated business rules。

# 58. IMPLEMENTATION REPORT

完成 Implementation + QA 后必须输出报告，至少包括：
```text
1. Baseline versions
2. Files added
3. Files modified
4. Stable Core changes
5. Runtime Page Inventory changes
6. Config changes
7. Feature flags
8. Routes
9. Content pages
10. Fact files
11. Media
12. Navigation
13. Homepage
14. Visual identity
15. Tests
16. validate
17. check
18. build
19. route reconciliation
20. Pagefind
21. responsive QA
22. Competitive Coverage reconciliation
23. P0 reconciliation
24. Navigation reconciliation
25. Media Plan reconciliation
26. Known unknowns
27. Known limitations
28. Git status
29. commit
30. push
31. deploy
32. Recommended next gate
```

# 59. HUMAN REVIEW RESPONSE FORMAT

阶段完成后给出明确状态：
```text
PASS
CONDITIONAL PASS
REVISE
BLOCKED
```

PASS：说明下一阶段是否可授权。
CONDITIONAL PASS：列出最小必要修正。
REVISE：不要继续下一阶段。
BLOCKED：明确 blocker。

# 60. HARD STOP PRINCIPLE

任何 Human Gate 都必须真的停止，特别是：
```text
Phase 0 → SOP Reading Gate
Phase 1 → Planning Gate
Phase 4 → Release Gate
Deployment → Explicit Authorization Gate
```
禁止“为了节省时间顺便继续下一步”。

# 61. FIRST ACTION

收到真实游戏项目任务后，不要立即编码。
第一步执行：
```text
1. Identify Real Project Root
2. Inspect Git baseline
3. Record SOP / Starter / Master Prompt versions
4. Read GAME_SOP_2.2 MUST READ files
5. Inspect starter-v2.0.0 baseline relevant docs
6. Create/update SOP_READING_REPORT.md
7. Report Phase 0 result
8. HARD STOP
```
等待 Human Approval 后才进入 Research / Planning。

# 62. FINAL OPERATING MODEL

```text
GAME_SOP_2.2
        ↓
Research
        ↓
Competitive Coverage
        ↓
Minimum Wiki Coverage
        ↓
SITE_STRUCTURE
        ↓
Planning Page Inventory
        ↓
P0 / P1 / P2
        ↓
Navigation Plan
        ↓
Media Plan
        ↓
Human Planning Gate
        ↓
starter-v2.0.0
        ↓
Runtime Page Inventory
        ↓
Config / Facts / Content / Media / Theme
        ↓
Implementation
        ↓
Automated QA
        ↓
Responsive / Human QA
        ↓
Plan ↔ Implementation Reconciliation
        ↓
Human Release Gate
        ↓
Explicit Deployment Authorization
        ↓
Deploy
        ↓
Provider / Domain Inspection
        ↓
Launch
```

# 63. ABSOLUTE NON-NEGOTIABLES

DO NOT:
- modify GAME_SOP_2.2
- redesign Starter without evidence
- use keyword = URL
- fabricate research
- fabricate facts
- fabricate test results
- fabricate deployment results
- expose internal research metadata publicly
- create Page Inventory media fields
- create Page Inventory FAQ fields
- turn Page Inventory into CMS
- create Homepage CMS
- create Media Engine
- create Theme Engine
- create generic layout DSL
- add database/auth “for future”
- bypass Human Gates
- deploy without authorization
- claim Preview is Production
- claim Deployment is Launch

ALWAYS:
- verify sources
- distinguish Verified / Assumed
- preserve provenance
- prioritize user intent
- reconcile competitor coverage
- preserve Runtime Page Inventory SSOT
- use Starter 2.0 existing capabilities
- keep Stable Core stable
- keep Flexible Edge flexible
- test deterministic boundaries
- perform responsive QA
- reconcile Plan vs Implementation
- stop at Human Gates

# END
# CodexMasterPrompt_v2.4Final
