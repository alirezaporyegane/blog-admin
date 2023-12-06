import { AccountContext, Role } from '@/context/AccountContext'
import { Category, Home, PostAdd, Settings, Group } from '@mui/icons-material'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { ReactNode, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Account from './Account'

type Props = {
  drawerWidth: number
  mobileDrawerWidth: number
}

export type TNavItem = {
  id: number
  name: string
  icon: ReactNode
  url: string
  roles: Role[]
}

type MobileProps = Pick<Props, 'mobileDrawerWidth'> & {
  navItems: TNavItem[]
  pathname: string
  handleRedirect: (url: string) => void
}

const MobileSlider = ({
  mobileDrawerWidth,
  handleRedirect,
  navItems,
  pathname
}: MobileProps) => {
  return (
    <Drawer
      open
      variant="permanent"
      classes={{
        paper: '!border-gray-300 !border-dashed'
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: mobileDrawerWidth
        }
      }}
    >
      <Account />

      <List>
        {navItems.map((navItem) => {
          return (
            <ListItem
              key={navItem.id}
              classes={{ selected: '!rounded-xl' }}
              onClick={() => handleRedirect(navItem.url)}
            >
              <ListItemButton
                alignItems="flex-start"
                className="border-gray-300 border-dashed"
                classes={{ root: '!rounded-md' }}
                selected={navItem.url === pathname}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    marginTop: '4px'
                  }}
                >
                  {navItem.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

const Sidebar = ({ drawerWidth, mobileDrawerWidth }: Props) => {
  const path = useLocation()
  const navigate = useNavigate()
  const { getAccount } = useContext(AccountContext)
  const account = getAccount()

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
      name: 'وبلاگ',
      icon: <PostAdd fontSize="medium" />,
      url: '/blog',
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
      <MobileSlider
        handleRedirect={handleRedirect}
        mobileDrawerWidth={mobileDrawerWidth}
        navItems={navItems}
        pathname={path.pathname}
      />

      <Drawer
        open
        variant="permanent"
        classes={{
          paper: '!border-gray-300 !border-dashed !bg-transparent'
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
