import {
  Box,
  Chip,
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

        <Select
          ref={ref}
          defaultValue={
            props.multiple ? props.defaultValue || [] : props.defaultValue || ''
          }
          renderValue={(selected: any) => (
            <>
              {props.multiple ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.length &&
                    selected.map((value: any) => {
                      const option = options?.find(
                        (item) => item.value === value
                      )

                      return <Chip key={value} label={option?.text} />
                    })}
                </Box>
              ) : (
                <>{options?.find((item) => item.value === selected)?.text}</>
              )}
            </>
          )}
          {...props}
        >
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
