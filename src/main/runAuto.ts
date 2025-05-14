/* 
@function: 脚本自动购票
*/
import {getUserConfig,initChromiumEnv,performLogin,purchaseTicket} from './AutoUtils'
import { type TicketType} from './types/index'

const runAutomation:(ticketType:TicketType)=>Promise<any> = async (ticketType:TicketType) => {
    const config = await getUserConfig();
    const { chromePath,chromium } = await initChromiumEnv(config);
    const browser = await chromium.launch({ headless: false, executablePath: chromePath });
    const context = await browser.newContext();
    const page = await context.newPage();
  
    try {
      // 1. 跳转页面
      await page.goto('https://48.gnz48.com/Account', { timeout: 60000 });
  
      // 2. 完成登录
      await performLogin(page, config,ticketType);
      
      // 3. 完成购买
      await purchaseTicket(page, config, ticketType);

    } catch (error) {
      throw error;
    }
    return {
        status: '完成',
    };
}

export {runAutomation}
