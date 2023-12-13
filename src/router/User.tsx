import { Role } from '@/context/AccountContext'
import { Users as UserService } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import {
  createQueryParams,
  createQueryParamsForGetCount
} from '@/utils/helpers'
import CreateView from '@/views/Users/Create'
import UsersView from '@/views/Users/index'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export default {
  path: 'users',
  children: [
    {
      index: true,
      loader: async ({ request: { signal, url } }) => {
        try {
          const params = createQueryParams(url)
          const countParams = createQueryParamsForGetCount(url)
          return {
            items: await UserService.getAll(params, signal),
            count: await UserService.getCount(countParams, signal)
          }
        } catch (err) {
          errorHandler(err)
        }
      },
      element: (
        <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
          <UsersView />
        </ProtectedRoute>
      )
    },
    {
      path: 'create',
      element: (
        <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
          <CreateView />
        </ProtectedRoute>
      )
    }
  ]
} as RouteObject
