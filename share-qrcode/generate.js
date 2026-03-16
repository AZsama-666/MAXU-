const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const CONFIG = {
  iosUrl: "https://apps.apple.com/cn/app/%E7%8E%9B%E8%96%AF-maxu/id6751791887",
  androidUrl: "https://app.mi.com/details?id=com.maxuworld.app&ref=search"
};

const outDir = __dirname;

async function run() {
  try {
    await QRCode.toFile(path.join(outDir, "ios.png"), CONFIG.iosUrl, {
      width: 400,
      margin: 2
    });
    console.log("已生成: ios.png (App Store)");

    await QRCode.toFile(path.join(outDir, "android.png"), CONFIG.androidUrl, {
      width: 400,
      margin: 2
    });
    console.log("已生成: android.png (Android APK)");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
