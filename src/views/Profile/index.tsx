import { IAccountIn } from '@/@types/Account/Dto/in'
import { AccountContext } from '@/context/AccountContext'
import { HeaderNameContext } from '@/context/HeaderNameContext'
import { Account } from '@/services'
import { Fade } from '@mui/material'
import { t } from 'i18next'
import { useContext, useEffect, useState, useTransition } from 'react'
import { Helmet } from 'react-helmet-async'
import Loading from './components/Loading'
import ProfileView from './components/ProfileView'

const Profile = () => {
  const { setName } = useContext(HeaderNameContext)
  const { getAccount } = useContext(AccountContext)
  const [loading, setLoading] = useState<boolean>()
  const [profile, setProfile] = useState<IAccountIn>()
  const [isPending, startTransition] = useTransition()

  useEffect(() => setName(t('profile')), [setName])

  useEffect(() => {
    setLoading(true)
    if (Object.keys(getAccount()).length) {
      Account.getProfileHandler(getAccount())
        .then((res) => setProfile(res))
        .catch((err) => console.log(err))
        .finally(() => startTransition(() => setLoading(false)))
    }
  }, [getAccount])

  if (isPending) return <Loading />

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>

      {loading ? (
        <Loading />
      ) : (
        <Fade in={loading} easing={'ease in out'}>
          <ProfileView profile={profile} account={getAccount()} />
        </Fade>
      )}
    </>
  )
}

export default Profile
