import { Account } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Role } from '@/store/authStore'
import { PostCategories } from '@/views/PostCategories'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: '/post-categories',
  element: (
    <ProtectedRoute roles={[Role.ADMIN]}>
      <PostCategories />
    </ProtectedRoute>
  ),
  loader: ({ request: { signal } }) => {
    try {
      return Account.getProfileHandler(signal)
    } catch (err) {
      errorHandler(err)
      return null
    }
  }
} as RouteObject
