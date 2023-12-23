import AccountLoading from '@/components/shared/AccountLoading'
import { Suspense, lazy } from 'react'

const LoginView = lazy(() => import('@/components/Account/Login/LoginView'))

export const Login = () => {
  return (
    <Suspense fallback={<AccountLoading width={420} height={418} />}>
      <LoginView />
    </Suspense>
  )
}
