import classNames from 'classnames'
import { Fragment, ReactNode, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

type TVariant = 'outlined' | 'default'

type TProp = {
  children?: ReactNode
  className?: string
  icon?: ReactNode
  variant?: TVariant
  color?: string
  open?: boolean
}

const Alert = ({
  children,
  className,
  icon,
  variant = 'default',
  color,
  open = false
}: TProp) => {
  const [isOpen, setIsOpen] = useState(open)
  const margVariant = (colorName?: string, variant?: TVariant) => {
    if (variant === 'outlined') {
      if (colorName === 'primary') return 'border-blue-500 text-blue-500'
      else if (colorName === 'secondary')
        return 'border-orange-500 text-orange-500'
      else if (colorName === 'success')
        return 'border-emerald-500 text-emerald-500'
      else if (colorName === 'danger') return 'border-red-500 text-red-500'
      else if (colorName === 'warning') return 'border-amber-500 text-amber-500'
      else return 'border-gray-900 text-gray-900'
    } else {
      if (colorName === 'primary') return 'bg-blue-500 text-white'
      else if (colorName === 'secondary') return 'bg-orange-500 text-white'
      else if (colorName === 'success') return 'bg-emerald-500 text-white'
      else if (colorName === 'danger') return 'bg-red-500 text-white'
      else if (colorName === 'warning') return 'bg-amber-500 text-gray-900'
      else return 'bg-gray-900 text-white'
    }
  }

  const classes = twMerge(
    classNames(
      { 'border bg-transparent': variant === 'outlined' },
      margVariant(color, variant),
      'p-4 text-base flex justify-start items-center rounded-lg'
    ),
    className
  )

  const iconClass = classNames('me-3 text-xl')

  return (
    <Fragment>
      {isOpen && (
        <div role="alert" className={classes}>
          {icon && <span className={iconClass}>{icon}</span>}

          {children}

          {
            <button
              data-button-delete
              className={`py-2 px-3 ms-auto rounded-full text-lg hover:${margVariant(
                color,
                variant
              )}`}
              onClick={() => setIsOpen(false)}
            >
              <MdClose />
            </button>
          }
        </div>
      )}
    </Fragment>
  )
}

export default Alert
