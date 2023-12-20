import { IAccountIn } from '@/@types/Account/Dto/in'
import Loading from '@/components/shared/Loading'
import { Suspense, lazy } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
const ProfileView = lazy(
  () => import('@/components/Account/Profile/ProfileView')
)

const Profile = () => {
  const profile = useLoaderData() as IAccountIn
  const { state } = useNavigation()

  const loading = state === 'loading'

  return (
    <Suspense fallback={<Loading />}>
      <ProfileView profile={profile} loading={loading} />
    </Suspense>
  )
}

export default Profile
