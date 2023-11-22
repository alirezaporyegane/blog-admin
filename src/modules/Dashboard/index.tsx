import { AccountContext } from '@/context/AccountContext'
import { useContext } from 'react'

const Dashboard = () => {
  const { getAccount } = useContext(AccountContext)

  const account = getAccount()
  console.log(account)
  return 'hi'
}

export default Dashboard
