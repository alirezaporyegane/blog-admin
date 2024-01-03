import { PostsType } from '@/@types/Posts'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData } from 'react-router-dom'

const EditView = lazy(() => import('@/components/Posts/EditView'))

export const Edit = () => {
  const data = useLoaderData() as PostsType

  return (
    <Suspense fallback={<Loading boxHeight={700} />}>
      <EditView defaultValue={data}/>
    </Suspense>
  )
}
