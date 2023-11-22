import { TextField } from '@/components/shared/ui'
import { AccountContext } from '@/context/AccountContext'
import { Router } from '@/router'
import { Button, Card } from '@material-tailwind/react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IAccountLoginDto } from '../@types/login.dto'
import { loginHandler } from '../handler/login.handler'

const Login = () => {
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
    const res = await loginHandler(data, getAccount())
    setAccount(res)
    navigate(Router.DASHBOARD)
  }

  return (
    <div className="h-screen bg-blue-gray-50">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center h-full">
          <Card className="p-8 w-1/3">
            <span className="flex justify-center mb-6 text-8xl text-gray-500">
              <MdOutlineAccountCircle />
            </span>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-2xl text-gray-800 text-center mb-5">
                ورود
              </h1>

              <div className="mb-3 custom-input">
                <TextField
                  label="شماره تلفن"
                  errorMessage={errors.phoneNumber?.message}
                  {...register('phoneNumber', {
                    required: { value: true, message: 'form is required' }
                  })}
                />
              </div>

              <div className="mb-3 custom-input">
                <TextField
                  type="password"
                  label="رمز عبور"
                  {...register('password', {
                    required: { value: true, message: 'form is required' }
                  })}
                />
              </div>

              <Button type="submit" fullWidth>
                ورود
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
