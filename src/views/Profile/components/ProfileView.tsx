import { IAccountIn } from '@/@types/Account/Dto/in'
import DataFields from '@/Forms/Profile'
import DataTable from '@/components/shared/DataTable'
import { Account } from '@/services'
import { errorHandler } from '@/services/errorHandler'
import { success } from '@/utils/Notify'
import { t } from 'i18next'
import { useState } from 'react'

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
    <DataTable
      onSubmit={onSubmit}
      initializing={loading}
      progressing={progressing}
      defaultValue={profile}
      fields={DataFields}
      gridSpacing={3}
      buttonGrids={buttonGrids}
    />
  )
}

export default ProfileView
