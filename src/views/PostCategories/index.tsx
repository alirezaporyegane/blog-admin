import { PostCategoryType } from '@/@types/PostCategories'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData } from 'react-router-dom'
const PostCategoriesView = lazy(
  () => import('@/components/PostCategories/PostCategoriesView')
)

export const PostCategories = () => {
  const data = useLoaderData() as PostCategoryType[]

  return (
    <Suspense fallback={<Loading />}>
      <PostCategoriesView data={data} />
    </Suspense>
  )
}
