import { HeaderNameContext } from '@/context/HeaderNameContext'
import { useContext, useEffect } from 'react'

const Dashboard = () => {
  const { setName } = useContext(HeaderNameContext)

  useEffect(() => setName('داشبورد'))

  return <div className="text-center"></div>
}

export default Dashboard
