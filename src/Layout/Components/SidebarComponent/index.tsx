import { Role, useAuthStore } from '@/store/authStore'
import {
  Category,
  Group,
  Home,
  Settings,
  StickyNote2Outlined
} from '@mui/icons-material'
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material'
import { t } from 'i18next'
import { ReactNode, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Account from './Account'

type Props = {
  drawerWidth: number
}

export type TNavItem = {
  id: number
  name: string
  icon: ReactNode
  url: string
  roles: Role[]
}

type MobileProps = {
  navItems: TNavItem[]
  handleRedirect: (url: string) => void
}

const MobileBottomNavigation = ({ navItems, handleRedirect }: MobileProps) => {
  const [value, setValue] = useState(0)

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: { md: 'none' }
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.id}
            icon={item.icon}
            onClick={() => handleRedirect(item.url)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

const Sidebar = ({ drawerWidth }: Props) => {
  const path = useLocation()
  const navigate = useNavigate()
  const account = useAuthStore((store) => store.account)

  const handleRedirect = (url: string) => navigate(url)

  const navItems: TNavItem[] = [
    {
      id: 1,
      name: 'داشبورد',
      icon: <Home fontSize="medium" />,
      url: '/dashboard',
      roles: [Role.ADMIN, Role.WRITER]
    },
    {
      id: 2,
      name: t('posts'),
      icon: <StickyNote2Outlined fontSize="medium" />,
      url: '/posts',
      roles: [Role.ADMIN, Role.WRITER]
    },
    {
      id: 3,
      name: 'دسته بندی ها',
      icon: <Category fontSize="medium" />,
      url: '/post-categories',
      roles: [Role.ADMIN]
    },
    {
      id: 4,
      name: 'کاربران',
      icon: <Group fontSize="medium" />,
      url: '/users',
      roles: [Role.ADMIN]
    },
    {
      id: 5,
      name: 'تنظیمات',
      icon: <Settings fontSize="medium" />,
      url: '/settings',
      roles: [Role.ADMIN]
    }
  ]

  const isValidRole = (roles: Role[]) =>
    roles.find((role) => account?.role?.length && account.role.includes(role))

  return (
    <>
      <MobileBottomNavigation
        handleRedirect={handleRedirect}
        navItems={navItems}
      />

      <Drawer
        open
        variant="permanent"
        classes={{
          paper: '!border-gray-300 !border-dashed'
        }}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Account />

        <List>
          {navItems.map((navItem) =>
            isValidRole(navItem.roles) ? (
              <ListItem
                key={navItem.id}
                classes={{ selected: '!rounded-xl' }}
                onClick={() => handleRedirect(navItem.url)}
              >
                <ListItemButton
                  alignItems="flex-start"
                  className="border-gray-300 border-dashed"
                  classes={{ selected: '!rounded-md' }}
                  selected={navItem.url === path.pathname}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      marginTop: '4px'
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={navItem.name}
                    classes={{
                      primary: 'text-start'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ) : undefined
          )}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
