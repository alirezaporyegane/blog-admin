import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Sidebar } from './Components'

type TProps = {
  children: ReactNode
}

const Layout = ({ children }: TProps) => {
  const path = useLocation()
  const excludeLinks = ['/login']

  return (
    <div className="flex">
      {!excludeLinks.includes(path.pathname) && <Sidebar />}

      <section className="w-full">
        {!excludeLinks.includes(path.pathname) && <Header />}

        <main className={excludeLinks.includes(path.pathname) ? '' : 'px-10'}>
          {children}
        </main>
      </section>
    </div>
  )
}

export default Layout
