//@ts-check
import { TicketType } from '../main/types/index';

declare global {
  interface Window {
    electron: typeof import('@electron-toolkit/preload')['electronAPI'];
    inPutAPI: {
      saveConfig: (data: any) => void;
      readConfig: () => Promise<any>;
      runAutomation: (data:TicketType) => Promise<void>;
      getChromePath: () => Promise<string>;
    };
    api: any;
  }
}