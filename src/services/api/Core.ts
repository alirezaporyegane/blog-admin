import type { ErrorExceptions, RequestOption } from '@/@types/Services'
import { ErrorException } from '@/@types/Services'
import configuration from '@/config'
import { useAuthStore } from '@/store/authStore'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
const config = configuration()

function requestConfig(
  endpointBaseUrl: string,
  options: RequestOption
): AxiosRequestConfig {
  const restUrl: string = [endpointBaseUrl, options.action]
    .filter((item) => !!item)
    .join('/')
  const baseURL = config.apiServerUrl
  const account = useAuthStore.getState().account

  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL,
    url: restUrl,
    method: options.method,
    params: options.params,
    signal: options.signal,
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
  options: RequestOption
): Promise<T> {
  const req = requestConfig(url, options)

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
      'CLIENT_ERROR',
      'CLIENT_ERROR',
      -1,
      -1
    )
    throw [clientError]
  }

  if (!Array.isArray(error.data)) throw [error.data]
  else throw error.data
}
