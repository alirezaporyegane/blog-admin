import DataTable from '@/components/shared/DataTable'
import { Users } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { GroupAddOutlined } from '@mui/icons-material'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDtoIn } from '.'
import TitleSection from '../shared/TitleSection'
import CreateForms from './Forms/CreateForms'

const CreateView = () => {
  const navigate = useNavigate()
  const [progressing, setProgressing] = useState(false)

  async function onSubmit(data: UserDtoIn) {
    try {
      setProgressing(true)
      await Users.create(data)
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

  const defaultValue: UserDtoIn = {
    _id: '',
    userName: '',
    birthDate: '',
    confirmedProfile: false,
    confirmEmail: false,
    confirmPassword: '',
    email: '',
    firstName: '',
    gender: '',
    job: '',
    lastName: '',
    legality: 0,
    nationalId: '',
    password: '',
    phoneNumber: '',
    confirmPhoneNumber: false,
    suspended: false,
    role: []
  }

  return (
    <>
      <TitleSection title={t('createUser')} icon={<GroupAddOutlined />} />

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

export default CreateView
