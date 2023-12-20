import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'

const CreateView = lazy(() => import('@/components/Users/CreateView'))

const Create = () => {
  return (
    <Suspense fallback={<Loading boxHeight={700}/>}>
      <CreateView />
    </Suspense>
  )
}

export default Create
