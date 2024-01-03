import { Field } from '@/components/shared/DataTable'
import { t } from 'i18next'

const nameRole = {
  required: { value: true, message: 'name is required' }
}

const slugRole = {
  required: { value: true, message: 'slug is required' }
}

const publishRole = {
  required: { value: true, message: 'publish is required' }
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
    xl: 6,
    roles: nameRole
  },
  {
    id: 2,
    typeField: 'TextField',
    fieldName: 'slug',
    variant: 'outlined',
    label: t('slug'),
    fullWidth: true,
    xl: 6,
    roles: slugRole
  },
  {
    id: 3,
    typeField: 'TextField',
    fieldName: 'excerpt',
    variant: 'outlined',
    label: t('excerpt'),
    fullWidth: true,
    xl: 12
  },
  {
    id: 4,
    typeField: 'TextField',
    fieldName: 'lead',
    variant: 'outlined',
    label: t('lead'),
    fullWidth: true,
    xl: 6
  },
  {
    id: 5,
    typeField: 'TextField',
    fieldName: 'metaTitle',
    variant: 'outlined',
    label: t('metaTitle'),
    fullWidth: true,
    xl: 6
  },
  {
    id: 6,
    typeField: 'DateField',
    fieldName: 'publish',
    label: t('published'),
    fullWidth: true,
    xl: 6,
    roles: publishRole
  },
  {
    id: 7,
    typeField: 'SwitchField',
    fieldName: 'active',
    xl: 6,
    lg: 6,
    md: 12,
    xs: 12,
    label: t('active')
  },
  {
    id: 8,
    typeField: 'UploaderField',
    fieldName: 'image',
    label: t('image'),
    xl: 6
  },
  {
    id: 9,
    typeField: 'UploaderField',
    fieldName: 'header',
    label: t('header'),
    xl: 6
  },
  {
    id: 10,
    typeField: 'TextField',
    fieldName: 'metaDescription',
    variant: 'outlined',
    multiline: true,
    label: t('metaDescription'),
    fullWidth: true,
    xl: 12
  },
  {
    id: 11,
    typeField: 'TextField',
    fieldName: 'body',
    variant: 'outlined',
    multiline: true,
    label: t('text'),
    fullWidth: true,
    xl: 12
  },
  
] as Field[]
