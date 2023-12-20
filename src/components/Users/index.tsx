import { TableHeader } from '@/components/shared/Table'
import { Users as UserServices } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditNoteOutlined,
  GroupOutlined,
  InfoOutlined,
  KeyOutlined
} from '@mui/icons-material'
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom'
const Table = lazy(() => import('@/components/shared/Table'))
const TitleSection = lazy(() => import('@/components/shared/TitleSection'))

export type UserDtoIn = {
  _id: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  confirmEmail: boolean
  confirmedProfile: boolean
  password: string
  confirmPassword: string
  job: string
  legality: number
  gender: string
  birthDate: string
  nationalId: string
  confirmPhoneNumber: boolean
  suspended: boolean
  role: string[]
}

type Props = {
  data: UserDtoIn[]
  count: number
}

const FilterSection = () => {
  const [searchParams] = useSearchParams()
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: Object.fromEntries(searchParams) || {}
  })

  return (
    <TitleSection
      title={t('users')}
      icon={<GroupOutlined />}
      showCreateButton
      showFilterButton
      handleSubmit={handleSubmit}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="ID"
            {...register('id')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('userName')}
            {...register('userName')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('firstName')}
            {...register('firstName')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('lastName')}
            {...register('lastName')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('phoneNumber')}
            {...register('phoneNumber')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('email')}
            {...register('email')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('job')}
            {...register('job')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('nationalId')}
            {...register('nationalId')}
          />
        </Grid>
      </Grid>
    </TitleSection>
  )
}

const User = ({ data, count }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const submit = useSubmit()
  const navigate = useNavigate()
  const columns: TableHeader[] = [
    {
      key: '_id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'firstName',
      label: t('firstName'),
      sortable: true
    },
    {
      key: 'lastName',
      label: t('lastName'),
      sortable: true
    },
    {
      key: 'userName',
      label: t('userName'),
      sortable: true
    },
    {
      key: 'phoneNumber',
      label: t('phoneNumber'),
      sortable: true
    },
    {
      key: 'email',
      label: t('email'),
      sortable: true
    },
    {
      key: 'confirmedProfile',
      label: t('confirmedProfile'),
      sortable: true
    },
    {
      key: 'action',
      label: '',
    }
  ]

  const remove = async (id: string) => {
    try {
      setLoading(true)
      await UserServices.remove(id)
      submit(location.search, {
        unstable_viewTransition: true,
        preventScrollReset: true
      })
      success(t('userDeletedSuccessFully'))
    } catch (err) {
      errorHandler(err)
    } finally {
      setLoading(false)
    }
  }

  const changeRoute = async (id: string, isEdit: boolean) => {
    if (isEdit) navigate(`/users/edit/${id}`)
    else navigate(`/users/edit-password/${id}`)
  }

  const cellContentProps = (key: string | number, item: any) => {
    if (key === '_id') {
      return (
        <Tooltip title={item[key]} placement="top">
          <IconButton size="small" color="info">
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      )
    }

    if (key === 'confirmedProfile') {
      return (
        <>
          {item[key] ? (
            <CheckOutlined color="success" />
          ) : (
            <CloseOutlined color="error" />
          )}
        </>
      )
    }

    if (key === 'action') {
      return (
        <Box display={'flex'} justifyContent={'end'}>
          <Tooltip title={t('editPassword')} placement="top">
            <IconButton
              size="small"
              color="warning"
              onClick={() => changeRoute((item as UserDtoIn)._id, false)}
            >
              <KeyOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('edit')} placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => changeRoute((item as UserDtoIn)._id, true)}
            >
              <EditNoteOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('delete')} placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() => remove(item._id)}
            >
              <DeleteTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }

    return <>{item[key]}</>
  }

  return (
    <>
      <FilterSection />

      <Table
        items={data}
        loading={loading}
        heads={columns}
        count={count}
        cellContentProps={cellContentProps}
      />
    </>
  )
}

export default User
