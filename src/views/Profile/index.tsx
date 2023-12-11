import { IAccountIn } from '@/@types/Account/Dto/in'
import { useLoaderData, useNavigation } from 'react-router-dom'
import ProfileView from './components/ProfileView'

const Profile = () => {
  const profile = useLoaderData() as IAccountIn
  const { state } = useNavigation()

  const loading = state === 'loading'

  return <ProfileView profile={profile} loading={loading} />
}

export default Profile
