import development from './development'
import production from './production'

export type IConfig = {
  apiServer: string
  ssl: boolean
}

type Config = {
  development: IConfig
  production: IConfig
}

export type IAppConfig = IConfig & {
  protocol: string
  apiServerUrl: string
}

const envConfig: Config = {
  development,
  production
}

export default function useAppConfig(): IAppConfig {
  const NODE_ENV =
    (process.env.NODE_ENV as keyof Config) || ('development' as keyof Config)

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
