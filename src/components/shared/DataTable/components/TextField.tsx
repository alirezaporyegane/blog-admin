import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

export type Props = TextFieldProps

const TextFieldTable = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ ...props }, ref) => {
    return <TextField ref={ref} {...props} />
  }
)

export default TextFieldTable
