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
    fieldName: 'firstName',
    dir: 'auto',
    variant: 'outlined',
    label: t('firstName'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '2',
    typeField: 'TextField',
    fieldName: 'lastName',
    dir: 'auto',
    variant: 'outlined',
    label: t('lastName'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '3',
    typeField: 'TextField',
    fieldName: 'email',
    dir: 'auto',
    variant: 'outlined',
    label: t('email'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass },
    roles: {
      required: {
        value: true,
        message: t('emailIsRequired')
      }
    }
  },
  {
    id: '4',
    typeField: 'TextField',
    fieldName: 'phoneNumber',
    dir: 'auto',
    variant: 'outlined',
    label: t('phoneNumber'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass },
    roles: {
      required: {
        value: true,
        message: t('phoneNumberIsRequired')
      }
    }
  },
  {
    id: '5',
    typeField: 'TextField',
    fieldName: 'job',
    dir: 'auto',
    variant: 'outlined',
    label: t('job'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '6',
    typeField: 'SelectField',
    fieldName: 'legality',
    labelId: 'selectLegality',
    fullWidth: true,
    lg: 6,
    label: t('legality'),
    options: [
      { id: 1, text: t('select'), value: undefined, disabled: true },
      { id: 2, text: t('real'), value: 0 },
      { id: 3, text: t('legal'), value: 1 }
    ]
  },
  {
    id: '7',
    typeField: 'SelectField',
    fieldName: 'gender',
    labelId: 'selectGender',
    fullWidth: true,
    lg: 6,
    label: t('gender'),
    options: [
      { id: 1, text: t('select'), value: undefined, disabled: true },
      { id: 2, text: t('woman'), value: 'FEMALE' },
      { id: 3, text: t('man'), value: 'MALE' }
    ]
  },
  {
    id: '8',
    typeField: 'DateField',
    fieldName: 'birthDate',
    className: 'w-full',
    fullWidth: true,
    lg: 6,
    label: t('birthDate')
  }
] as Field[]