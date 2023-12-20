import { RequestMethod } from '@/@types/Services'
import { UserDtoIn } from '@/components/Users'
import { EditPasswordDto } from '@/components/Users/EditPasswordView'
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

const getById = async (id: string, signal: AbortSignal) => {
  return await axiosHandler<number>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.GET,
    signal
  })
}

const create = async (body: UserDtoIn) => {
  return await axiosHandler<string>(BASE_URL, {
    method: RequestMethod.POST,
    body
  })
}

const update = async (id: string, body: UserDtoIn) => {
  return await axiosHandler<string>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.PUT,
    body
  })
}

const updatePassword = async (id: string, body: EditPasswordDto) => {
  return await axiosHandler<string>(BASE_URL, {
    action: `${id}/password`,
    method: RequestMethod.PUT,
    body
  })
}

const remove = async (id: string) => {
  return await axiosHandler<string>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.DELETE
  })
}

export default {
  getAll,
  getCount,
  getById,
  create,
  update,
  updatePassword,
  remove
}
