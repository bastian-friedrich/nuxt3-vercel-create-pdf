// import edgeChromium from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';
// import { getChromeOptions } from '~/utils/chrome';

export default defineEventHandler(async () => {
  const html = await useStorage().getItem('assets:server:template.html');

  // const browser = await puppeteer.launch({
  //   args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
  //   defaultViewport: chrome.defaultViewport,
  //   executablePath: await chrome.executablePath,
  //   headless: true,
  //   ignoreHTTPSErrors: true,
  // });
  
  // const page = await browser.newPage();

  // //  Add content
  // //  TODO: Switch to dynamic url
  // const website_url = 'http:localhost:3000/hello'; 

  // // Open URL in current page
  // await page.goto(website_url, { waitUntil: 'networkidle0' }); 

  // //  Set screen instead of print css
  // // await page.emulateMediaType('screen');

  // //  Create pdf
  // const pdf = await page.pdf({
  //   margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
  //   printBackground: true,
  //   format: 'A4',
  // });

  // // Close the browser instance
  // await browser.close();

  return html;
})
