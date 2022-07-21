import puppeteer from 'puppeteer';
import snakeCase from './snake-case.js';
import process from 'node:process';
import 'dotenv/config';

const URL = process.env.BASE_URL + '/LogIn.aspx';

export default async ({
  username,
  password,
  ipAddress,
  action,
  wantScreenshot = true,
  timeout = 5000,
  showBrowser = false,
}) => {
  const browser = await puppeteer.launch({
    headless: !showBrowser,
    devtools: showBrowser,
  });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.type('input[name=txtUsername]', username);
  await page.type('input[name=txtPassword]', password);
  await page.click('input[name=btnLogIn]');

  await page.waitForTimeout(timeout);

  await page.waitForFunction(
    async ({ action, ipAddress }) => {
      const response = await fetch('/Employee.aspx/SubmitBiologViaWebBundy', {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          Note: action,
          IP: ipAddress,
        }),
      });

      console.log(await response.json());

      await new Promise((resolve) => setTimeout(resolve, 3000));

      return await response.ok;
    },
    {},
    {
      ipAddress,
      action,
    }
  );

  await page.reload();

  await page.waitForTimeout(timeout);

  if (wantScreenshot) {
    await page.screenshot({
      path: `./screenshots/${snakeCase(action)}_${Date.now()}.png`,
      fullPage: true,
    });
  }

  browser.close();
};
