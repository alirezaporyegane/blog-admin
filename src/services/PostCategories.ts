import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'admin/post-categories'

const getAllItem = async () => {
  return await axiosHandler(BASE_URL, {
    method: RequestMethod.GET
  })
}

export default { getAllItem }
