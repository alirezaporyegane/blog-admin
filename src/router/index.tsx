import Layout from '@/Layout'
import { Role } from '@/store/authStore'
import { Dashboard } from '@/views/Dashboard'
import { Login } from '@/views/Login'
import { Register } from '@/views/Register'
import { Settings } from '@/views/Settings'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import PostCategoriesRoutes from './PostCategories'
import PostsRoutes from './Posts'
import ProfileRoutes from './Profile'
import ProtectedRoute from './ProtectedRoute'
import UserRoutes from './User'

export enum Router {
  BASE = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  REGISTER = '/register',
  BLOG = '/blog',
  USERS = '/users',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  POST_CATEGORIES = '/post-categories'
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={Router.DASHBOARD} /> },
      {
        path: Router.DASHBOARD,
        element: (
          <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: Router.LOGIN,
        element: <Login />
      },
      {
        path: Router.REGISTER,
        element: <Register />
      },
      ProfileRoutes,
      PostsRoutes,
      PostCategoriesRoutes,
      UserRoutes,
      {
        path: Router.SETTINGS,
        element: (
          <ProtectedRoute roles={[Role.ADMIN]}>
            <Settings />
          </ProtectedRoute>
        )
      }
    ]
  }
])
