import Layout from '@/Layout'
import Login from '@/views/Login'
import Profile from '@/views/Profile'
import Register from '@/views/Register'
import Blog from '@/views/Blog'
import Dashboard from '@/views/Dashboard'
import Settings from '@/views/Settings'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

export enum Router {
  BASE = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  REGISTER = '/register',
  BLOG = '/blog',
  PROFILE = '/profile',
  SETTINGS = '/settings'
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        path: Router.DASHBOARD,
        element: (
          <ProtectedRoute>
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
      {
        path: Router.PROFILE,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: Router.BLOG,
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        )
      },
      {
        path: Router.SETTINGS,
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        )
      }
    ]
  }
])
