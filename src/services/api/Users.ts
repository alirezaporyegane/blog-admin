import { RequestMethod } from '@/@types/Services'
import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'
import { axiosHandler } from './Core'

const BASE_URL = 'admin/users'

const getAll = async (params: unknown, signal: AbortSignal) => {
  return await axiosHandler<UserDtoIn[]>(BASE_URL, {
    method: RequestMethod.GET,
    params,
    signal
  })
}

const getCount = async (params: unknown, signal: AbortSignal) => {
  return await axiosHandler<number>(BASE_URL, {
    action: 'count',
    method: RequestMethod.GET,
    params,
    signal
  })
}

const remove = async (id: string) => {
  return await axiosHandler<string>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.DELETE
  })
}

export default { getAll, getCount, remove }
