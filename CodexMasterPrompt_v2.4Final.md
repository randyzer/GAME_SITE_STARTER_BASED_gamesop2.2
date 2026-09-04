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


# ============================================================
# 0. AUTHORITATIVE BASELINES
# ============================================================

你现在要基于以下两个已批准基线，
为一个真实的新游戏构建 SEO-first / Wiki-style 商业网站。

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

在真实游戏项目中：

SOP 仓库只读。

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

GAME_SITE_STARTER 2.0
=
Reusable Game Wiki Technical Foundation

Starter 2.0 已经完成：

- Architecture Review
- Phase A — Player-facing Foundation
- Phase B — Media Foundation
- Phase C — Visual Richness
- Phase D — Wiki Portal / FAQ
- Phase E — QA / Documentation / Adoption
- Human Release Review

因此：

不要在真实游戏项目中重新设计 Starter 2.0。

优先复用现有能力。

只有真实项目证明 Starter 2.0 某项能力确实不足时，
才允许提出项目级最小扩展。


## 0.3 Stable Reference Relationship

正确关系：

```text
GAME_SOP_2.2
        ↓
CodexMasterPrompt_v2.4Final
        ↓
starter-v2.0.0
        ↓
Real Game Project