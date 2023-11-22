import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from '@material-tailwind/react'
import { ReactNode } from 'react'
import { MdHome, MdPostAdd, MdSettings } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import Account from './Account'

type TNavItem = {
  id: number
  name: string
  icon: ReactNode
  url: string
}

const Sidebar = () => {
  const path = useLocation()
  const navigate = useNavigate()

  const handlerSelected = (value: string): boolean | undefined =>
    path.pathname === value

  const handleRedirect = (url: string) => navigate(url)

  const navItems: TNavItem[] = [
    {
      id: 1,
      name: 'داشبورد',
      icon: <MdHome className="text-2xl md:!text-xl" />,
      url: '/dashboard'
    },
    {
      id: 2,
      name: 'وبلاگ',
      icon: <MdPostAdd className="text-2xl md:!text-xl" />,
      url: '/blog'
    },
    {
      id: 3,
      name: 'تنظیمات',
      icon: <MdSettings className="text-2xl md:!text-xl" />,
      url: '/settings'
    }
  ]

  return (
    <Card className="h-[calc(100vh)] mx-w-[2rem] lg:max-w-[20rem] rounded-none bg-gray-100 px-1 lg:!px-4">
      <Account />

      <List className="p-0 min-w-[55px] lg:!min-w-[260px]">
        {navItems.map((navItem) => {
          return (
            <ListItem
              key={navItem.id}
              className="px-0 w-[55px] lg:!w-[100%]"
              selected={handlerSelected(navItem.url)}
              onClick={() => handleRedirect(navItem.url)}
            >
              <ListItemPrefix>{navItem.icon}</ListItemPrefix>

              <Typography
                color="blue-gray"
                className="ms-4 font-semibold hidden lg:!block lg:ms-0"
              >
                {navItem.name}
              </Typography>
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}

export default Sidebar
