import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'

const CreateView = lazy(() => import('@/components/Posts/CreateView'))

export const Create = () => {
  return (
    <Suspense fallback={<Loading boxHeight={700} />}>
      <CreateView />
    </Suspense>
  )
}
