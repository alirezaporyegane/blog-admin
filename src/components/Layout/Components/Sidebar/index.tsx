import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from '@material-tailwind/react'
import { ReactNode } from 'react'
import { MdHome, MdSettings } from 'react-icons/md'
import { useMatches, useNavigate } from 'react-router-dom'
import Account from './Account'

type TNavItem = {
  id: number
  name: string
  icon: ReactNode
  url: string
}

const Sidebar = () => {
  const [path] = useMatches()
  const navigate = useNavigate()

  const handlerSelected = (value: string): boolean | undefined =>
    path.pathname === value

  const handleRedirect = (url: string) => navigate(url)

  const navItems: TNavItem[] = [
    {
      id: 1,
      name: 'داشبورد',
      icon: <MdHome className="text-xl" />,
      url: '/dashboard'
    },
    {
      id: 2,
      name: 'تنظیمات',
      icon: <MdSettings className="text-xl" />,
      url: '/settings'
    }
  ]

  return (
    <Card className="h-[calc(100vh)] w-full md:max-w-[20rem] rounded-none bg-gray-100 px-6">
      <Account />

      <List className="p-0">
        {navItems.map((navItem) => {
          return (
            <ListItem
              key={navItem.id}
              className="px-0"
              selected={handlerSelected(navItem.url)}
              onClick={() => handleRedirect(navItem.url)}
            >
              <ListItemPrefix>{navItem.icon}</ListItemPrefix>

              <Typography
                color="blue-gray"
                className="ms-4 font-semibold hidden"
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
