import { LoginView } from '@/modules/Account/Components/Login'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('login')}</title>
      </Helmet>

      <LoginView />
    </>
  )
}

export default Login
