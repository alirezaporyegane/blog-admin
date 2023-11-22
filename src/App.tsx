import { Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import { AccountProvider } from './context/AccountContext'

const App = () => {
  return (
    <>
      <AccountProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AccountProvider>
    </>
  )
}

export default App
