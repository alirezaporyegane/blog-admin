import { AccountProvider } from '@/context/AccountContext.tsx'
import { cacheRtl, theme } from '@/theme/MatrialConfig.ts'
import '@/utils/i18n.ts'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { HeaderNameProvider } from './context/HeaderNameContext.tsx'
import './css/index.scss'
import { router } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <HelmetProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <HeaderNameProvider>
            <RouterProvider router={router} />
          </HeaderNameProvider>
        </ThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  </AccountProvider>
)
