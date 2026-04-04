import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, "temporary screenshots");
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const executablePath = "C:/Users/admin/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe";

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

const sections = ["#about", "#techstack", "#projects", "#contact", "#connect"];
const labels = ["about", "techstack", "projects", "contact", "connect"];

for (let i = 0; i < sections.length; i++) {
  await page.evaluate((selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "instant" });
  }, sections[i]);
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(screenshotDir, `section-${labels[i]}.png`) });
  console.log(`Saved section-${labels[i]}.png`);
}

await browser.close();
