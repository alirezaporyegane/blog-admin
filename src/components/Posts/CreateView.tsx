import { PostsType } from '@/@types/Posts'
import {
  PostCategories as postCategoriesService,
  Posts as postServices
} from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { buttonGrids } from '@/utils/variables'
import { PostAddOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AutoComplete from '../shared/AutoComplete'
import CreateForms from './Forms'
const TitleSection = lazy(() => import('@/components/shared/TitleSection'))
const DataTable = lazy(() => import('@/components/shared/DataTable'))

export default function CreateView() {
  const navigate = useNavigate()
  const [progressing, setProgressing] = useState<boolean>(false)
  const defaultValue: PostsType = {
    name: '',
    slug: '',
    image: '',
    active: false,
    body: '',
    categoryId: '',
    publish: '',
    header: '',
    excerpt: '',
    lead: '',
    metaDescription: '',
    metaTitle: ''
  }

  const onChange = (value: string) => {
    console.log(value)
  }

  const getInfo = async (filter: {
    keyword: string
    page: number
    size: number
  }) => {
    return await postCategoriesService.getInfo(filter)
  }

  const onSubmit = async (data: PostsType) => {
    try {
      setProgressing(true)
      await postServices.create(data)
      success(t('userCreated'))
      navigate('/posts')
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  return (
    <>
      <TitleSection title={t('addPosts')} icon={<PostAddOutlined />} />

      <AutoComplete
        sx={{ mb: 3 }}
        label="test"
        apiServer={getInfo}
        onChange={onChange}
      />

      <DataTable
        onSubmit={onSubmit}
        progressing={progressing}
        fields={CreateForms}
        defaultValue={defaultValue}
        gridSpacing={3}
        buttonGrids={buttonGrids}
      />
    </>
  )
}
