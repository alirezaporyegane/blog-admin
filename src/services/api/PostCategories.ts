import { PostCategoryType } from '@/@types/PostCategories'
import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'admin/post-categories'

const getAllItem = async (signal?: AbortSignal) => {
  return await axiosHandler<PostCategoryType[]>(BASE_URL, {
    method: RequestMethod.GET,
    signal
  })
}

const getInfo = async <T>(filter: T) => {
  return await axiosHandler<{
    items: { value: string; text: string }[]
    count: number
  }>(BASE_URL, {
    action: 'info',
    method: RequestMethod.GET,
    params: filter
  })
}

const getById = async (id: string, signal?: AbortSignal) => {
  return await axiosHandler<PostCategoryType>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.GET,
    signal
  })
}

const update = async (id: string, body: PostCategoryType) => {
  return await axiosHandler<PostCategoryType>(BASE_URL, {
    action: `${id}`,
    method: RequestMethod.PUT,
    body
  })
}

const patchItem = async (body: PostCategoryType[]) => {
  return await axiosHandler(BASE_URL, {
    method: RequestMethod.PATCH,
    body
  })
}

export default { getAllItem, getById, update, patchItem, getInfo }
