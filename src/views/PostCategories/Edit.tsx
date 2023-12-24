import { PostCategoryType } from '@/@types/PostCategories'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData } from 'react-router-dom'
const EditView = lazy(() => import('@/components/PostCategories/EditView')) 

export const Edit = () => {
  const data = useLoaderData() as PostCategoryType

  return (
    <Suspense fallback={<Loading />}>
      <EditView data={data} />
    </Suspense>
  )
}
