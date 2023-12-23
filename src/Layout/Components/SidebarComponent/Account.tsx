import { Router } from '@/router'
import { Account as AccountService } from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import { success } from '@/utils/Notify'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdExpandMore, MdLogout, MdPerson } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Account = () => {
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const account = useAuthStore((store) => store.account)
  const clearAccount = useAuthStore((store) => store.clearAccount)
  const navigate = useNavigate()

  async function logout() {
    try {
      setLoading(true)
      clearAccount()
      await AccountService.logoutHandler()
      navigate(Router.LOGIN)
      success(t('loginSuccess'))
    } catch (err: any) {
      if (err[0].code === 401) navigate(Router.LOGIN)
    } finally {
      setLoading(false)
    }
  }

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <img
        className="object-cover object-center me-0 md:!me-3"
        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
        alt={account?.userName}
        width={40}
        height={40}
      />

      <Box
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        <h6 className="text-gray-900 font-semibold mb-2">
          {account?.userName}
        </h6>

        <h6>{account?.email}</h6>
      </Box>

      <IconButton
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        classes={{ root: '!ms-auto' }}
        onClick={handleMenu}
      >
        <MdExpandMore className="text-lg" />
      </IconButton>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>
          <Link
            className="flex items-center"
            to={Router.PROFILE}
            onClick={handleClose}
          >
            <MdPerson className="me-4" />

            {t('profile')}
          </Link>
        </MenuItem>

        <MenuItem
          disabled={loading}
          className="flex items-center"
          onClick={() => {
            logout()
            handleClose()
          }}
        >
          <MdLogout className="me-4 text-red-700" />

          {t('logout')}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Account
