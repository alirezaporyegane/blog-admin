import configuration from '@/config'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import type { ErrorExceptions, RequestOption } from '../@types/Services'
import { ErrorException } from '../@types/Services'
const config = configuration()

function requestConfig(
  endpointBaseUrl: string,
  account: any,
  options: RequestOption
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
        account?.token && !options.tokenLess ? `Bearer ${account.token}` : null
    },
    data: options.body,
    paramsSerializer: (params: any) =>
      stringify(params, { arrayFormat: 'repeat' })
  }

  return axiosRequestConfig
}

export async function axiosHandler<T>(
  url: string,
  account: any,
  options: RequestOption
): Promise<T> {
  const req = requestConfig(url, account, options)

  try {
    const res = await axios(req)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw await errorHandler(err as AxiosError<ErrorException>)
    else throw [] as ErrorExceptions
  }
}

async function errorHandler(
  err: AxiosError<ErrorException>
): Promise<ErrorExceptions> {
  if (
    err.message.includes('ENETUNREACH') ||
    err.message.includes('Network Error')
  )
    return Promise.resolve([])

  const error = err.response
  if (!error) {
    const clientError = new ErrorException(
      { message: 'client error' },
      -1,
      'CLIENT_ERROR',
      -1
    )
    throw [clientError]
  }

  if (!Array.isArray(error.data)) throw [error.data]
  else throw error.data
}
