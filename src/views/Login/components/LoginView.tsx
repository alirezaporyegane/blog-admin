import { IAccountLoginDtoOut } from '@/@types/Account/Dto/out'
import { AccountContext } from '@/context/AccountContext'
import { Account } from '@/services'
import { success } from '@/utils/Notify'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const LoginView = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(false)
  const { getAccount, setAccount } = useContext(AccountContext)
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

  const errorClass = {
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      bottom: -17,
      fontSize: 10
    }
  }

  const navigate = useNavigate()

  async function onSubmit(data: IAccountLoginDtoOut) {
    try {
      setLoading(true)
      const res = await Account.loginHandler(data, getAccount())
      setAccount(res)
      navigate('/dashboard')
      success(t('loginSuccess'))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const phoneNumberValidation = {
    required: {
      value: true,
      message: t('phoneNumberIsRequired')
    }
  }

  const passwordValidate = {
    required: { value: true, message: t('passwordIsRequired') },
    minLength: {
      value: 6,
      message: t('minLengthMustBeGreaterThanSix')
    }
  }

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={() => setType(!type)}>
        {type ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50">
      <Box
        sx={{
          height: '100vh'
        }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 6,
              width: 1,
              maxWidth: 420,
              borderRadius: 3
            }}
            classes={{
              root: '!shadow-sm'
            }}
          >
            <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="h5"
                classes={{
                  h5: '!font-semibold'
                }}
              >
                {t('login')}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                {t('doNotHaveAccount')}

                <Link
                  to="/register"
                  className="font-bold text-blue-900 hover:underline ms-2"
                >
                  {t('signUp')}
                </Link>
              </Typography>

              <Stack spacing={3}>
                <TextField
                  size="small"
                  label={t('phoneNumber')}
                  error={!!errors.phoneNumber?.message}
                  helperText={errors.phoneNumber?.message}
                  {...register('phoneNumber', phoneNumberValidation)}
                  sx={errorClass}
                />

                <TextField
                  size="small"
                  label={t('password')}
                  type={type ? 'text' : 'password'}
                  autoComplete="new-password"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment
                  }}
                  {...register('password', passwordValidate)}
                  sx={errorClass}
                />

                <Link
                  to="/forget-password"
                  className="font-bold text-sm text-blue-900 hover:underline ms-2"
                >
                  {t('forgetPassword')}
                </Link>

                <Button
                  variant="contained"
                  size="large"
                  disabled={loading}
                  classes={{
                    containedPrimary: '!rounded-lg'
                  }}
                  color="primary"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  {t('login')}
                </Button>
              </Stack>
            </FormControl>
          </Card>
        </Stack>
      </Box>
    </div>
  )
}

export default LoginView
