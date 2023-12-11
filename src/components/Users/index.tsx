import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'
import Table, { TableHeader } from '@/components/shared/Table'
import { t } from 'i18next'

type Props = {
  data: UserDtoIn[]
}

const User = ({ data }: Props) => {
  const columns: TableHeader[] = [
    {
      key: '_id',
      label: 'ID',
      classes: 'w-30 '
    },
    {
      key: 'firstName',
      label: t('firstName')
    },
    {
      key: 'lastName',
      label: t('lastName')
    },
    {
      key: 'userName',
      label: t('userName')
    }
  ]

  return <Table items={data} heads={columns} />
}

export default User
