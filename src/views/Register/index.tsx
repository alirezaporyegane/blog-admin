import AccountLoading from '@/components/shared/AccountLoading'
import { Suspense, lazy } from 'react'
const RegisterView = lazy(
  () => import('@/components/Account/Register/RegisterView')
)

export const Register = () => {
  return (
    <Suspense fallback={<AccountLoading />}>
      <RegisterView />
    </Suspense>
  )
}
