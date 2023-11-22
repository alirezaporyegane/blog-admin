import classNames from 'classnames'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TList = {
  children?: ReactNode
  className?: string
}

const List = ({ children, className }: TList) => {
  const classes = twMerge(
    classNames('flex', 'flex-col', 'min-w-[240px]', 'text-base', 'p-2')
  )

  const wrapperClasses = twMerge(
    classNames(
      'relative',
      'flex',
      'text-gray-700',
      'bg-white',
      'rounded-xl',
      'bg-clip-border',
      'flex-col',
      'shadow-md'
    ),
    className
  )

  return (
    <div className={wrapperClasses}>
      <nav role="list" className={classes}>
        {children}
      </nav>
    </div>
  )
}

export default List
