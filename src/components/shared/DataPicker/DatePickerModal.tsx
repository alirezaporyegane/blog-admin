import { ChevronLeft, ChevronRight, Remove } from '@mui/icons-material'
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
      <div className="year-picker-grid date-picker-grid-dates max-h-[250px] overflow-auto px-2">
        {visibleWorld.map((year) => {
          return (
            <button
              className={`date${
                isSameYear(year, visibleMonth) ? ' selected' : ''
              }${isThisYear(year) ? ' today' : ''}`}
              key={year.toDateString()}
              onClick={() => selectedYear(year)}
            >
              {format(year, 'yyyy')}
            </button>
          )
        })}
      </div>
    )
  else if (isShowingMonth)
    visibleDate = (
      <div className="month-picker-grid date-picker-grid-dates">
        {visibleIntervalMonth.map((month) => {
          return (
            <button
              className={`date${
                isSameMonth(month, visibleMonth) ? ' selected' : ''
              } ${isThisMonth(month) ? ' today' : ''}`}
              key={month.toDateString()}
              onClick={() => selectedMonth(month)}
            >
              {format(month, 'MMMM')}
            </button>
          )
        })}
      </div>
    )
  else
    visibleDate = (
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map((date) => {
          return (
            <button
              key={date.toDateString()}
              className={`date !w-8 !h-8${
                !isSameMonth(date, visibleMonth)
                  ? ' date-picker-other-month-date'
                  : ''
              } ${isSameDay(date, new Date(value || '')) ? ' selected' : ''} ${
                isToday(date) ? ' today' : ''
              }`}
              onClick={() => handelSelect(date)}
            >
              {format(date, 'dd')}
            </button>
          )
        })}
      </div>
    )

  let dateHeader
  if (!isNotShowingDay) {
    dateHeader = (
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={showPreviousMonth}
        >
          <ChevronRight />
        </button>

        <div className="current-month">
          <button
            className="hover:bg-blue-50 px-2 py-1 rounded-md"
            onClick={() => {
              setIsNotShowingDay(true)
              setIsShowingMonth(true)
            }}
          >
            {format(visibleMonth, 'MMMM')}
          </button>

          <span className="mx-1">-</span>

          <button
            className="hover:bg-blue-50 px-2 py-1 rounded-md"
            onClick={showYear}
          >
            {format(visibleMonth, 'yyyy')}
          </button>
        </div>

        <button
          className="next-month-button month-button"
          onClick={showNextMonth}
        >
          <ChevronLeft />
        </button>
      </div>
    )
  }

  let dateDays
  if (!isNotShowingDay) {
    dateDays = (
      <div className="date-picker-grid-header date-picker-grid mb-5">
        <div>ش</div>
        <div>ی</div>
        <div>د</div>
        <div>س</div>
        <div>چ</div>
        <div>پ</div>
        <div>ج</div>
      </div>
    )
  }

  return (
    <div className="date-picker min-w-[350px]">
      <div className="date-picker-selected-date">
        <p className="mb-1">روز انتخابی</p>

        <p className="font-semibold">
          {value ? (
            format(new Date(value), 'dd MMMM yyyy')
          ) : (
            <Remove fontSize="small" />
          )}
        </p>
      </div>

      <div className="date-picker-body">
        {dateHeader}

        {dateDays}

        {visibleDate}
      </div>
    </div>
  )
}

export default DatePickerModal
