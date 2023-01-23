import puppeteer from 'puppeteer';

export default defineEventHandler(async () => {
    const html = await useStorage().getItem('assets:server:template.html');
  
    const browser = await puppeteer.launch();
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
