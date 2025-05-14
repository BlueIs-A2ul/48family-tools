/// <reference types="vite/client" />
declare global {
  interface Window {
    electronAPI: {
      // 示例：声明你暴露的API方法及类型
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      send: (channel: string, ...args: any[]) => void;
      on: (channel: string, listener: (...args: any[]) => void) => void;
    };
  }
}