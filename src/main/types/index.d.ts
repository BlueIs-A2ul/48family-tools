import { Page } from 'playwright';

enum TicketType {
    General = 'GENERAL',
    Auction = 'AUCTION',
    ExtendedPlay = 'EP',
}

interface ChromePath {
    chromePath: string | null;
    chromium: import('playwright').BrowserType
}

interface LoginConfig {
    username: string;
    password: string;
}

interface AppConfig {
    regex: string;
    targetTime: string;
    login: LoginConfig;
    selectedGroup: string;
    targetCount: number;
    userPrice: number;
    ChromePath: string;
}

type InitChromiumEnv = () => Promise<ChromePath> 

type InitChromiumEnvFromConfig = (config: {chromePath: string}) => Promise<ChromePath>

type GetUserConfig = () => Promise<AppConfig | Error>

type PerformLogin = (page: Page, config: AppConfig, ticketType: TicketType) => Promise<void>

type SelectedGroup = (page: Page, config: AppConfig) => Promise<void>

type CompletePurchase = (page: Page, config: AppConfig) => Promise<void>

type FindAndClickTarget = (page: Page, regex: RegExp) => Promise<any>

type TimeWait = (config: AppConfig) => number

type PurchaseTicket = (page: Page, config: AppConfig, ticketType: TicketType) => Promise<void>

type GetChromePath = () => Promise<string> 


export {
    AppConfig,
    TicketType,
    ChromePath,
    InitChromiumEnv,
    GetUserConfig,
    GetChromePath,
    PerformLogin,
    SelectedGroup,
    CompletePurchase,
    FindAndClickTarget,
    TimeWait,
    PurchaseTicket,
    InitChromiumEnvFromConfig,
}