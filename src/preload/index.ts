import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { type TicketType } from '../main/types/index';
console.log('preload');

const customAPI = {
  saveConfig: (data: any) => {
    ipcRenderer.send('saveConfig', data);
  },
  runAutomation: (data: TicketType) => {
    return ipcRenderer.invoke('runAutomation',data);
  },
  getChromePath:()=>{
    return ipcRenderer.invoke('getChromePath');
  },
  readConfig: () => {
    return ipcRenderer.invoke('readConfig');
  },
  onAutomationError: (callback: (error: string) => void) => {
    ipcRenderer.on('automation-error', (_event, error: string) => {
      callback(error);
    });
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', {});
    contextBridge.exposeInMainWorld('inPutAPI', customAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore
  window.electron = electronAPI;
  // @ts-ignore
  window.api = {};
  // @ts-ignore
  window.inPutAPI = customAPI;
}