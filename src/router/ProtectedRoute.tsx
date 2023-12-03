import { AccountContext } from '@/context/AccountContext'
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { getAccount } = useContext(AccountContext)
  const isLogin = getAccount() && Object.keys(getAccount()).length

  return <>{isLogin ? children : <Navigate to={'/login'} />}</>
}

export default ProtectedRoute
