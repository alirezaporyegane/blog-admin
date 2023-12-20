import { TextFieldProps } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import DatePicker from '../../DataPicker'

export type Props = Omit<TextFieldProps, 'onChange' | 'value'> & {
  fullWidth?: boolean
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

const dateFieldTable = (props: Props) => {
  return <DatePicker {...props} />
}

export default dateFieldTable
