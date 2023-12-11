import { PostCategories as PostCategoriesService } from '@/services'
import { useEffect } from 'react'

const PostCategories = () => {
  useEffect(() => {
    PostCategoriesService.getAllItem()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])

  return <>hi</>
}

export default PostCategories
