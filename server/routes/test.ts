import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export default defineEventHandler(async () => {
  const html = await useStorage().getItem('assets:server:template.html');

  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  const title = await page.title();

  // Close the browser instance
  await browser.close();

  return title;
})
