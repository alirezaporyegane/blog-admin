import { HeaderNameContext } from '@/context/HeaderNameContext'
import { useContext, useEffect } from 'react'

const Blog = () => {
  const { setName } = useContext(HeaderNameContext)

  useEffect(() => setName('وبلاگ'), [setName])

  return <div></div>
}

export default Blog
