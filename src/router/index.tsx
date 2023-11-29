import Layout from '@/Layout'
import Login from '@/modules/Account/Pages/Login'
import Profile from '@/modules/Account/Pages/Profile'
import Register from '@/modules/Account/Pages/Register'
import Blog from '@/modules/Blog/Page'
import Dashboard from '@/modules/Dashboard'
import Settings from '@/modules/Settings'
import { createBrowserRouter } from 'react-router-dom'

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
        element: <Dashboard />
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
        element: <Profile />
      },
      {
        path: Router.BLOG,
        element: <Blog />
      },
      {
        path: Router.SETTINGS,
        element: <Settings />
      }
    ]
  }
])
