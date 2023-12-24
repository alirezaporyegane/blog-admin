import { Button, Card, FormControl, Grid, TextField } from '@mui/material'
import { t } from 'i18next'
import { memo } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  progressing: boolean
  onSubmit: (data: any) => void
}

type FieldValue = {
  name: string
  slug: string
}

const roles = {
  required: { value: true, message: t('passwordIsRequired') }
}

function Component({ onSubmit, progressing }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<FieldValue>({ mode: 'onChange' })

  const handleOnSubmit = (data: FieldValue) => {
    onSubmit(data)
    reset()
    setValue('name', '')
    setValue('slug', '')
    setFocus('name')
  }

  return (
    <Card
      variant="elevation"
      sx={{
        p: 3,
        width: 1,
        mb: 3,
        borderRadius: 3,
        boxShadow:
          'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
      }}
    >
      <FormControl fullWidth onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={3}>
          <Grid item xl={6}>
            <TextField
              size="small"
              fullWidth
              label={t('name')}
              error={!!errors.name?.message}
              {...register('name', roles)}
            />
          </Grid>

          <Grid item xl={6}>
            <TextField
              size="small"
              fullWidth
              label={t('slug')}
              error={!!errors.slug?.message}
              {...register('slug', roles)}
            />
          </Grid>

          <Grid item xl={12}>
            <Button
              variant="contained"
              color="success"
              disabled={progressing}
              onClick={handleSubmit(handleOnSubmit)}
            >
              {t('save')}
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Card>
  )
}

const Create = memo(Component, (prevProps, newProps) => {
  return prevProps.progressing === newProps.progressing
})

export default Create
