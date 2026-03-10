# 部署到 www.up9.life 排查说明

## 如何确认是否是最新版本

- 打开 **www.up9.life**，从任意入口进入 **Zone1 首页**（例如完成 Zone0 入世后到首页）。
- 在页面**左侧边栏最下方**会显示 **「部署版本: xxxxx」**（7 位为 Git 提交 hash，如 `8f153ae`）。
- 对比本地最新提交：在项目目录执行 `git log -1 --format="%h"`，若与页面上的版本一致，说明已是新部署；若不一致，按下面步骤排查。

## 排查步骤

### 1. 确认 GitHub Pages 来源

- 打开仓库 **Settings → Pages**。
- **Source** 必须为 **Deploy from a branch**。
- **Branch** 选 **gh-pages**，目录选 **/ (root)**。
- 若这里选的是 `main` 或别的分支，站点不会使用 Actions 构建结果，会一直显示旧内容或源码。

### 2. 确认 Actions 是否成功

- 打开仓库 **Actions** 页，查看 **「Deploy to GitHub Pages」** 工作流。
- 最近一次 **push 到 main** 应触发一次 run，状态需为绿色 ✓。
- 若为红色失败：点进该 run 看报错（常见为 `npm ci` 或 `npm run build` 失败），修好后重新 push。

### 3. 清理本地缓存再试

- 浏览器 **强制刷新**：`Ctrl + Shift + R`（Windows）或 `Cmd + Shift + R`（Mac）。
- 或使用 **无痕/隐私模式** 重新打开 https://www.up9.life。

### 4. 确认域名与 DNS

- 若 **Settings → Pages** 里 **Custom domain** 未填或不是 `www.up9.life`，请填上并保存。
- 若刚改过 DNS，生效可能需几分钟到几十分钟。

## 当前部署方式简述

- 每次 **push 到 `main`** 会触发 GitHub Actions。
- Actions 执行 `npm ci` → `npm run build`，再把 **`dist`** 推到 **`gh-pages`** 分支，并写入 **CNAME: www.up9.life**。
- GitHub Pages 从 **gh-pages** 分支提供页面，因此只有 Actions 成功跑完，线上才会更新。
