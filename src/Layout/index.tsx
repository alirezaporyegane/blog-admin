import { HeaderNameProvider } from '@/context/HeaderNameContext'
import { checkStatusHandler } from '@/services/Status'
import { getDescriptionFromRoute, getTitleFromRoute } from '@/utils/docTitle'
import { Box } from '@mui/material'
import { lazy, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'
const LoadingComponent = lazy(() => import('./Components/LoadingComponent'))
const ErrorComponent = lazy(() => import('./Components/ErrorComponent'))
const Header = lazy(() => import('./Components/HeaderComponent'))
const Sidebar = lazy(() => import('./Components/SidebarComponent'))

const Layout = () => {
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const excludeLinks = ['/login', '/register']
  const drawerWidth = excludeLinks.includes(location.pathname) ? 0 : 300
  const mobileDrawerWidth = excludeLinks.includes(location.pathname) ? 0 : 90

  useLayoutEffect(() => {
    const checkServerStatus = async () => {
      try {
        await checkStatusHandler(true)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    checkServerStatus()
  }, [])

  if (loading) return <LoadingComponent />

  if (error) return <ErrorComponent />

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

      <HeaderNameProvider>
        <Box sx={{ height: '100vh' }} className="bg-blue-50 bg-opacity-20">
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
            {!excludeLinks.includes(location.pathname) && <Header />}

            <Outlet />

            <Toaster />
          </Box>
        </Box>
      </HeaderNameProvider>
    </>
  )
}

export default Layout
