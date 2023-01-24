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

  //  Add content
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  //  Set screen instead of print css
  // await page.emulateMediaType('screen');

  //  Create pdf
  const pdf = await page.pdf({
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
		format: 'A4',
		printBackground: true
	})

  // Close the browser instance
  await browser.close();

  return pdf;
})
