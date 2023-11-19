import App from '@/App'
import Dashboard from '@/view/Dashboard'
import Settings from '@/view/Settings'
import { createBrowserRouter } from 'react-router-dom'

enum Router {
  BASE = '/',
  DASHBOARD = '/dashboard',
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
        path: Router.SETTINGS,
        element: <Settings />
      }
    ]
  }
])
