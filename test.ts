import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({args: ["--no-sandbox", "--disable-setuid-sandbox"]});
  const page = await browser.newPage();

  await page.goto('https://developer.chrome.com/');
  await page.setViewport({ width: 1080, height: 1024 });

  await page.keyboard.press('/');
  await page.locator('::-p-aria(Search)').fill('automate beyond recorder');
  await page.locator('.devsite-result-item-link').click();

  const textSelector = await page
    .locator('::-p-text(Customize and automate)')
    .waitHandle();
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
}

run();
