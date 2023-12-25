import { CalendarMonth, Schedule } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns-jalali'

type Props = {
  date: string
  showTime?: boolean
  timeFormat?: string
  dateFormat?: string
}

export default function DateDisplay({
  date,
  showTime,
  timeFormat = 'hh:mm',
  dateFormat = 'dd MMMM yyyy'
}: Props) {
  const formatDate = format(
    new Date(date),
    showTime ? `${dateFormat} ${timeFormat}` : dateFormat
  )
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box sx={{ color: '#ACEDFF', mb: '4px', fontSize: 10 }}>
        {showTime ? <Schedule /> : <CalendarMonth />}
      </Box>

      <Typography fontSize={14} fontWeight={400} sx={{ ml: 1 }}>
        {formatDate}
      </Typography>
    </Box>
  )
}
