import { ChangeEvent } from 'react'

type TProps = {
  placeholder?: string
  id?: string
  value: any
  label?: string
  classes?: string
  type?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  changed: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({
  value,
  placeholder,
  label,
  size = 'md',
  classes,
  type,
  name,
  id = 'input',
  changed
}: TProps) => {
  const inputClass = [
    classes ? `${classes} ` : '',
    'block',
    'w-full',
    'rounded-md',
    'border-0',
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
  ]

  if (size === 'sm') inputClass.push('py-0.75 text-sm')
  else if (size === 'md') inputClass.push('py-2')
  else if (size === 'lg') inputClass.push('py-1.5 text-xl')

  return (
    <>
      {label ? (
        <label
          htmlFor={id}
          className="block text-sm font-semibold leading-6 text-gray-900 mb-2.5 tex-x"
        >
          {label}
        </label>
      ) : null}

      <input
        id={id}
        type={type}
        name={name}
        className={inputClass.join(' ')}
        value={value}
        placeholder={placeholder}
        onChange={changed}
      />
    </>
  )
}

export default TextField
