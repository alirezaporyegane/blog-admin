import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'
import { lazy } from 'react'
import { useLoaderData } from 'react-router-dom'

const UserView = lazy(() => import('@/components/Users'))

const Users = () => {
  const { items, count } = useLoaderData() as {
    items: UserDtoIn[]
    count: number
  }

  return <UserView data={items} count={count} />
}

export default Users
