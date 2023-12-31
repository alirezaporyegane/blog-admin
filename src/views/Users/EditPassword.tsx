import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'

const EditPasswordView = lazy(
  () => import('@/components/Users/EditPasswordView')
)

export const EditPassword = () => {
  return (
    <Suspense fallback={<Loading boxHeight={200} />}>
      <EditPasswordView />
    </Suspense>
  )
}
