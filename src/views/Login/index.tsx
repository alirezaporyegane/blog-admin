import { lazy } from 'react'

const LoginView = lazy(() => import('./components/LoginView'))

const Login = () => {
  return <LoginView />
}

export default Login
