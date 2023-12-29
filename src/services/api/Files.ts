import { RequestMethod } from '@/@types/Services'
import { axiosHandler } from './Core'

const BASE_URL = 'shared/files'

const uploadFileHandler = async (
  files: FileList | null,
  folderName: string = 'image'
) => {
  const formData = new FormData()

  if (files?.length)
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i])
    }

  return await axiosHandler<string[]>(BASE_URL, {
    method: RequestMethod.POST,
    body: formData,
    params: { path: folderName }
  })
}

export default { uploadFileHandler }
