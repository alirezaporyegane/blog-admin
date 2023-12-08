import { AccountContext } from '@/context/AccountContext'
import { PostCategories as PostCategoriesService } from '@/services'
import { useContext, useEffect } from 'react'

const PostCategories = () => {
  const { getAccount } = useContext(AccountContext)

  useEffect(() => {
    if (Object.keys(getAccount()).length) {
      PostCategoriesService.getAllItem(getAccount())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }, [getAccount])

  return <>hi</>
}

export default PostCategories
