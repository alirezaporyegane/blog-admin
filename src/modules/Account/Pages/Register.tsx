import { RegisterView } from '@/modules/Account/Components/Register'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('signUp')}</title>
      </Helmet>

      <RegisterView />
    </>
  )
}

export default Register
