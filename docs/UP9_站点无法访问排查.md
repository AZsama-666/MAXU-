# www.up9.life 无法访问 — 排查说明

## 当前排查结论（可先看）

- **默认地址** `https://azsama-666.github.io/MAXU-/` 已能正常打开，说明部署和构建是正常的。
- **DNS**：`www.up9.life` 已正确 CNAME 到 `azsama-666.github.io`。
- 若 **www.up9.life 仍打不开**，最常见原因是：**仓库里没有配置 Custom domain**。  
  → 请打开 **https://github.com/AZsama-666/MAXU-/settings/pages**，在 **Custom domain** 一栏填写 `www.up9.life` 并点 **Save**。保存后等几分钟，再试访问。若出现「DNS check successful」等提示，可勾选 **Enforce HTTPS**。

---

## 1. 先确认「默认地址」能否打开

在浏览器中打开：

- **https://azsama-666.github.io/MAXU-/**

- 若**能打开**：说明部署正常，问题多半在**自定义域名或 DNS**。
- 若**打不开**：说明 Pages 未生效或构建/发布有问题，按下面第 2 步检查。

---

## 2. 检查 GitHub 仓库设置

1. 打开：**https://github.com/AZsama-666/MAXU-/settings/pages**
2. 确认：
   - **Source**：选的是 **GitHub Actions**（或 “Deploy from a branch” 且分支为 **gh-pages**）。
   - **Custom domain**：填的是 **www.up9.life**（不要带 `https://`）。
   - 若有 **Enforce HTTPS**，可勾选（需先等 DNS 生效）。

3. 查看 **Actions**：  
   **https://github.com/AZsama-666/MAXU-/actions**  
   最近一次 “Deploy to GitHub Pages” 或 “pages build and deployment” 应为**绿色成功**。若失败，点进去看报错（如 `npm ci` / build 失败）。

---

## 3. 检查域名 DNS（最常见原因）

www.up9.life 要能打开，必须在**域名服务商**（购买 up9.life 的地方）配置 DNS：

- **记录类型**：`CNAME`
- **主机/名称**：`www`（或 `www.up9.life`，视服务商界面而定）
- **目标/值**：`azsama-666.github.io`

保存后，DNS 生效可能需要 **几分钟到 24 小时**。

**自检方式：**

- 在本地 PowerShell 或 CMD 执行：  
  `nslookup www.up9.life`  
  或  
  `nslookup -type=CNAME www.up9.life`
- 若配置正确，应能看到指向 `azsama-666.github.io`（或类似 `*.github.io`）的解析结果。

---

## 4. 若仍无法访问

- **清除浏览器缓存**，或换无痕/其他浏览器再试。
- 确认没有用 VPN/代理把 up9.life 或 GitHub 解析到异常 IP。
- 到 **https://www.githubstatus.com/** 看 GitHub 是否有故障。

---

## 5. 本仓库部署方式简述

- 推送 **main** 分支会触发 `.github/workflows/deploy-pages.yml`。
- 流水线执行 `npm ci` → `npm run build`，再把 **dist** 推到 **gh-pages** 分支。
- 流水线里已设置 `cname: www.up9.life`，发布后 gh-pages 根目录会有 **CNAME** 文件，内容为 `www.up9.life`。
- 真正让「访问 www.up9.life 时打开本站」的，是 **DNS 的 CNAME** 指向 `azsama-666.github.io`，以及仓库 Pages 设置里的 Custom domain。

总结：**部署正常时，若默认地址可访问而 www.up9.life 不行，几乎都是 DNS 或 GitHub Pages 里 Custom domain 未设/未生效。**
