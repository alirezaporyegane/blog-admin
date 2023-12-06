import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'admin/post-categories'

const getAllItem = async (account: any) => {
  return await axiosHandler(BASE_URL, account, {
    method: RequestMethod.GET
  })
}

export default { getAllItem }
