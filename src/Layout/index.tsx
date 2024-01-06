import { Status } from '@/services/api'
import { palette } from '@/theme/MatrialConfig'
import { getDescriptionFromRoute, getTitleFromRoute } from '@/utils/docTitle'
import { Box } from '@mui/material'
import { lazy, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'
const LoadingComponent = lazy(() => import('./Components/LoadingComponent'))
const ErrorComponent = lazy(() => import('./Components/ErrorComponent'))
const Sidebar = lazy(() => import('./Components/SidebarComponent'))

type Status = 'loading' | 'success' | 'error'

const Layout = () => {
  console.log(process.env.NODE_ENV);
  const location = useLocation()
  const [status, setStatus] = useState<Status>('loading')
  const excludeLinks = ['/login', '/register']
  const drawerWidth = excludeLinks.includes(location.pathname) ? 0 : 300
  const mobileDrawerWidth = excludeLinks.includes(location.pathname) ? 0 : 90

  useLayoutEffect(() => {
    const checkServerStatus = async () => {
      try {
        await Status.checkStatusHandler(true)
      } catch (err) {
        setStatus('error')
      } finally {
        setStatus('success')
      }
    }

    checkServerStatus()
  }, [])

  if (status === 'loading') return <LoadingComponent />

  if (status == 'error') return <ErrorComponent />

  return (
    <>
      <Helmet>
        <title>{getTitleFromRoute(location.pathname)}</title>

        <meta
          name="description"
          content={getDescriptionFromRoute(location.pathname)}
        />

        <base target="_blank" href="/localhost:8080" />
      </Helmet>

      <Box
        sx={{ height: '100vh', backgroundColor: palette.background?.default }}
      >
        {!excludeLinks.includes(location.pathname) && (
          <Sidebar
            drawerWidth={drawerWidth}
            mobileDrawerWidth={mobileDrawerWidth}
          />
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: 'auto',
            p: excludeLinks.includes(location.pathname) ? 0 : 3,
            width: {
              xs: `calc(100% - ${mobileDrawerWidth}px)`,
              md: `calc(100% - ${drawerWidth}px)`
            }
          }}
        >
          <Outlet />

          <Toaster />
        </Box>
      </Box>
    </>
  )
}

export default Layout
