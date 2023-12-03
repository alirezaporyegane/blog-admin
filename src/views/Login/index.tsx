import { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
const LoginView = lazy(() => import('./components/LoginView'))

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
