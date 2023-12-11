import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = '/server-status'

export async function checkStatusHandler(tokenLess: boolean = true) {
  return await axiosHandler(BASE_URL, {
    method: RequestMethod.GET,
    tokenLess
  })
}
