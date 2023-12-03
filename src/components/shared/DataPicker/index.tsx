import { CalendarMonth } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Menu,
  TextField,
  TextFieldProps
} from '@mui/material'
import { format } from 'date-fns-jalali'
import { Dispatch, SetStateAction, useState } from 'react'
import DatePickerModal from './DatePickerModal'
import './index.scss'

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & {
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

const DatePicker = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const endAdornmentDate = (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={handleClick}>
        <CalendarMonth />
      </IconButton>
    </InputAdornment>
  )

  return (
    <>
      <TextField
        {...props}
        value={props.value ? format(new Date(props.value), 'yyyy-MM-dd') : ''}
        InputProps={{
          endAdornment: endAdornmentDate
        }}
      />

      <Dialog
        open={open}
        classes={{
          paper: '!rounded-xl'
        }}
        sx={{
          display: { md: 'none' }
        }}
        onClose={handleClose}
      >
        <DialogContent
          classes={{
            root: '!p-0'
          }}
        >
          <DatePickerModal
            value={props.value}
            onChange={props.onChange}
            closeDatePicker={handleClose}
          />
        </DialogContent>
      </Dialog>

      <Menu
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
        classes={{
          paper: '!min-w-[350px] !rounded-xl',
          list: '!p-0'
        }}
      >
        <DatePickerModal
          value={props.value}
          onChange={props.onChange}
          closeDatePicker={handleClose}
        />
      </Menu>
    </>
  )
}

export default DatePicker
