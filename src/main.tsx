import { ThemeProvider } from '@material-tailwind/react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './css/index.css'
import { router } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
