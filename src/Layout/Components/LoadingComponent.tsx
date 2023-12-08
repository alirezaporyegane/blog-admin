import { CircularProgress } from '@mui/material'

const LoadingComponent = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-center h-full">
        <CircularProgress
          classes={{ root: '!w-20 !h-20', svg: 'text-blue-900' }}
        />
      </div>
    </div>
  )
}

export default LoadingComponent
