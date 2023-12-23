import { Router } from '@/router'
import { Role, useAuthStore } from '@/store/authStore'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
  roles: Role[]
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const account = useAuthStore((store) => store.account)
  const isLogin = account && Object.keys(account).length
  const isAdmittedRole =
    isLogin && roles.find((role) => account.role.includes(role))

  if (!isLogin) return <Navigate to={Router.LOGIN} />

  if (!isAdmittedRole) return <Navigate to={Router.DASHBOARD} />

  return <>{children}</>
}

export default ProtectedRoute
