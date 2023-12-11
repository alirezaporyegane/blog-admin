import { Role } from '@/context/AccountContext'
import { Account } from '@/services'
import { errorHandler } from '@/services/errorHandler'
import Profile from '@/views/Profile'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: '/profile',
  loader: ({ request: { signal } }) => {
    try {
      return Account.getProfileHandler(signal)
    } catch (err) {
      errorHandler(err)
    }
  },
  element: (
    <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
      <Profile />
    </ProtectedRoute>
  )
} as RouteObject
