import DataTable from '@/components/shared/DataTable'
import { Users } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { GroupOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserDtoIn } from '.'
import TitleSection from '../shared/TitleSection'
import DataFields from './Forms/EditForms'

type Props = {
  data: UserDtoIn
  loading: boolean
}

type Params = {
  id: string
}

const CreateView = ({ data, loading }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams() as Params
  const [progressing, setProgressing] = useState(false)

  async function onSubmit(data: UserDtoIn) {
    try {
      await Users.update(id, data)
      success(t('userCreated'))
      navigate('/users')
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  const buttonGrids = {
    xs: 4,
    lg: 12
  }

  return (
    <>
      <TitleSection title={t('editUser')} icon={<GroupOutlined />} />

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

export default CreateView
