import { AccountContext, Role } from '@/context/AccountContext'
import { Router } from '@/router'
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
  roles: Role[]
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { getAccount } = useContext(AccountContext)
  const account = getAccount()
  const isLogin = account && Object.keys(account).length
  const isAdmittedRole =
    isLogin && roles.find((role) => account.role.includes(role))

  if (!isLogin) return <Navigate to={Router.LOGIN} />

  if (!isAdmittedRole) return <Navigate to={Router.DASHBOARD} />

  return <>{children}</>
}

export default ProtectedRoute
