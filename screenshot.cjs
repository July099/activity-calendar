const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const outputDir = '/tmp/openclaw';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  // 截图登录页
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, '01-login.png'), fullPage: true });
  console.log('Saved: 01-login.png');
  
  // 登录
  await page.type('input[type="text"]', 'testuser');
  await page.click('button');
  await new Promise(r => setTimeout(r, 2000));
  
  // 截图月视图
  await page.screenshot({ path: path.join(outputDir, '02-month-view.png'), fullPage: true });
  console.log('Saved: 02-month-view.png');
  
  // 切换到年视图
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.textContent);
    if (text && text.includes('年视图')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '03-year-view.png'), fullPage: true });
  console.log('Saved: 03-year-view.png');
  
  // 切换回月视图并打开新增活动弹窗
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.textContent);
    if (text && text.includes('月视图')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  
  const addButtons = await page.$$('button');
  for (const btn of addButtons) {
    const text = await btn.evaluate(el => el.textContent);
    if (text && text.includes('新增活动')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '04-add-event-modal.png'), fullPage: true });
  console.log('Saved: 04-add-event-modal.png');
  
  await browser.close();
  console.log('All screenshots saved to ' + outputDir);
})();
