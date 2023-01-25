import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export default defineEventHandler(async (event) => {
  //  Open chrome
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

  const files = [];

  const path = process.env.VERCEL ? '/tmp' : '/Applications/Google Chrome.app/Contents/MacOS/';

  fs.readdirSync(path).forEach(file => {
    console.log(file);
    const stat =  fs.lstatSync(path + '/' + file);

    files.push(file + ' : ' + stat.mode + ', '+ stat.uid + ', ' + stat.size);
  });

  return process.version

  return files;
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  });

  const page = await browser.newPage();

  //  Go to page
  await page.goto("https://www.google.com");
  const title = await page.title();

  // Close the browser instance
  await browser.close();

  return title;
})
