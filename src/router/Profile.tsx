import { Account } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Role } from '@/store/authStore'
import { Profile } from '@/views/Profile'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: '/profile',
  loader: ({ request: { signal } }) => {
    try {
      return Account.getProfileHandler(signal)
    } catch (err) {
      errorHandler(err)
      return null
    }
  },
  element: (
    <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
      <Profile />
    </ProtectedRoute>
  )
} as RouteObject
