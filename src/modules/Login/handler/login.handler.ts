import { axiosHandler } from '@/handler'
import { RequestMethod } from '@/handler/types'
import { IAccountLoginDto } from '../@types/login.dto'
import { IAccountRegisterDto } from '../@types/login.entry'

export async function loginHandler(body: IAccountLoginDto, account: any) {
  const BASE_URL = 'shared/account'

  return await axiosHandler<IAccountRegisterDto>(BASE_URL, account, {
    method: RequestMethod.POST,
    action: 'login',
    body
  })
}
