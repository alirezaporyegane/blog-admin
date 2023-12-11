import { IAccountIn } from '@/@types/Account/Dto/in'
import { HeaderNameContext } from '@/context/HeaderNameContext'
import { t } from 'i18next'
import { useContext, useEffect } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import ProfileView from './components/ProfileView'

const Profile = () => {
  const { setName } = useContext(HeaderNameContext)
  const profile = useLoaderData() as IAccountIn
  const { state } = useNavigation()

  const loading = state === 'loading'

  useEffect(() => setName(t('profile')), [setName])

  return <ProfileView profile={profile} loading={loading} />
}

export default Profile
