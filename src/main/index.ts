import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { runAutomation } from './runAuto'
import { readFile, saveFile,ensureError} from './Utils'
import {getChromePath} from './GetUserChromePath'
import {TicketType} from './types/index'


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  //-------请在以下部分写主进程函数----

/*   ipcMain.on('saveConfig', (_event, data) => {
    const filePath = path.join(__dirname, '../../config.json'); 
    return saveFile(filePath, JSON.stringify(data))
  }) */

  ipcMain.on('saveConfig', async (event, data) => {
    try {
      await saveFile(JSON.stringify(data, null, 2)); // 同步写入并格式化 JSON（假设 saveFile 支持异步）
      event.sender.send('saveConfig-success'); // 通知渲染进程保存成功
    } catch (error) {
      event.sender.send('saveConfig-error', ensureError(error)); // 通知渲染进程保存失败
    }
  })


  ipcMain.handle('runAutomation', async (event,data:TicketType) => {
    try {
      const result = await runAutomation(data);
      event.sender.send('automation-success', result);
      return result;
    }  catch (error) {
      event.sender.send('automation-error', ensureError(error));
      throw error;
    }
  })

  ipcMain.handle('readConfig', async (_event, _data) => {
    const configData = readFile();
    return configData;
  })

  ipcMain.on('getChromePath', async(_event, _error) => {
    try {
      const chromePath = await getChromePath();
      _event.sender.send('chromePath', chromePath);
    }  catch (error) {
      _event.sender.send('cant find your chromePath', ensureError(error));
    }
  });


  //--------自动配置内容，请勿修改----
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

