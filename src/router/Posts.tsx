import { Posts as PostsServices } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { Role } from '@/store/authStore'
import {
  createQueryParams,
  createQueryParamsForGetCount
} from '@/utils/helpers'
import { Posts } from '@/views/Posts'
import { Create } from '@/views/Posts/Create'
import { Edit } from '@/views/Posts/Edit'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

enum Router {
  INDEX = '/posts',
  CREATE = 'create',
  EDIT = 'edit/:id'
}

export default {
  path: Router.INDEX,
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
          <Posts />
        </ProtectedRoute>
      ),
      loader: async ({ request: { signal, url } }) => {
        try {
          const params = createQueryParams(url)
          const countParams = createQueryParamsForGetCount(url)
          return {
            items: await PostsServices.getAll(params, signal),
            count: await PostsServices.getCount(countParams, signal)
          }
        } catch (err: any) {
          errorHandler(err)
          return null
        }
      }
    },
    {
      path: Router.CREATE,
      element: (
        <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
          <Create />
        </ProtectedRoute>
      )
    },
    {
      path: Router.EDIT,
      element: (
        <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
          <Edit />
        </ProtectedRoute>
      ),
      loader: async ({ request: { signal }, params }) => {
        try {
          return PostsServices.getById((params as { id: string }).id, signal)
        } catch (err: any) {
          errorHandler(err)
          return null
        }
      }
    }
  ]
} as RouteObject
