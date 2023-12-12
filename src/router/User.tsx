import { Role } from '@/context/AccountContext'
import { Users as UserService } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import Users from '@/views/Users'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { createQueryParams } from '@/utils/helpers'

export default {
  path: '/users',
  loader: ({ request: { signal, url } }) => {
    try {
      const params = createQueryParams(url)
      return UserService.getAll(params, signal)
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
