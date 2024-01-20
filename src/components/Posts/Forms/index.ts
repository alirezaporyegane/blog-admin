import { Field } from '@/components/shared/DataTable'
import { PostCategories as postCategoriesService } from '@/services/api'
import { Role, useAuthStore } from '@/store/authStore'
import { t } from 'i18next'

type Filter = {
  keyword: string
  page: number
  size: number
}

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
    id: '1',
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
    id: '2',
    typeField: 'TextField',
    fieldName: 'slug',
    variant: 'outlined',
    label: t('slug'),
    fullWidth: true,
    xl: 6,
    roles: slugRole
  },
  {
    id: '3',
    typeField: 'TextField',
    fieldName: 'excerpt',
    variant: 'outlined',
    label: t('excerpt'),
    fullWidth: true,
    xl: 12
  },
  {
    id: '4',
    typeField: 'TextField',
    fieldName: 'lead',
    variant: 'outlined',
    label: t('lead'),
    fullWidth: true,
    xl: 6
  },
  {
    id: '6',
    typeField: 'TextField',
    fieldName: 'readTime',
    variant: 'outlined',
    label: t('readTime'),
    fullWidth: true,
    xl: 6
  },
  {
    id: '7',
    typeField: 'TextField',
    fieldName: 'metaTitle',
    variant: 'outlined',
    label: t('metaTitle'),
    fullWidth: true,
    xl: 6
  },
  {
    id: '8',
    typeField: 'DateField',
    fieldName: 'publish',
    label: t('published'),
    fullWidth: true,
    xl: 6,
    roles: publishRole
  },
  {
    id: '9',
    typeField: 'AutoCompleteField',
    fieldName: 'category',
    xl: 6,
    lg: 6,
    md: 12,
    xs: 12,
    fullWidth: true,
    label: t('category'),
    apiServer: async (filter: Filter) =>
      await postCategoriesService.getInfo(filter)
  },
  {
    id: '10',
    typeField: 'SwitchField',
    fieldName: 'active',
    xl: 6,
    lg: 6,
    md: 12,
    xs: 12,
    label: t('active'),
    allowed: useAuthStore.getState().account?.role.includes(Role.ADMIN)
  },
  {
    id: '11',
    typeField: 'UploaderField',
    fieldName: 'image',
    label: t('image'),
    xl: 6
  },
  {
    id: '12',
    typeField: 'UploaderField',
    fieldName: 'header',
    label: t('header'),
    xl: 6
  },
  {
    id: '13',
    typeField: 'TextField',
    fieldName: 'metaDescription',
    variant: 'outlined',
    multiline: true,
    label: t('metaDescription'),
    fullWidth: true,
    xl: 12
  },
  {
    id: '14',
    typeField: 'TextField',
    fieldName: 'body',
    variant: 'outlined',
    multiline: true,
    label: t('text'),
    fullWidth: true,
    xl: 12
  }
] as Field[]

console.log(useAuthStore.getState().account);
