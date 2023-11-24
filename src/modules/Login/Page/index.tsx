import { TextField } from '@/components/shared/ui'
import { AccountContext } from '@/context/AccountContext'
import { Router } from '@/router'
import { Button, Card } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  MdOutlineAccountCircle,
  MdPhoneIphone,
  MdKey,
  MdRefresh
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { IAccountLoginDto } from '../@types/login.dto'
import { loginHandler } from '../Handler/login.handler'
import { useTranslation } from 'react-i18next'
import { success } from '@/utils/Notify'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      uniqueId: 'text',
      phoneNumber: '',
      password: ''
    }
  })

  const { getAccount, setAccount } = useContext(AccountContext)
  const navigate = useNavigate()

  async function onSubmit(data: IAccountLoginDto) {
    try {
      setLoading(true)
      const res = await loginHandler(data, getAccount())
      setAccount(res)
      navigate(Router.DASHBOARD)
      success(t('loginSuccess'))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const phoneNumberRoles = {
    required: { value: true, message: t('phoneNumberIsRequired') }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-blue-gray-600 to-blue-gray-400">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center h-full">
          <Card
            className="p-8 w-1/3 bg-blue-gray-50 bg-opacity-30"
            variant="gradient"
            color="transparent"
          >
            <span className="flex justify-center mb-6 text-9xl text-blue-gray-800">
              <MdOutlineAccountCircle />
            </span>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-2xl text-white text-center mb-5">
                {t('login')}
              </h1>

              <div className="mb-3 custom-input">
                <TextField
                  required
                  color="white"
                  variant="outlined"
                  label={t('phoneNumber')}
                  icon={<MdPhoneIphone className="text-white text-xl" />}
                  errorMessage={errors.phoneNumber?.message}
                  {...register('phoneNumber', phoneNumberRoles)}
                />
              </div>

              <div className="mb-4 custom-input">
                <TextField
                  required
                  color="white"
                  variant="outlined"
                  icon={<MdKey className="text-white text-xl" />}
                  type="password"
                  label={t('password')}
                  {...register('password', {
                    required: { value: true, message: 'form is required' }
                  })}
                />
              </div>

              <Button
                fullWidth
                type="submit"
                color="blue-gray"
                className="mb-5"
                disabled={loading}
              >
                {loading ? <MdRefresh className="animate-spin" /> : t('login')}
              </Button>

              <p className="text-center mb-0 text-white">
                {t('doNotHaveAccount')}

                <Link
                  to="/register"
                  className="text-blue-gray-800 hover:underline ms-2"
                >
                  {t('singUp')}
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
