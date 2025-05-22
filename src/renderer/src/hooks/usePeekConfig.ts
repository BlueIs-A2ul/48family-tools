import { reactive } from 'vue'
import { type UserConfig } from '../types/index'

// 定义 usePeekConfig 函数的返回类型
type UsePeekConfigReturnType = {
  configFields: { label: string; key: string }[]
  getConfigValue: (key: string) => object | null
  fetchConfig: () => void
}
export const usePeekConfig = (): UsePeekConfigReturnType => {
  const configFields = [
    { label: '用户账号', key: 'login.username' },
    { label: '密码', key: 'login.password' },
    { label: 'Chrome路径', key: 'ChromePath' },
    { label: '目标场次', key: 'regex' },
    { label: '目标时间', key: 'targetTime' }
  ]

  const usersConfig = reactive<UserConfig>({
    login: {
      username: '',
      password: ''
    },
    regex: '',
    targetTime: '',
    targetCount: '',
    userPrice: '',
    ChromePath: ''
  })

  const getConfigValue = (key: string): object | null => {
    return key.split('.').reduce((obj, part) => {
      return obj && obj[part] !== undefined ? obj[part] : null
    }, usersConfig)
  }

  const fetchConfig = (): void => {
    window.inPutAPI.readConfig().then((res: UserConfig) => {
      Object.assign(usersConfig, res)
    })
  }

  return {
    configFields,
    getConfigValue,
    fetchConfig
  }
}
