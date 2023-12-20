import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormGroup
} from '@mui/material'
import { forwardRef } from 'react'

type Options = {
  value: any
  label: string
  checked: boolean
}

export type Props = FormControlProps & {
  label: string
  options: Options[]
}

const SwitchFieldTable = forwardRef<HTMLButtonElement, Props>(
  ({ options }, ref) => {
    return (
      <FormControl ref={ref} component="fieldset" variant="standard">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              label={option.label}
              control={
                <Checkbox checked={option.checked} value={option.value} />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    )
  }
)

export default SwitchFieldTable
