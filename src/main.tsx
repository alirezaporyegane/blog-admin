import { AccountProvider } from '@/context/AccountContext.tsx'
import '@/plugins/i18n'
import { cacheRtl, theme } from '@/theme/MatrialConfig.ts'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './css/index.scss'
import { router } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <HelmetProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  </AccountProvider>
)
