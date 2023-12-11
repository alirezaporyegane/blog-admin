import { HeaderNameContext } from '@/context/HeaderNameContext'
import { useContext } from 'react'

const Header = () => {
  const { name } = useContext(HeaderNameContext)

  return (
    <>
      <div className="max-w-none rounded-none shadow-none !relative px-2 md:px-8 pt-4 pb-9 text-2xl font-semibold">
        <h1>{name}</h1>
      </div>
    </>
  )
}

export default Header
