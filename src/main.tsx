import { AccountProvider } from '@/context/AccountContext.tsx'
import '@/plugins/i18n'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './css/index.scss'
import { router } from './router/index.tsx'
import { cacheRtl, theme } from './utils/MatrialConfig.ts'
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <HelmetProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  </AccountProvider>
)
