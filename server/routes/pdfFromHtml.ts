import puppeteer from 'puppeteer';
import chrome from 'chrome-aws-lambda';

export default defineEventHandler(async () => {
  const html = await useStorage().getItem('assets:server:template.html');

  const browser = await puppeteer.launch({
    args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chrome.defaultViewport,
    executablePath: await chrome.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  //  Add content
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  //  Set screen instead of print css
  // await page.emulateMediaType('screen');

  //  Create pdf
  const pdf = await page.pdf({
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();

  return pdf;
})
