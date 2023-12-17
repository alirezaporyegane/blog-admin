import { Button, Card, FormControl, Grid, Skeleton } from '@mui/material'
import { t } from 'i18next'
import { lazy } from 'react'
import { Controller, RegisterOptions, useForm } from 'react-hook-form'
import { Props as DateFieldProps } from './components/DateField'
import { Props as SelectFieldProps } from './components/SelectField'
import { Props as TextFieldProps } from './components/TextField'

// Components
const DateField = lazy(() => import('./components/DateField'))
const SelectField = lazy(() => import('./components/SelectField'))
const TextField = lazy(() => import('./components/TextField'))

type TextType = {
  type: 'TextField'
} & TextFieldProps

type DateType = {
  type: 'DateField'
} & DateFieldProps

type SelectType = {
  type: 'SelectField'
} & SelectFieldProps

export type Field = {
  id: number
  fieldName: string
  roles?: RegisterOptions<any, string> | undefined
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
} & (TextType | DateType | SelectType)

type ButtonGrids = {
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

type Props = {
  idEdit?: boolean
  gridSpacing?: number
  buttonGrids?: ButtonGrids
  fields: Field[]
  initializing?: boolean
  progressing?: boolean
  defaultValue?: any
  onSubmit: (data: any) => void
}

type Loading = Pick<Props, 'fields' | 'buttonGrids' | 'gridSpacing'>

const DataForm = ({
  idEdit = false,
  fields,
  gridSpacing,
  initializing,
  defaultValue,
  progressing = false,
  onSubmit
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue || {}
  })

  const handleTypeField = ({
    id,
    type,
    fieldName,
    roles,
    xs = 12,
    sm = 12,
    md = 12,
    lg = 6,
    xl = 6,
    ...fieldItem
  }: Field) => {
    if (type === 'DateField')
      return (
        <Grid key={id} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <DateField
                fullWidth={fieldItem.fullWidth}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>
      )
    else if (type === 'SelectField')
      return (
        <Grid key={id} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <SelectField
            {...fieldItem}
            {...register(fieldName, roles)}
            defaultValue={(defaultValue && defaultValue[fieldName]) || ''}
            error={!!errors[fieldName]?.message}
          />
        </Grid>
      )
    else if (type === 'TextField')
      return (
        <Grid key={id} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <TextField
            {...fieldItem}
            {...register(fieldName, roles)}
            error={!!errors[fieldName]?.message}
          />
        </Grid>
      )
  }

  return (
    <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={gridSpacing}>
        {fields.map((field) => {
          return handleTypeField(field)
        })}
      </Grid>

      <Grid item lg={4}>
        {initializing ? (
          <Skeleton
            width={80}
            height={42}
            classes={{
              root: '!mt-5'
            }}
            variant="rounded"
          />
        ) : (
          <Button
            size="large"
            type="submit"
            variant="contained"
            color='success'
            classes={{ root: '!mt-5' }}
            disabled={progressing}
            onClick={handleSubmit(onSubmit)}
          >
            {idEdit ? t('edit') : t('save')}
          </Button>
        )}
      </Grid>
    </FormControl>
  )
}

const Loading = ({ fields, buttonGrids, gridSpacing }: Loading) => {
  return (
    <Grid container spacing={gridSpacing}>
      {fields.map((field) => {
        return (
          <Grid
            key={field.id}
            item
            xs={field.xs}
            sm={field.sm}
            md={field.md}
            lg={field.lg}
            xl={field.xl}
          >
            <Skeleton variant="rounded" height={56} />
          </Grid>
        )
      })}

      <Grid
        item
        xs={buttonGrids?.xs}
        sm={buttonGrids?.sm}
        md={buttonGrids?.md}
        lg={buttonGrids?.lg}
        xl={buttonGrids?.xl}
      >
        <Skeleton width={80} height={42} variant="rounded" />
      </Grid>
    </Grid>
  )
}

const DataTable = (props: Props) => {
  return (
    <Card
      variant="elevation"
      sx={{ p: 3, width: 1, borderRadius: 3 }}
      classes={{
        root: '!shadow-sm'
      }}
    >
      {props.initializing ? (
        <Loading
          fields={props.fields}
          buttonGrids={props.buttonGrids}
          gridSpacing={props.gridSpacing}
        />
      ) : (
        <DataForm {...props} />
      )}
    </Card>
  )
}

export default DataTable
