import { Users } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { KeyOutlined } from '@mui/icons-material'
import { Button, Card, FormControl, Grid, TextField } from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import TitleSection from '../shared/TitleSection'

type Params = {
  id: string
}

export type EditPasswordDto = {
  newPassword: string
  confirmNewPassword: string
}

const newPasswordRoles = {
  required: { value: true, message: t('newPasswordIsRequired') },
  minLength: {
    value: 6,
    message: t('minLengthMustBeGreaterThanSix')
  }
}

const confirmNewPasswordRoles = {
  required: { value: true, message: t('newPasswordIsRequired') },
  minLength: {
    value: 6,
    message: t('minLengthMustBeGreaterThanSix')
  }
}

const EditPasswordView = () => {
  const [progressing, setProgressing] = useState(false)
  const { id } = useParams() as Params
  const navigate = useNavigate()

  const defaultValue: EditPasswordDto = {
    newPassword: '',
    confirmNewPassword: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue
  })

  const onSubmit = async (data: EditPasswordDto) => {
    try {
      setProgressing(true)
      await Users.updatePassword(id, data)
      success(t('userCreated'))
      navigate('/users')
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  return (
    <>
      <TitleSection title={t('editPassword')} icon={<KeyOutlined />} />

      <Grid container display={'flex'} justifyContent={'center'}>
        <Grid item xl={6}>
          <Card
            variant="elevation"
            sx={{
              p: 3,
              width: 1,
              borderRadius: 3,
              boxShadow:
                'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
            }}
          >
            <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                sx={{ mb: 3 }}
                label={t('newPassword')}
                error={!!errors.newPassword?.message}
                {...register('newPassword', newPasswordRoles)}
              />

              <TextField
                fullWidth
                sx={{ mb: 3 }}
                label={t('confirmNewPassword')}
                error={!!errors.confirmNewPassword?.message}
                {...register('confirmNewPassword', confirmNewPasswordRoles)}
              />

              <Button
                size="large"
                variant="contained"
                color="success"
                disabled={progressing}
                onClick={handleSubmit(onSubmit)}
              >
                {t('edit')}
              </Button>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default EditPasswordView
