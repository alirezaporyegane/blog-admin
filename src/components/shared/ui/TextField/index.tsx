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
  // value,
  // placeholder,
  label,
  size = 'md',
  classes,
  // type,
  // name,
  id = 'input'
}: // changed
TProps) => {
  const inputClass = [
    classes ? `${classes} ` : '',
    'block',
    'w-full',
    'rounded-md',
    'border-0',
    'px-3',
    'text-gray-900',
    'shadow-sm',
    'ring-1',
    'ring-inset',
    'rounded-xl',
    'ring-gray-300',
    'placeholder:text-gray-500',
    'focus:shadow-sm',
    'focus:shadow-blue-200',
    'focus-within:outline-none',
    'sm:text-sm',
    'sm:leading-6'
  ]

  if (size === 'sm') inputClass.push('py-0.75 text-sm')
  else if (size === 'md') inputClass.push('py-2')
  else if (size === 'lg') inputClass.push('py-1.5 text-xl')

  return (
    <div className='relative w-full min-w-[200px] h-10'>
      {/* {label ? (
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
      /> */}

      <input
        type="text"
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
      />
      <label
        htmlFor={id}
        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500"
      >
        {label}
      </label>
    </div>
  )
}

export default TextField
