import { ReactNode, useEffect, useRef, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

interface IProps {
  children?: ReactNode
  class?: string[] | string
  type?: 'button' | 'reset' | 'submit'
  block?: boolean
  color?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'gray'
  clicked?: (event: Element | null) => void
  icon?: ReactNode
  loading?: boolean
  disabled?: boolean
}

const Button = (props: IProps) => {
  const elementRef = useRef(null)
  const { type = 'button', color, loading = false, disabled = false } = props

  const [buttonClass, setButtonClass] = useState(
    [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      props.icon && !props.children ? 'p-3' : 'px-4 py-3',
      props.block ? 'w-full' : '',
      typeof props.class === 'string' ? props.class : props?.class?.join(' ')
    ].join(' ')
  )

  useEffect(() => handleColor(), [])

  function handleColor() {
    if (disabled)
      setButtonClass(
        `${buttonClass} bg-gray-500 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500 opacity-30 text-gray-300 cursor-not-allowed`
      )
    else {
      switch (color) {
        case 'primary':
          setButtonClass(
            `${buttonClass} bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-700 text-white`
          )
          break
        case 'secondary':
          setButtonClass(
            `${buttonClass} bg-orange-400 hover:bg-orange-500 focus:bg-orange-600 active:bg-orange-600`
          )
          break
        case 'danger':
          setButtonClass(
            `${buttonClass} bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-800 text-white`
          )
          break
        case 'success':
          setButtonClass(
            `${buttonClass} bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 active:bg-emerald-700 text-white`
          )
          break
        case 'warning':
          setButtonClass(
            `${buttonClass} bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-600`
          )
          break

        default:
          setButtonClass(
            `${buttonClass} bg-gray-400 hover:bg-gray-500 focus:bg-gray-600 active:bg-gray-600`
          )
          break
      }
    }
  }

  function handleClicked() {
    if (disabled || loading) return

    if (props.clicked)
      props.clicked((elementRef.current && elementRef.current) || null)
  }

  return (
    <button
      ref={elementRef}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={handleClicked}
    >
      {loading ? (
        <MdMoreHoriz className="text-2xl mx-4" />
      ) : (
        <>
          {props.children}

          {props.icon && (
            <span className={props.children ? 'ps-2' : ''}>{props.icon}</span>
          )}
        </>
      )}
    </button>
  )
}

export default Button
