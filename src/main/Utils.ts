import fs from 'fs';
import {getChromePath} from './GetUserChromePath'
import {app} from 'electron';
import path from 'path';
import {is} from '@electron-toolkit/utils'

const userDataPath = app.getPath('userData');
const projectConfigPath = path.join(app.getAppPath(), 'config.json');

const filePath = is.dev ? projectConfigPath:path.join(userDataPath, 'config.json')
if(is.dev){
  console.log('is.dev',is.dev)
}else{
  console.log('what are you fucking doing')
}

function ensureError(error:any){
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String((error as { message: string }).message);
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return errorMessage; 
  }
    //配置写入函数
  function saveFile(content: any): void {
    // 如果文件存在，则读取当前配置
    let currentConfig = {};
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      try {
        currentConfig = JSON.parse(fileData);
      } catch (error) {
        console.warn('Failed to parse existing config file:', error);
      }
    }
  
    let newData:any;
    try{
      newData = typeof content === 'string' ? JSON.parse(content) : content;
    }
    catch (error) {
      throw new Error('Invalid JSON format');
    }
  
    const mergedData = { ...currentConfig, ...newData };
  
    fs.writeFileSync(filePath, JSON.stringify(mergedData), 'utf-8');
  }
  
  //配置读取函数
  async function readFile(): Promise<any>{
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const res: any = { 
        login: { username: '', password: '' }, 
        regex: '', 
        targetTime: '',
        selectedGroup: '',
        targetCount: 30,
        userPrice: 0 
      };
      try {
        Object.assign(res, JSON.parse(fileData));
        if(res.ChromePath === undefined||res.ChromePath === ''||res.ChromePath === null){
          try {
            res.ChromePath = await getChromePath();
            saveFile(res);
            return res;
          }
          catch (_error) {
            throw new Error('Failed to get Chrome path:');
          }
        }
        return res; // 主进程解析为对象再返回
      } catch (error) {
        console.error('Failed to parse JSON from file:', error);
        throw error; 
      }
    }
    return null;
  }

  export {ensureError,saveFile,readFile}