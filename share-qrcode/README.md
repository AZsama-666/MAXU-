# 玛薯 App 分享用双平台下载二维码

本目录为**独立附件**，不接入 MAXU 原型或主站。用于生成并展示两个二维码：微信扫码后分别跳转 **iOS App Store** 与 **Android 直链下载** 的玛薯 App。

---

## 当前链接（已配置）

| 平台 | 链接 | 说明 |
|------|------|------|
| **iOS** | [App Store 玛薯 - MAXU](https://apps.apple.com/cn/app/%E7%8E%9B%E8%96%AF-maxu/id6751791887) | 中国区 App Store，App ID: 6751791887 |
| **Android** | [小米应用商店 玛薯-MAXU](https://app.mi.com/details?id=com.maxuworld.app&ref=search) | 小米应用商店下载页 |

---

## 两个码的用途

| 码 | 跳转目标 | 说明 |
|----|----------|------|
| **iOS 下载** | App Store 玛薯 App 页 | 用户扫码后打开 App Store 下载页（或经微信内浏览器一步跳转） |
| **Android 下载** | 小米应用商店玛薯页 | 用户扫码后打开小米应用商店下载页 |

---

## 已产出的两个二维码图片

- **ios.png**：对应 App Store 链接，可直接用于印刷或分享。
- **android.png**：对应 Android APK 链接，可直接用于印刷或分享。

上述 PNG 由 `npm run generate` 生成（见下方「重新生成二维码」）。也可在浏览器中打开 **index.html** 查看并截图两个二维码。

---

## 使用方式

- **直接使用图片**：将 `ios.png`、`android.png` 用于海报、推文或线下物料。
- **在线查看**：在浏览器中打开 `index.html`，即可看到两个二维码及平台标注，可打印或截图。
- 本目录不参与主项目构建与部署，仅作附件使用。

---

## 重新生成二维码

若今后更换链接，可：

1. 修改 **index.html** 顶部 `CONFIG` 中的 `iosUrl`、`androidUrl`，保存后刷新页面即可看到更新后的二维码。
2. 同步修改 **generate.js** 中的 `CONFIG`，在本目录执行：
   ```bash
   npm install
   npm run generate
   ```
   将重新生成 `ios.png` 与 `android.png`。

---

## 微信扫码后的实际表现

- **iOS**：扫码后微信通常先在内置浏览器打开链接，用户需点击「在 Safari 中打开」或「前往 App Store」才会进入 App Store。
- **Android**：扫小米应用商店链接后，微信内可能打开商店页或提示在浏览器/应用商店中打开后下载。
