import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'
import { TableHeader } from '@/components/shared/Table'
import { Users as UserServices } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import {
  DeleteTwoTone,
  EditNoteOutlined,
  InfoOutlined
} from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import { useSubmit } from 'react-router-dom'
const Table = lazy(() => import('@/components/shared/Table'))


type Props = {
  data: UserDtoIn[]
  count: number
}

const User = ({ data, count }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const submit = useSubmit()
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
      key: 'action',
      label: ''
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

    if (key === 'action') {
      return (
        <Box sx={{ textAlign: 'end' }}>
          <Tooltip title={t('edit')} placement="top">
            <IconButton size="small" color="info">
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
    <Table
      items={data}
      loading={loading}
      heads={columns}
      count={count}
      cellContentProps={cellContentProps}
    />
  )
}

export default User
