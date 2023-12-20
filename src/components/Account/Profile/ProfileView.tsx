import { IAccountIn } from '@/@types/Account/Dto/in'
import DataTable from '@/components/shared/DataTable'
import TitleSection from '@/components/shared/TitleSection'
import { Account } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { PersonOutline } from '@mui/icons-material'
import { t } from 'i18next'
import { useState } from 'react'
import DataFields from './Forms'

type Props = {
  profile: IAccountIn | undefined
  loading: boolean
}

const ProfileView = ({ profile, loading }: Props) => {
  const [progressing, setProgressing] = useState(false)

  async function onSubmit(data: IAccountIn) {
    try {
      setProgressing(true)
      await Account.updateProfileHandler(data)
      success(t('profileUpdated'))
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
      <TitleSection title={t('profile')} icon={<PersonOutline />} />

      <DataTable
        onSubmit={onSubmit}
        initializing={loading}
        progressing={progressing}
        defaultValue={profile}
        fields={DataFields}
        gridSpacing={3}
        buttonGrids={buttonGrids}
      />
    </>
  )
}

export default ProfileView
