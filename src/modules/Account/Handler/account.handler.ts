import { axiosHandler } from '@/handler'
import { RequestMethod } from '@/handler/types'
import {
  IAccountDto,
  IAccountLoginDto,
  IAccountRegisterDto
} from '../@types/account.dto'
import { IAccount, IAccountEntry } from '../@types/account.entry'

const BASE_URL = 'shared/account'

export async function loginHandler(
  body: IAccountLoginDto,
  account: any,
  tokenLess: boolean = true
) {
  return await axiosHandler<IAccountEntry>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'login',
    body,
    tokenLess
  })
}

export async function registerHandler(
  body: IAccountRegisterDto,
  account: any,
  tokenLess: boolean = true
) {
  return await axiosHandler<IAccountEntry>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'register',
    body,
    tokenLess
  })
}

export async function logoutHandler(account: any) {
  return await axiosHandler<string>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'logout'
  })
}

export async function getProfileHandler(account: any) {
  return await axiosHandler<IAccount>(BASE_URL, account, {
    method: RequestMethod.GET,
    action: 'my'
  })
}

export async function updateProfileHandler(body: IAccountDto, account: any) {
  return await axiosHandler<IAccount>(BASE_URL, account, {
    method: RequestMethod.PUT,
    action: 'my',
    body
  })
}
