import className from 'classnames'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  classes: string
  bordered?: boolean
  elevated?: boolean
  filled?: boolean
}

const Card = ({ children, classes, elevated, filled, bordered }: IProps) => {
  const cardClass = className(
    classes,
    'rounded-xl',
    'p-3',
    { 'shadow-md ring-1 ring-gray-300': elevated },
    { 'shadow-md': filled },
    { 'ring-1 ring-gray-300': bordered }
  )

  return <div className={cardClass}>{children}</div>
}

export default Card
