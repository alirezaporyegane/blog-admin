import { Box, Skeleton, Stack } from '@mui/material'

type Props = {
  width?: number | string
  height?: number
}

const AccountLoading = ({ height = 576, width = '33%' }: Props) => {
  return (
    <Box
      sx={{
        height: '100vh'
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Skeleton width={width} height={height} sx={{ transform: 'none' }} />
      </Stack>
    </Box>
  )
}

export default AccountLoading
