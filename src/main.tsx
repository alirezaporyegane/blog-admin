import { AccountProvider } from '@/context/AccountContext.tsx'
import { cacheRtl, theme } from '@/theme/MatrialConfig.ts'
import '@/services/i18n'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ErrorComponents } from './components/shared/Error/index.tsx'
import { ErrorBoundary } from './components/shared/ErrorBoundary/index.tsx'
import { HeaderNameProvider } from './context/HeaderNameContext.tsx'
import './css/index.scss'
import { router } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorComponents />}>
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
  </ErrorBoundary>
)
