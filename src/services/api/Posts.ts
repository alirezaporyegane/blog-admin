import { PostsType } from '@/@types/Posts'
import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'admin/posts'

const getAll = async (params: unknown, signal: AbortSignal) => {
  return await axiosHandler<PostsType[]>(BASE_URL, {
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

const create = async (body: PostsType) => {
  return await axiosHandler<string>(BASE_URL, {
    method: RequestMethod.POST,
    body
  })
}

const update = async (id: string, body: PostsType) => {
  return await axiosHandler<string>(BASE_URL, {
    action: `${id}`,
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

export default { getAll, getById, getCount, create, update, remove }
