import { PostCategoryType } from '@/@types/PostCategories'
import TitleSection from '@/components/shared/TitleSection'
import { PostCategories } from '@/services/api'
import { success } from '@/utils/Notify'
import { AppRegistrationOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import DataTable from '../shared/DataTable'
import DataFields from './Forms/EditForm'
import { errorHandler } from '@/services/api/ErrorHandler'

type Props = {
  data: PostCategoryType
}

const buttonGrids = {
  xs: 4,
  lg: 12
}

type Params = {
  id: string
}

export default function EditView({ data }: Props) {
  const { state } = useNavigation()
  const navigate = useNavigate()
  const { id } = useParams() as Params
  const [progressing, setProgressing] = useState<boolean>(false)
  const loading = state === 'loading'
  const onSubmit = async (data: PostCategoryType) => {
    try {
      setProgressing(true)
      await PostCategories.update(id, data)
      success(t('userCreated'))
      navigate('/post-categories')
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }
  return (
    <>
      <TitleSection
        title={t('editPostCategories')}
        icon={<AppRegistrationOutlined />}
      />

      <DataTable
        idEdit
        onSubmit={onSubmit}
        progressing={progressing}
        defaultValue={data}
        initializing={loading}
        fields={DataFields}
        gridSpacing={3}
        buttonGrids={buttonGrids}
      />
    </>
  )
}
