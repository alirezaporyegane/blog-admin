import { UserDtoIn } from '@/@types/User/Dto/user.dto.in'
import { lazy } from 'react'
import { useLoaderData } from 'react-router-dom'
const UserView = lazy(() => import('@/components/Users'))

const Users = () => {
  const user = useLoaderData() as UserDtoIn[]

  return <UserView data={user} />
}

export default Users
