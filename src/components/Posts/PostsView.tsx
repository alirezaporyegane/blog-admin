import { PostsType } from '@/@types/Posts'
import { TableHeader } from '@/components/shared/Table'
import useConfirm from '@/hooks/useConfirm'
import { Posts as PostsServices } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Role } from '@/store/authStore'
import { success } from '@/utils/Notify'
import { isValidRole } from '@/utils/helpers'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditNoteOutlined,
  InfoOutlined,
  StickyNote2Outlined
} from '@mui/icons-material'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from '@mui/material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom'
import DateField from '../shared/DataTable/components/DateField'
const Table = lazy(() => import('@/components/shared/Table'))
const TitleSection = lazy(() => import('@/components/shared/TitleSection'))
const DateDisplay = lazy(() => import('@/components/shared/DateDisplay'))

type Props = {
  data: PostsType[]
  count: number
}

type Options = {
  id: number
  text: string
  value: any
}

function FilterSection() {
  const [searchParams] = useSearchParams()
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: Object.fromEntries(searchParams) || {}
  })

  const activeOptions: Options[] = [
    { id: 1, value: undefined, text: t('select') },
    { id: 2, value: true, text: t('yes') },
    { id: 3, value: false, text: t('no') }
  ]

  return (
    <TitleSection
      title={t('posts')}
      icon={<StickyNote2Outlined />}
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
            label={t('name')}
            {...register('name')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={t('slug')}
            {...register('slug')}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Controller
            name="createdAt"
            control={control}
            render={({ field }) => (
              <DateField
                size="small"
                label={t('createdAt')}
                fullWidth
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Controller
            name="publish"
            control={control}
            render={({ field }) => (
              <DateField
                size="small"
                label={t('published')}
                fullWidth
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl size="small" fullWidth>
            <InputLabel id="active-select">{t('active')}</InputLabel>

            <Select
              labelId="active-select"
              label={t('active')}
              {...register('active')}
            >
              {activeOptions.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.value}>
                    {item.text}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </TitleSection>
  )
}

export default function PostsView({ data, count }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const { confirm } = useConfirm()
  const submit = useSubmit()
  const navigate = useNavigate()
  const columns: TableHeader[] = [
    {
      key: '_id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'name',
      label: t('name'),
      sortable: true
    },
    {
      key: 'slug',
      label: t('slug'),
      sortable: true
    },
    {
      key: 'createdAt',
      label: t('createdAt'),
      sortable: true
    },
    {
      key: 'publish',
      label: t('published'),
      sortable: true
    },
    {
      key: 'active',
      label: t('active'),
      sortable: true
    },
    {
      key: 'action',
      label: ''
    }
  ]

  const remove = async (id: string) => {
    try {
      await confirm(t('areYouSureYouWantDeleteThisPost'))
      setLoading(true)
      await PostsServices.remove(id)
      submit(location.search)
      success(t('postDeletedSuccessFully'))
    } catch (err) {
      if (err) errorHandler(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeRoute = async (id?: string) => {
    navigate(`/posts/edit/${id}`)
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

    if (key === 'createdAt' || key === 'publish') {
      return <DateDisplay date={item[key]} showTime dateFormat="dd/MM/yyyy" />
    }

    if (key === 'active') {
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
          <Tooltip title={t('edit')} placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => handleChangeRoute((item as PostsType)?._id)}
            >
              <EditNoteOutlined />
            </IconButton>
          </Tooltip>

          {isValidRole([Role.ADMIN]) ? (
            <Tooltip title={t('delete')} placement="top">
              <IconButton
                size="small"
                color="error"
                onClick={() => remove(item._id)}
              >
                <DeleteTwoTone />
              </IconButton>
            </Tooltip>
          ) : null}
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
