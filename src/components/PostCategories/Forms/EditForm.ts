import { Field } from '@/components/shared/DataTable'
import { t } from 'i18next'

const errorClass = {
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: -17,
    fontSize: 10
  }
}

export default [
  {
    id: '1',
    typeField: 'TextField',
    fieldName: 'name',
    dir: 'auto',
    variant: 'outlined',
    label: t('name'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '2',
    typeField: 'TextField',
    fieldName: 'slug',
    variant: 'outlined',
    label: t('slug'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '3',
    typeField: 'TextField',
    fieldName: 'altName',
    dir: 'auto',
    variant: 'outlined',
    label: t('altName'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '4',
    typeField: 'TextField',
    fieldName: 'metaTitle',
    dir: 'auto',
    variant: 'outlined',
    label: t('metaTitle'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '5',
    typeField: 'TextField',
    fieldName: 'metaDescription',
    dir: 'auto',
    multiline: true,
    variant: 'outlined',
    label: t('metaDescription'),
    fullWidth: true,
    lg: 12,
    xl: 12,
    sx: { errorClass }
  },
  {
    id: '6',
    typeField: 'DateField',
    fieldName: 'published',
    dir: 'auto',
    variant: 'outlined',
    label: t('published'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '7',
    typeField: 'SwitchField',
    fieldName: 'active',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('active')
  },
  {
    id: '8',
    typeField: 'UploaderField',
    fieldName: 'image',
    label: t('image'),
    xl: 6
  },
] as Field[]
