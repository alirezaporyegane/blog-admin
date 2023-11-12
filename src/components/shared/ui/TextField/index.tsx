import { ChangeEvent } from 'react'

type TProps = {
  placeholder?: string
  id?: string
  value: any
  label?: string
  classes?: string
  changed: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({
  value,
  placeholder,
  label,
  classes,
  id = 'input',
  changed
}: TProps) => {
  const inputClass = [
    classes ? `${classes} ` : '',
    'block',
    'w-full',
    'rounded-md',
    'border-0',
    'py-1.5',
    'px-1.5',
    'text-gray-900',
    'shadow-sm',
    'ring-1',
    'ring-inset',
    'ring-gray-300',
    'placeholder:text-gray-500',
    'focus:border',
    'focus:border-blue-300',
    'focus-within:outline-none',
    'sm:text-sm',
    'sm:leading-6'
  ].join(' ')

  return (
    <>
      {label ? (
        <label
          htmlFor={id}
          className="block text-sm font-semibold leading-6 text-gray-900 mb-2.5"
        >
          {label}
        </label>
      ) : null}

      <input
        id={id}
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={changed}
      />
    </>
  )
}

export default TextField
