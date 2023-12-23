import { UserDtoIn } from '@/components/Users'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'

const EditView = lazy(() => import('@/components/Users/EditView'))

export const Edit = () => {
  const data = useLoaderData() as UserDtoIn
  const { state } = useNavigation()

  const loading = state === 'loading'

  return (
    <Suspense fallback={<Loading boxHeight={600} />}>
      <EditView data={data} loading={loading} />
    </Suspense>
  )
}
