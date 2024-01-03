import { PostsType } from '@/@types/Posts'
import { Posts as postServices } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { buttonGrids } from '@/utils/variables'
import { PostAddOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { lazy, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import CreateForms from './Forms'
const TitleSection = lazy(() => import('@/components/shared/TitleSection'))
const DataTable = lazy(() => import('@/components/shared/DataTable'))

type Props = {
  defaultValue: PostsType
}

type Params = {
  id: string
}

export default function EditView({ defaultValue }: Props) {
  const navigate = useNavigate()
  const [progressing, setProgressing] = useState<boolean>(false)
  const { state } = useNavigation()
  const { id } = useParams() as Params

  const onSubmit = async (data: PostsType) => {
    try {
      setProgressing(true)
      await postServices.update(id, data)
      success(t('userCreated'))
      navigate('/posts')
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  const loading = state === 'loading'

  return (
    <>
      <TitleSection title={t('editPosts')} icon={<PostAddOutlined />} />

      <DataTable
        idEdit
        onSubmit={onSubmit}
        initializing={loading}
        fields={CreateForms}
        progressing={progressing}
        defaultValue={defaultValue}
        gridSpacing={3}
        buttonGrids={buttonGrids}
      />
    </>
  )
}
