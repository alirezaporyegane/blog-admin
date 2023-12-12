import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'
import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'

const BASE_URL = 'admin/users'

const getAll = async (params: unknown, signal: AbortSignal) => {
  return await axiosHandler<UserDtoIn[]>(BASE_URL, {
    method: RequestMethod.GET,
    params,
    signal
  })
}

export default { getAll }
