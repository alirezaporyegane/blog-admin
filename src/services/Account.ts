import { IAccountIn, ILoginIn } from '@/@types/Account/Dto/in'
import {
  IAccountDtoOut,
  IAccountLoginDtoOut,
  IAccountRegisterDtoOut
} from '@/@types/Account/Dto/out'
import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'shared/account'

async function loginHandler(
  body: IAccountLoginDtoOut,
  account: any,
  tokenLess: boolean = true
) {
  return await axiosHandler<ILoginIn>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'login',
    body,
    tokenLess
  })
}

async function registerHandler(
  body: IAccountRegisterDtoOut,
  account: any,
  tokenLess: boolean = true
) {
  return await axiosHandler<ILoginIn>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'register',
    body,
    tokenLess
  })
}

async function logoutHandler(account: any) {
  return await axiosHandler<string>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'logout'
  })
}

async function getProfileHandler(account: any) {
  return await axiosHandler<IAccountIn>(BASE_URL, account, {
    method: RequestMethod.GET,
    action: 'my'
  })
}

async function updateProfileHandler(body: IAccountDtoOut, account: any) {
  return await axiosHandler<IAccountIn>(BASE_URL, account, {
    method: RequestMethod.PUT,
    action: 'my',
    body
  })
}

export default {
  loginHandler,
  registerHandler,
  logoutHandler,
  getProfileHandler,
  updateProfileHandler
}
