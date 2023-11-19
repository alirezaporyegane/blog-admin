import { ReactNode } from 'react'
import { Header, Sidebar } from './Components'

type TProps = {
  children: ReactNode
}

const Layout = ({ children }: TProps) => {
  return (
    <div className="flex">
      <Sidebar />

      <section className="w-full">
        <Header />

        <main className='px-10'>{children}</main>
      </section>
    </div>
  )
}

export default Layout
