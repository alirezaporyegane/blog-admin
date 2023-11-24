import development from './development'
import production from './production'

export interface IConfig {
  apiServer: string
  ssl: boolean
}

export interface IAppConfig extends IConfig {
  protocol: string
  apiServerUrl: string
}

const envConfig = {
  development,
  production
}

export default function useAppConfig(): IAppConfig {
  const NODE_ENV: string = process.env.NODE_ENV || 'development'

  return {
    ...envConfig[NODE_ENV],
    get protocol(): string {
      return this.ssl ? 'https://' : 'http://'
    },
    get apiServerUrl(): string {
      return `${this.protocol}${this.apiServer}/api`
    }
  }
}
