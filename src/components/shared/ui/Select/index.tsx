import classNames from 'classnames'
import { ChangeEvent } from 'react'

type TOptions = {
  value: string
  text: string
}

type TProps = {
  id?: string
  label?: string
  classes?: string
  value: any
  options: TOptions[] | string[]
  changed: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  id = 'select',
  label,
  classes,
  value,
  options,
  changed
}: TProps) => {
  const selectClass = classNames(classes)

  return (
    <>
      <label htmlFor={id}>{label}</label>

      <select id={id} value={value} className={selectClass} onChange={changed}>
        {options.map((item) => (
          <option value={typeof item === 'string' ? item : item.value}>
            {typeof item === 'string' ? item : item.text}
          </option>
        ))}
      </select>
    </>
  )
}

export default Select
