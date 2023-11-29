import { HeaderNameProvider } from '@/context/HeaderNameContext'
import { Box } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Sidebar } from './Components'

const Layout = () => {
  const path = useLocation()
  const excludeLinks = ['/login', '/register']
  const drawerWidth = excludeLinks.includes(path.pathname) ? 0 : 300
  const mobileDrawerWidth = excludeLinks.includes(path.pathname) ? 0 : 90

  return (
    <HeaderNameProvider>
      <Box sx={{ height: '100vh' }} className="bg-blue-50 bg-opacity-20">
        {!excludeLinks.includes(path.pathname) && (
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
            p: excludeLinks.includes(path.pathname) ? 0 : 3,
            width: {
              xs: `calc(100% - ${mobileDrawerWidth}px)`,
              md: `calc(100% - ${drawerWidth}px)`
            }
          }}
        >
          {!excludeLinks.includes(path.pathname) && <Header />}

          <Outlet />

          <Toaster />
        </Box>
      </Box>
    </HeaderNameProvider>
  )
}

export default Layout
