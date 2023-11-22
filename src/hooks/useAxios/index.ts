import axios, { type AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import configOption, { IAppConfig } from '../../../config'
import type { RequestOption } from './types'

function requestConfig(
  endpointBaseUrl: string,
  options: RequestOption,
  config: IAppConfig
): AxiosRequestConfig {
  const restUrl: string = [endpointBaseUrl, options.action]
    .filter((item) => !!item)
    .join('/')
  const baseURL = config.apiServerUrl

  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL,
    url: restUrl,
    method: options.method,
    params: options.params,
    headers: {
      Authorization:
        options.account?.accessToken && !options.tokenLess
          ? `Bearer ${options.account.accessToken}`
          : null
    },
    data: options.body,
    paramsSerializer(params) {
      return stringify(params, { arrayFormat: 'repeat' })
    }
  }

  return axiosRequestConfig
}

export async function axiosHandler<T>(
  url: string,
  options: RequestOption
): Promise<T> {
  const config = configOption()
  const req = requestConfig(url, options, config)

  try {
    const res = await axios(req)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
