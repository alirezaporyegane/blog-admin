import classNames from 'classnames'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = {
  children?: ReactNode
  className?: string
  selected?: boolean
  disabled?: boolean
  clicked?: () => void
}

const ListItem = ({
  children,
  className,
  selected,
  disabled,
  clicked
}: TProps) => {
  const classes = twMerge(
    classNames(
      'flex',
      'p-3',
      'items-center',
      'w-full',
      'rounded-lg',
      'cursor-pointer',
      'text-start',
      'hover:bg-gray-50',
      'active:bg-gray-50',
      { 'bg-gray-50': selected && !disabled },
      { 'hover:bg-transparent cursor-not-allowed opacity-50': disabled }
    ),
    className
  )

  return (
    <div className={classes} role="listitem" tabIndex={0} onClick={clicked}>
      {children}
    </div>
  )
}

export default ListItem
