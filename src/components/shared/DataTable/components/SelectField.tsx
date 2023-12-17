import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material'
import { forwardRef } from 'react'

type Options = {
  id: number
  text: string
  value: any
  disabled: boolean
}

export type Props = SelectProps & {
  options?: Options[]
}

const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ options, ...props }, ref) => {
    return (
      <FormControl fullWidth>
        <InputLabel id={props.labelId}>{props.label}</InputLabel>

        <Select ref={ref} defaultValue={props.defaultValue || ''} {...props}>
          {options?.map((option) => {
            return (
              <MenuItem
                key={option.id}
                value={option.value}
                disabled={option.disabled}
              >
                {option.text}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  }
)

export default SelectField
