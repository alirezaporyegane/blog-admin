import { AccountContext } from '@/context/AccountContext'
import { HeaderNameContext } from '@/context/HeaderNameContext'
import { ProfileView } from '@/modules/Account/Components/Profile'
import { t } from 'i18next'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IAccount } from '../@types/account.entry'
import { getProfileHandler } from '../Handler/account.handler'

const Profile = () => {
  const { setName } = useContext(HeaderNameContext)
  const { getAccount } = useContext(AccountContext)
  const [loading, setLoading] = useState<boolean>()
  const [profile, setProfile] = useState<IAccount>()

  useEffect(() => setName(t('profile')), [setName])

  useEffect(() => {
    if (Object.keys(getAccount()).length) {
      setLoading(true)
      getProfileHandler(getAccount())
        .then((res) => setProfile(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
  }, [getAccount])

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>

      {loading ? 'loading' : <ProfileView profile={profile} account={getAccount()} />}
    </>
  )
}

export default Profile
