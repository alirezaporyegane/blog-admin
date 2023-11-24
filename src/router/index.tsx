import App from '@/App'
import Blog from '@/modules/Blog/Page'
import Dashboard from '@/modules/Dashboard'
import Login from '@/modules/Login/Page'
import Settings from '@/modules/Settings'
import { createBrowserRouter } from 'react-router-dom'

export enum Router {
  BASE = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  BLOG = '/blog',
  SETTINGS = '/settings'
}

export const router = createBrowserRouter([
  {
    path: Router.BASE,
    element: <App />,
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
