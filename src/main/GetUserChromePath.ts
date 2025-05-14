const findChromePath = require('chrome-finder');

async function initChromiumEnv() { 
    const chromePath = findChromePath();
    const {chromium} = await import('playwright');
    return { chromePath ,chromium };
}

async function getChromePath() {
    const { chromePath } = await initChromiumEnv();
    if(chromePath===null||chromePath===undefined){
        throw new Error('未找到chrome路径')
    }else{
        return chromePath;
    }
}

export { getChromePath };