import { ThemeProvider } from '@material-tailwind/react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './css/index.scss'
import { router } from './router/index.tsx'
import '@/plugins/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
