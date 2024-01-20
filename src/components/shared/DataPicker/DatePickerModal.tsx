import { ChevronLeft, ChevronRight, Remove } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import {
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
  isToday,
  startOfMonth,
  startOfWeek
} from 'date-fns-jalali'
import { faIR } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions'
import { useState, type Dispatch, type SetStateAction } from 'react'

type Props = {
  value: string
  closeDatePicker: () => void
  onChange: Dispatch<SetStateAction<string>>
}

const DatePickerModal = ({ value, onChange, closeDatePicker }: Props) => {
  setDefaultOptions({ locale: faIR, firstWeekContainsDate: 2 })
  const [isShowingMonth, setIsShowingMonth] = useState(false)
  const [isShowingYear, setIsShowingYear] = useState(false)
  const [isNotShowingDay, setIsNotShowingDay] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(
    value ? new Date(value) : new Date()
  )

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth))
  })

  const visibleWorld = eachYearOfInterval({
    start: new Date(`${visibleMonth.getFullYear() - 100}-01-01`),
    end: new Date(`${visibleMonth.getFullYear() + 100}-01-01`)
  })

  const visibleIntervalMonth = eachMonthOfInterval({
    start: new Date(`${visibleMonth.getFullYear()}-03-21`),
    end: new Date(`${visibleMonth.getFullYear() + 1}-03-19`)
  })

  const showPreviousMonth = () =>
    setVisibleMonth((currentMonth) => addMonths(currentMonth, -1))

  const showNextMonth = () =>
    setVisibleMonth((currentMonth) => addMonths(currentMonth, 1))

  const showYear = () => {
    setIsNotShowingDay(true)
    setIsShowingYear(true)
  }

  const selectedYear = (year: Date) => {
    setVisibleMonth(year)
    setIsShowingYear(false)
    setIsShowingMonth(true)
    setIsNotShowingDay(true)
  }

  const selectedMonth = (month: Date) => {
    setVisibleMonth(month)
    setIsShowingMonth(false)
    setIsNotShowingDay(false)
  }

  const handelSelect = (date: Date) => {
    onChange(date.toLocaleString())
    closeDatePicker()
  }

  let visibleDate
  if (isShowingYear)
    visibleDate = (
      <Box
        display={'grid'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ xs: '0.25rem', md: '1rem' }}
        maxHeight={'250px'}
        overflow={'auto'}
        gridTemplateColumns={{
          xs: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))'
        }}
        gridAutoRows={'2rem'}
      >
        {visibleWorld.map((year) => (
          <Button
            key={year.toDateString()}
            sx={{
              color: isSameYear(year, visibleMonth) ? 'white' : '#050404',
              backgroundColor: isSameYear(year, visibleMonth) ? '#009EB9' : '',
              border: isThisYear(year) ? '1px dashed #009EB9' : '',
              '&:hover': {
                backgroundColor: isSameYear(year, visibleMonth)
                  ? '#008399'
                  : '#D8F6FF'
              }
            }}
            onClick={() => selectedYear(year)}
          >
            {format(year, 'yyyy')}
          </Button>
        ))}
      </Box>
    )
  else if (isShowingMonth)
    visibleDate = (
      <Box
        display={'grid'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ xs: '0.25rem', md: '1rem' }}
        gridTemplateColumns={{
          xs: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))'
        }}
        gridAutoRows={'2rem'}
      >
        {visibleIntervalMonth.map((month) => {
          return (
            <Button
              key={month.toDateString()}
              sx={{
                color: isSameMonth(month, visibleMonth) ? 'white' : '#050404',
                backgroundColor: isSameMonth(month, visibleMonth)
                  ? '#009EB9'
                  : '',
                border: isThisMonth(month) ? '1px dashed #009EB9' : '',
                '&:hover': {
                  backgroundColor: isSameMonth(month, visibleMonth)
                    ? '#008399'
                    : '#D8F6FF'
                }
              }}
              onClick={() => selectedMonth(month)}
            >
              {format(month, 'MMMM')}
            </Button>
          )
        })}
      </Box>
    )
  else
    visibleDate = (
      <Box
        display={'grid'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ xs: '0.25rem', md: '1rem' }}
        gridTemplateColumns={'repeat(7, minmax(0, 1fr))'}
        gridAutoRows={'2rem'}
      >
        {visibleDates.map((date) => (
          <IconButton
            size="small"
            key={date.toDateString()}
            sx={{
              width: '2rem',
              height: '2rem',
              color: isSameDay(date, new Date(value || ''))
                ? 'white'
                : !isSameMonth(date, visibleMonth)
                ? '#BEB7A4'
                : '#050404',
              border: isToday(date) ? '1px dashed #009EB9' : '',
              backgroundColor: isSameDay(date, new Date(value || ''))
                ? '#009EB9'
                : '',
              '&:hover': {
                backgroundColor: isSameDay(date, new Date(value || ''))
                  ? '#008399'
                  : '#D8F6FF'
              }
            }}
            onClick={() => handelSelect(date)}
          >
            {format(date, 'dd')}
          </IconButton>
        ))}
      </Box>
    )

  let dateHeader
  if (!isNotShowingDay) {
    dateHeader = (
      <>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          fontWeight={700}
          marginBottom={'0.5rem'}
          fontSize={'0.875rem'}
          lineHeight={'1.25rem'}
        >
          <IconButton size="small" onClick={showPreviousMonth}>
            <ChevronRight color="action" />
          </IconButton>

          <Box display={'flex'} alignItems={'center'}>
            <Button
              variant="text"
              size="small"
              sx={{ color: '#1A1C19', fontWeight: 800 }}
              onClick={() => {
                setIsNotShowingDay(true)
                setIsShowingMonth(true)
              }}
            >
              {format(visibleMonth, 'MMMM')}
            </Button>

            <Stack component={'span'} mx={'0.25rem'}>
              -
            </Stack>

            <Button
              variant="text"
              size="small"
              sx={{ color: '#1A1C19', fontWeight: 800 }}
              onClick={showYear}
            >
              {format(visibleMonth, 'yyyy')}
            </Button>
          </Box>

          <IconButton size="small" onClick={showNextMonth}>
            <ChevronLeft color="action" />
          </IconButton>
        </Box>
      </>
    )
  }

  let dateDays
  if (!isNotShowingDay) {
    const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
    dateDays = (
      <>
        <Box
          fontWeight={700}
          fontSize={'0.75rem'}
          lineHeight={'1rem'}
          color={'#5A6057'}
          display={'grid'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ xs: '0.25rem', md: '1rem' }}
          gridTemplateColumns={'repeat(7, minmax(0, 1fr))'}
          gridAutoRows={'2rem'}
        >
          {days.map((day) => (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              width={'100%'}
              height={'100%'}
              key={day}
            >
              {day}
            </Box>
          ))}
        </Box>
      </>
    )
  }

  return (
    <Box bgcolor={'white'} overflow={'hidden'} minWidth={350}>
      <Box padding={'1rem'} bgcolor={'#D8F6FF'} textAlign={'start'}>
        <Typography marginBottom={'0.25rem'}>روز انتخابی</Typography>

        <Typography fontWeight={600}>
          {value ? (
            format(new Date(value), 'dd MMMM yyyy')
          ) : (
            <Remove fontSize="small" />
          )}
        </Typography>
      </Box>

      <Box padding={'1.5rem'}>
        {dateHeader}

        {dateDays}

        {visibleDate}
      </Box>
    </Box>
  )
}

export default DatePickerModal
