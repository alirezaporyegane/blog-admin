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
  tokenLess: boolean = true
) {
  return await axiosHandler<ILoginIn>(BASE_URL, {
    method: RequestMethod.POST,
    action: 'login',
    body,
    tokenLess
  })
}

async function registerHandler(
  body: IAccountRegisterDtoOut,
  tokenLess: boolean = true
) {
  return await axiosHandler<ILoginIn>(BASE_URL, {
    method: RequestMethod.POST,
    action: 'register',
    body,
    tokenLess
  })
}

async function logoutHandler() {
  return await axiosHandler<string>(BASE_URL, {
    method: RequestMethod.POST,
    action: 'logout'
  })
}

async function getProfileHandler(signal: AbortSignal) {
  return await axiosHandler<IAccountIn>(BASE_URL, {
    method: RequestMethod.GET,
    action: 'my',
    signal
  })
}

async function updateProfileHandler(body: IAccountDtoOut) {
  return await axiosHandler<IAccountIn>(BASE_URL, {
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
