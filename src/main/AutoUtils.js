// @ts-check
const findChromePath = require('chrome-finder');
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { app } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const btnConfig = {
  "login":'a:has-text("密码登录/注册")',
  "username":'#username',
  "password":'#password',
  "loginBtn":'#loginbtn2',
  "ticketGeneral":'a[href="/tickets"]',
  'ticketAuction':'a[href="/pai"]',
  "ticketEp":'a[href="/goods/index/114"]',
  "group":'a.ny_choice:has-text("演出组合")',
  "aOfTarget":'li.gs_2t > a',
  "aOfTargetEp":'li.gs_2 > a',
  'aOfTargetXPath':'xpath=../preceding-sibling::li[contains(@class, "gs_1")][1]',
  'imgTargetElement':'img',
}
const ticketLink = new Map([    
  ["GENERAL", 'a[href="/tickets"]'], 
  ["AUCTION", 'a[href="/pai"]'],
  ["EP", 'a[href="/goods/index/114"]']
]);
const groupLink = {    
  "BEJ48": "a[href='?brand_id=2']",
  "GNZ48": "a[href='?brand_id=3']",
  "CKG48": "a[href='?brand_id=5']",
  "CGT48": "a[href='?brand_id=15']",
}

/* 
  @param {object} config - 配置对象，包含以下属性：
  @param {string} config.chromePath - 可选，指定 Chrome 浏览器的路径。如果未提供，将自动查找 Chrome 浏览器的路径。
  @returns {Promise<{ chromePath: string,chromium: import('playwright').Chromium }>} - 返回一个包含 Chrome 浏览器路径和 Chromium 实例的对象。
*/
async function initChromiumEnv(config) { 
  const chromePath = config?.chromePath || findChromePath();
  const {chromium} = await import('playwright');
  return { chromePath ,chromium };
}

/* 
  @returns {Promise<object>} - 返回一个包含配置信息的对象。
  @throws {Error} - 如果配置文件不存在或格式错误，将抛出错误。
*/
async function getUserConfig() {
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');
  if(configPath === '') throw new Error('config.json is not found')
  let config={};
  try {
    // 尝试读取并解析 JSON 文件
    const configFileContent = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configFileContent);
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('config.json 文件格式错误，请检查其内容是否为有效 JSON。');
    } else if (error.code === 'ENOENT') {
      fs.writeFileSync(
        configPath,
        JSON.stringify({ 
          login: { username: '', password: '' }, 
          groupLink: {}, 
          regex: '', 
          targetTime: '' 
        }, null, 2),
        'utf8'
      );
      config = { login: { username: '', password: '' }, groupLink: {}, regex: '', targetTime: '' };
      throw new Error('未找到配置文件，已创建空配置文件，请通过界面完成配置');
    } else {
      throw new Error(error);
    }
  }
}
/* 
  @param {object} config - 配置对象，包含以下属性：
  @Function: 完成登录操作。
  @param {number} ticketOption - 枚举类型
 */
async function performLogin(page, config,ticketType) {
 try {
    const { login , username, password, loginBtn} = btnConfig;
    const ticket = ticketLink.get(ticketType);
    await page.locator(login).click();
    await page.locator(username).fill(config.login.username);
    await page.locator(password).fill(config.login.password);
    await page.locator(loginBtn).click();
    await page.waitForLoadState('networkidle');

    const locatorOfLink = await page.locator(ticket);
    await locatorOfLink.click();
    return true;
  } catch (error) {
    throw new Error('登录失败');
  }
}
/* 
  @param {object} config - 配置对象，包含以下属性：
  @Function: 选择组合操作。
*/
async function selectGroup(page, config) {
  try {
    await page.evaluate(() => window.scrollTo(0, 1000));
    const targetElementOfNy = await page.locator(btnConfig.group);
    await targetElementOfNy.hover();

    const selectedGroupName = config.selectedGroup; 
    const groupSelector = groupLink[selectedGroupName];
    const groupBtnElement = page.locator(groupSelector);
    await groupBtnElement.waitFor({ state: 'visible', timeout: 5000 });
    await groupBtnElement.click();
    return true;
  } catch (error) {
    throw new Error('选择组合失败');
  }
}
/* 
  @param {object} config - 配置对象，包含以下属性：
  @Function: 滚动查找目标操作。
*/
async function findAndClickTarget(page, regex) {
  const { aOfTarget, aOfTargetXPath, imgTargetElement } = btnConfig;
  await page.waitForTimeout(2000);
  try {
    const textLocator = page.locator(aOfTarget, { hasText: regex });
    let hasFound = false;
    let currentScroll = 0; // 当前已滚动的距离
    const windowHeight = await page.evaluate(() => window.innerHeight);
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    let numOfPage = 1;
    while (true) {
      const previousLiXPath = await textLocator.locator(aOfTargetXPath);
      const imgElement = await previousLiXPath.locator(imgTargetElement);
      // 定位器对象即使没有找到元素也不会是 null，需要用 .count() 判断存在性：
      if (await imgElement.count() > 0) {
        await imgElement.click();
        hasFound = true;
        return true;
      }

      const nextScroll = currentScroll + windowHeight;
      const scrollTo = Math.min(nextScroll, totalHeight);

      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }, scrollTo);

      currentScroll = scrollTo;
      if (currentScroll >= totalHeight) {
        // 使用正确的选择器和方法来点击翻页按钮
        const nextPageSelector = 'a.next';
        await page.waitForTimeout(300);
        const nextPageElement = await page.locator(nextPageSelector);
        if (await nextPageElement.count() > 0) {
          await nextPageElement.click();
          numOfPage++;
        } else {
          throw new Error('没有下一页了');
        }
      }
    }
  } catch (error) {
    throw new Error('查找目标失败');
  }
}

async function epFindTarget(page, regex) { 
  try {
    await page.getByRole('list').filter({ hasText: 'SNH48 GROUP 第39张EP《Bye Bad Bye》精装版 SNH48 预售 实体商品 ￥288.00 已有 0 人评价' }).getByRole('link').first().click();
  }
  catch (error) {
    throw new Error('查找目标失败');
  }
}
async function epTargetPurchase(page, config) {
  try {
    await page.locator('#num').evaluate((el)=>{
      el.value = '6';
    });
    await page.waitForTimeout(timeWait(config));
    await page.locator('#buy').click();


    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      window.scrollTo({ 
        top: scrollHeight,  
        behavior: 'instant' 
      });
    });
    await page.locator('button#buyorder').click();

    await page.locator('#chxBankCode').check();

    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      window.scrollTo({ 
        top: scrollHeight,  
        behavior: 'instant' 
      });
    });

    await page.locator('#btn_bank').click();

    return true;
  }
  catch (error) {
    throw new Error('购买失败');
  }
}
/* 
  @param {object} config - 配置对象，包含以下属性：
  @Function: 完成购买操作。
*/
async function completePurchase(page,config) {
  try {
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page1Promise;
    await page1.getByText('普通座票').click();
    //定时模块
    await page1.waitForTimeout(timeWait(config));

    await page1.getByRole('link', { name: '立即购买' }).click();
    return true;
  } catch (error) {
    throw error;
  }
}
/* 
  @param {object} config - 配置对象，包含以下属性：
  @Function: 计算时间差。
*/
function timeWait(config) {
  config ||= {};
  const targetTime = config.targetTime; // 确保 config.targetTime 是有效的日期字符串
  if (!targetTime) {
    throw new Error('目标时间未配置');
  }
  const targetDate = new Date(targetTime); // 将目标时间转换为 Date 对象
  if (isNaN(targetDate.getTime())) {
    throw new Error('目标时间格式无效，请确保为有效的时间字符串');
  }

  const nowTime = new Date(); // 当前时间
  const timeDifference = targetDate.getTime() - nowTime.getTime(); // 计算时间差

  switch (true) {
    case timeDifference >= 180 * 1000: 
      throw new Error('目标时间太长');
    case timeDifference < 0:
      throw new Error('目标时间已过期');
    default: 
      return timeDifference;
  }
}

async function purchaseTicket(page, config, ticketType) {
  switch (ticketType) {
    case 'GENERAL':
      try{
        await selectGroup(page, config);
    
        const regex = config ? new RegExp(config.regex || '') : new RegExp('');
        await findAndClickTarget(page, regex);

        await completePurchase(page,config);
        return true;  
      }
      catch (error) {
        throw error;
      }
    case 'AUCTION':
      try{
       //@todo 添加拍卖逻辑
      }
      catch (error) {
        throw error;
      }
    case 'EP':
      console.log('EP');
      try{
        const regex = config ? new RegExp(config.regex || '') : new RegExp('');
        await epFindTarget(page, regex);

        await epTargetPurchase(page, config);

        return true;
      }
      catch (error) {
       throw error;
      }
    default:
      throw new Error('invalid ticket type');
  }
}

//npx playwright open https://48.gnz48.com/Account
export { initChromiumEnv, getUserConfig, performLogin, purchaseTicket };