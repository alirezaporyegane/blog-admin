import { lazy } from 'react'

const CreateView = lazy(() => import('@/components/Users/CreateView'))

const Create = () => {
  return <CreateView />
}

export default Create
