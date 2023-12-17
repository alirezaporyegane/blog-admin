import { useState } from 'react'
import { success } from '@/utils/Notify'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Account } from '@/services/api'
import { IAccountIn } from '@/@types/Account/Dto/in'
import DataTable from '@/components/shared/DataTable'
import DataFields from '@/Forms/Profile'
import { t } from 'i18next'

const CreateView = () => {
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
      progressing={progressing}
      fields={DataFields}
      gridSpacing={3}
      buttonGrids={buttonGrids}
    />
  )
}

export default CreateView
