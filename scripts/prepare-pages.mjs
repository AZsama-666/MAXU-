import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const distDir = resolve("dist");
const indexPath = resolve(distDir, "index.html");
const notFoundPath = resolve(distDir, "404.html");
const cnamePath = resolve(distDir, "CNAME");
const noJekyllPath = resolve(distDir, ".nojekyll");

mkdirSync(dirname(notFoundPath), { recursive: true });
copyFileSync(indexPath, notFoundPath);
writeFileSync(cnamePath, "www.up9.life\n", "utf8");
writeFileSync(noJekyllPath, "", "utf8");
