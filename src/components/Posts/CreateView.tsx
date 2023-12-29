import { PostsType } from '@/@types/Posts'
import { errorHandler } from '@/services/api/ErrorHandler'
import { buttonGrids } from '@/utils/variables'
import { PostAddOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import CreateForms from './Forms/CreateForm'
import Uploader from '../shared/Uploader'
const TitleSection = lazy(() => import('@/components/shared/TitleSection'))
const DataTable = lazy(() => import('@/components/shared/DataTable'))

export default function CreateView() {
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

  const onSubmit = (data: PostsType) => {
    try {
      setProgressing(true)
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  const handleOnChange = (files: string | string[]) => {
    console.log(files)
  }

  return (
    <>
      <TitleSection title={t('addPosts')} icon={<PostAddOutlined />} />

      <DataTable
        onSubmit={onSubmit}
        progressing={progressing}
        fields={CreateForms}
        defaultValue={defaultValue}
        gridSpacing={3}
        buttonGrids={buttonGrids}
      />

      <Uploader onChange={handleOnChange} />
    </>
  )
}
