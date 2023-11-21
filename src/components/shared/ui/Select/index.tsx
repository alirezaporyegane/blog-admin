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
  labelClass?: string
  value: any
  size?: 'sm' | 'md' | 'lg'
  options: TOptions[] | string[]
  changed: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  id = 'select',
  label,
  classes,
  labelClass,
  value,
  options,
  size = 'md',
  changed
}: TProps) => {
  const selectClass = classNames(
    classes,
    'block',
    'w-full',
    'rounded-md',
    'border-0',
    'bg-white',
    'px-2.5',
    'text-gray-900',
    'shadow-sm',
    'ring-1',
    'ring-inset',
    'ring-gray-300',
    'placeholder:text-gray-500',
    'focus:shadow-sm',
    'focus:shadow-blue-200',
    'focus-within:outline-none',
    { 'py-0.75 text-sm': size === 'sm' },
    { 'py-2': size === 'md' },
    { 'py-1.5 text-xl': size === 'lg' }
  )

  const labelClassItems = classNames(labelClass)

  return (
    <>
      <label htmlFor={id} className={labelClassItems}>
        {label}
      </label>

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
