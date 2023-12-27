import { Field } from '@/components/shared/DataTable'
import { t } from 'i18next'

const roles = {
  required: { value: true, message: t('passwordIsRequired') }
}

export default [
  {
    id: 1,
    typeField: 'TextField',
    fieldName: 'name',
    dir: 'auto',
    variant: 'outlined',
    label: t('name'),
    fullWidth: true,
    lg: 6
  },
  {
    id: 2,
    typeField: 'TextField',
    fieldName: 'slug',
    variant: 'outlined',
    label: t('slug'),
    fullWidth: true,
    lg: 6
  },
  {
    id: 3,
    typeField: 'TextField',
    fieldName: 'excerpt',
    variant: 'outlined',
    label: t('excerpt'),
    fullWidth: true,
    lg: 6
  },
  {
    id: 4,
    typeField: 'TextField',
    fieldName: 'lead',
    variant: 'outlined',
    label: t('lead'),
    fullWidth: true,
    lg: 6
  },
  {
    id: 5,
    typeField: 'TextField',
    fieldName: 'metaTitle',
    variant: 'outlined',
    label: t('metaTitle'),
    fullWidth: true,
    lg: 6
  },
  {
    id: 17,
    typeField: 'SwitchField',
    fieldName: 'active',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('active')
  }
] as Field[]
