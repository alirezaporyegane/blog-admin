import DatePicker from '@/components/shared/DataPicker'
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Account } from '@/services'
import { IAccountIn } from '@/@types/Account/Dto/in'

type Props = {
  profile: IAccountIn | undefined
  account: IAccountIn
}

const ProfileView = ({ profile, account }: Props) => {
  const [loading, setLoading] = useState(false)
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: profile
  })

  const errorClass = {
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      bottom: -17,
      fontSize: 10
    }
  }

  async function onSubmit(data: IAccountIn) {
    try {
      setLoading(true)
      await Account.updateProfileHandler(data, account)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      variant="elevation"
      sx={{ p: 3, width: 1, borderRadius: 3 }}
      classes={{
        root: '!shadow-sm'
      }}
    >
      <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              dir="auto"
              variant="outlined"
              label={t('firstName')}
              sx={errorClass}
              {...register('firstName')}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              dir="auto"
              variant="outlined"
              label={t('lastName')}
              sx={errorClass}
              {...register('lastName')}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              dir="auto"
              variant="outlined"
              label={t('email')}
              sx={errorClass}
              {...register('email')}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              dir="auto"
              variant="outlined"
              label={t('phoneNumber')}
              sx={errorClass}
              {...register('phoneNumber')}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              dir="auto"
              variant="outlined"
              label={t('job')}
              sx={errorClass}
              {...register('job')}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select">{t('legality')}</InputLabel>

              <Select
                fullWidth
                labelId="select"
                label={t('legality')}
                defaultValue={profile?.legality}
                {...register('legality')}
              >
                <MenuItem value={undefined} disabled>
                  <em className="italic">{t('select')}</em>
                </MenuItem>

                <MenuItem value={0}>{t('real')}</MenuItem>

                <MenuItem value={1}>{t('legal')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  fullWidth
                  className="w-full"
                  value={field.value}
                  onChange={field.onChange}
                  label={t('birthDate')}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item lg={4}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            classes={{ root: '!mt-5' }}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {t('save')}
          </Button>
        </Grid>
      </FormControl>
    </Card>
  )
}

export default ProfileView
