import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  colorScheme: "dark",
});
await page.goto("http://localhost:3000");
await page.screenshot({ path: "results-ss/focused.png" });
await browser.close();
