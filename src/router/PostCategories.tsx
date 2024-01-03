import { PostCategories as PostCategoriesService } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Role } from '@/store/authStore'
import { PostCategories } from '@/views/PostCategories'
import { Edit } from '@/views/PostCategories/Edit'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: '/post-categories',
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute roles={[Role.ADMIN]}>
          <PostCategories />
        </ProtectedRoute>
      ),
      loader: ({ request: { signal } }) => {
        try {
          return PostCategoriesService.getAllItem(signal)
        } catch (err) {
          errorHandler(err)
          return []
        }
      }
    },
    {
      path: 'edit/:id',
      element: (
        <ProtectedRoute roles={[Role.ADMIN]}>
          <Edit />
        </ProtectedRoute>
      ),
      loader: ({ request: { signal }, params }) => {
        try {
          return PostCategoriesService.getById(
            (params as { id: string }).id,
            signal
          )
        } catch (err) {
          errorHandler(err)
          return null
        }
      }
    }
  ]
} as RouteObject
