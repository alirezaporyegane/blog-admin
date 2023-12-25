import { PostsType } from '@/@types/Posts'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData } from 'react-router-dom'

const PostsView = lazy(() => import('@/components/Posts/PostsView'))

export const Posts = () => {
  const { items, count } = useLoaderData() as {
    items: PostsType[]
    count: number
  }

  return (
    <Suspense fallback={<Loading />}>
      <PostsView data={items} count={count} />
    </Suspense>
  )
}
