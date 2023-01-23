import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer';
import { getChromeOptions } from '~/utils/chrome';

export default defineEventHandler(async () => {
  const html = await useStorage().getItem('assets:server:template.html');

  const browser = await puppeteer.launch(await getChromeOptions(chrome));

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
