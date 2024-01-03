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
    fieldName: 'userName',
    dir: 'auto',
    variant: 'outlined',
    label: t('userName'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '4',
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
    id: '5',
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
    id: '8',
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
    id: '9',
    typeField: 'TextField',
    fieldName: 'nationalId',
    dir: 'auto',
    variant: 'outlined',
    label: t('nationalId'),
    fullWidth: true,
    lg: 6,
    sx: { errorClass }
  },
  {
    id: '10',
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
    id: '11',
    typeField: 'SelectField',
    fieldName: 'role',
    labelId: 'role',
    fullWidth: true,
    lg: 6,
    multiple: true,
    label: t('role'),
    options: [
      { id: 1, text: t('select'), value: undefined, disabled: true },
      { id: 2, text: t('user'), value: 'USER' },
      { id: 3, text: t('writer'), value: 'WRITER' },
      { id: 4, text: t('admin'), value: 'ADMIN' }
    ],
    roles: {
      required: {
        value: true,
        message: t('emailIsRequired')
      }
    }
  },
  {
    id: '12',
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
    id: '13',
    typeField: 'DateField',
    fieldName: 'birthDate',
    className: 'w-full',
    fullWidth: true,
    lg: 6,
    label: t('birthDate')
  },
  {
    id: '14',
    typeField: 'SwitchField',
    fieldName: 'confirmEmail',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('emailConfirmed')
  },
  {
    id: '15',
    typeField: 'SwitchField',
    fieldName: 'confirmPhoneNumber',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('phoneNumberConfirmed')
  },
  {
    id: '16',
    typeField: 'SwitchField',
    fieldName: 'confirmedProfile',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('confirmedProfile')
  },
  {
    id: '17',
    typeField: 'SwitchField',
    fieldName: 'suspended',
    xl: 3,
    lg: 4,
    md: 6,
    xs: 12,
    label: t('suspended')
  }
] as Field[]
