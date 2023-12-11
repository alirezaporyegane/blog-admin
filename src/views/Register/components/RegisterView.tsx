import { IAccountRegisterDtoOut } from '@/@types/Account/Dto/out'
import { AccountContext } from '@/context/AccountContext'
import { Account } from '@/services'
import { success } from '@/utils/Notify'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Grid,
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

const RegisterView = () => {
  const [loading, setLoading] = useState(false)
  const [passwordType, setPasswordType] = useState(false)
  const [confirmPasswordType, setConfirmPasswordType] = useState(false)
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
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { setAccount } = useContext(AccountContext)
  const navigate = useNavigate()

  async function onSubmit(data: IAccountRegisterDtoOut) {
    try {
      setLoading(true)
      const res = await Account.registerHandler(data)
      setAccount(res)
      navigate('/dashboard')
      success(t('loginSuccess'))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const errorClass = {
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      bottom: -17,
      fontSize: 10
    }
  }

  const phoneNumberRoles = {
    required: { value: true, message: t('phoneNumberIsRequired') }
  }

  const userNameRoles = {
    required: { value: true, message: t('userNameIsRequired') }
  }

  const emailRoles = {
    required: { value: true, message: t('emailIsRequired') }
  }

  const passwordValidate = {
    required: { value: true, message: t('passwordIsRequired') },
    minLength: {
      value: 6,
      message: t('minLengthMustBeGreaterThanSix')
    }
  }

  const endAdornmentPassword = (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={() => setPasswordType(!passwordType)}>
        {passwordType ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  )

  const endAdornmentConfirmPassword = (
    <InputAdornment position="end">
      <IconButton
        edge="end"
        onClick={() => setConfirmPasswordType(!confirmPasswordType)}
      >
        {confirmPasswordType ? <Visibility /> : <VisibilityOff />}
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
              maxWidth: { xs: '90%', md: '35%' },
              borderRadius: 3
            }}
            classes={{
              root: '!shadow-sm'
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="h5"
                classes={{
                  h5: '!font-semibold'
                }}
              >
                {t('signUp')}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                {t('haveAccount')}

                <Link
                  to="/login"
                  className="font-bold text-blue-900 hover:underline ms-2"
                >
                  {t('login')}
                </Link>
              </Typography>

              <Grid
                container
                spacing={3}
                classes={{
                  root: '!mb-6'
                }}
              >
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    dir="auto"
                    size="small"
                    variant="outlined"
                    label={t('firstName')}
                    {...register('firstName')}
                    sx={errorClass}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    fullWidth
                    dir="auto"
                    size="small"
                    variant="outlined"
                    label={t('lastName')}
                    {...register('lastName')}
                    sx={errorClass}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={3}
                classes={{
                  root: '!mb-6'
                }}
              >
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    dir="auto"
                    size="small"
                    variant="outlined"
                    label={t('userName')}
                    error={!!errors.userName?.message}
                    helperText={errors.userName?.message}
                    {...register('userName', userNameRoles)}
                    sx={errorClass}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={!!errors.phoneNumber?.message}
                    helperText={errors.phoneNumber?.message}
                    label={t('phoneNumber')}
                    {...register('phoneNumber', phoneNumberRoles)}
                    sx={errorClass}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label={t('email')}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                classes={{
                  root: '!mb-6'
                }}
                {...register('email', emailRoles)}
                sx={errorClass}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                variant="outlined"
                autoComplete="new-password"
                label={t('password')}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: endAdornmentPassword
                }}
                classes={{
                  root: '!mb-6'
                }}
                {...register('password', passwordValidate)}
                sx={errorClass}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                variant="outlined"
                label={t('confirmPassword')}
                error={!!errors.confirmPassword?.message}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: endAdornmentConfirmPassword
                }}
                classes={{
                  root: '!mb-10'
                }}
                {...register('confirmPassword', passwordValidate)}
                sx={errorClass}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
                className="mb-5"
                disabled={loading}
              >
                {t('signUp')}
              </Button>
            </form>
          </Card>
        </Stack>
      </Box>
    </div>
  )
}

export default RegisterView
