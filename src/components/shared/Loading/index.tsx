import { Skeleton } from '@mui/material'

type Props = {
  boxHeight?: number | string
}

const Loading = ({ boxHeight = 400 }: Props) => {
  return (
    <>
      <Skeleton height={85} width={'100%'} sx={{ transform: 'none', mb: 3, rounded: 3 }} />

      <Skeleton height={boxHeight} width={'100%'} sx={{ transform: 'none' }} />
    </>
  )
}

export default Loading
