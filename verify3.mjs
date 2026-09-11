import { chromium } from "playwright";
import fs from "node:fs";

const shotDir = "C:/Users/abc/AppData/Local/Temp/claude/d--Lense-POC/c6193d0e-f330-4dde-bebe-4ad43c0ea4e4/scratchpad/shots3";
fs.mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch();

async function checkViewport(name, width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5183/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shotDir}/${name}.png` });

  // Check the phone frame box is fully within viewport bounds
  const box = await page.locator("div.bg-mist-100.overflow-hidden").first().boundingBox();
  console.log(name, "viewport", width, "x", height, "-> phone box:", box);
  await ctx.close();
}

// Simulate the exact scenario from the screenshot: a maximized Chrome window
// with bookmarks bar + tab bar taking vertical chrome space, roughly 1920x1032 visible content
await checkViewport("chrome-maximized-1920x1032", 1920, 1032);
await checkViewport("desktop-1440x900", 1440, 900);
await checkViewport("laptop-1366x768", 1366, 768);
await checkViewport("short-viewport-1920x800", 1920, 800);
await checkViewport("mobile-390x844", 390, 844);

await browser.close();
console.log("DONE");
