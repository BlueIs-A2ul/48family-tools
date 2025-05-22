import findChromePath from 'chrome-finder';
import type { InitChromiumEnv, GetChromePath } from './types/index.d.ts';

const initChromiumEnv: InitChromiumEnv = async () => {
    const chromePath = findChromePath();
    const {chromium} = await import('playwright');
    return { chromePath ,chromium };
}
const getChromePath: GetChromePath = async () => {
    const { chromePath } = await initChromiumEnv();
    if(chromePath===null||chromePath===undefined){
        throw new Error('未找到chrome路径')
    }else{
        return chromePath;
    }
}

export { getChromePath };
