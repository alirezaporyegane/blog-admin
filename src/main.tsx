import '@/services/i18n'
import { cacheRtl, theme } from '@/theme/MatrialConfig.ts'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ErrorComponents } from './components/shared/Error/index.tsx'
import { ErrorBoundary } from './components/shared/ErrorBoundary/index.tsx'
import './css/index.scss'
import { router } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorComponents />}>
    <HelmetProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <RouterProvider router={router} />
          </ConfirmProvider>
        </ThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  </ErrorBoundary>
)
