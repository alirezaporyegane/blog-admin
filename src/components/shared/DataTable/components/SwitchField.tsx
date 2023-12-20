import { FormControlLabel, Switch } from '@mui/material'
import { ReactNode } from 'react'

export type Props = {
  checked: boolean
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  label: ReactNode
}

const SwitchFieldTable = ({ label, checked, onChange }: Props) => {
  const checkedItem = Boolean(checked)

  return (
    <FormControlLabel
      label={label}
      control={
        <Switch value={checked} checked={checkedItem} onChange={onChange} />
      }
    />
  )
}

export default SwitchFieldTable
