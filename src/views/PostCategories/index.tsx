import { PostCategories as PostCategoriesService } from '@/services/api'
import { useEffect } from 'react'

export const PostCategories = () => {
  useEffect(() => {
    PostCategoriesService.getAllItem()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])

  return <>hi</>
}
