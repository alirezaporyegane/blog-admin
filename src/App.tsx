import { Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import { AccountProvider } from './context/AccountContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <AccountProvider>
        <Layout>
          <Outlet />

          <Toaster />
        </Layout>
      </AccountProvider>
    </>
  )
}

export default App
