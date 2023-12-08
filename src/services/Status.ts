import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = '/shared/server-status'

export async function checkStatusHandler(
  account: any,
  tokenLess: boolean = true
) {
  return await axiosHandler(BASE_URL, account, {
    method: RequestMethod.GET,
    tokenLess
  })
}
