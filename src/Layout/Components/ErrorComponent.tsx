import { t } from 'i18next'
import errorImg from '../../../public/img/503.jpg'
import { Button } from '@mui/material'
import { CachedOutlined } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'

const ErrorComponent = () => {
  const reload = () => {
    window.location.reload()
  }

  return (
    <>
      <Helmet>
        <title>{t('weHaveAProblem')}</title>

        <base target="_blank" href="/localhost:8080" />
      </Helmet>
      
      <div className="w-full">
        <div className="grid justify-center items-center min-h-screen text-center">
          <div>
            <img src={errorImg} alt="" width={500} height={300} />

            <h1 className="text-3xl font-semibold mb-6">
              {t('weHaveAProblem')}
            </h1>

            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={reload}
            >
              <CachedOutlined className="me-3" />

              {t('reload')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorComponent
