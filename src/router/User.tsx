import { Role } from '@/context/AccountContext'
import { Users as UserService } from '@/services'
import { errorHandler } from '@/services/errorHandler'
import Users from '@/views/Users'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: '/users',
  loader: ({ request: { signal } }) => {
    try {
      return UserService.getAll(signal)
    } catch (err) {
      errorHandler(err)
    }
  },
  element: (
    <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
      <Users />
    </ProtectedRoute>
  )
} as RouteObject
