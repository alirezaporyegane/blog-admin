import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  classes: string
  elevated?: boolean
  filled?: boolean
}

const Card = ({ children, classes, elevated, filled }: IProps) => {
  const cardClass = [`${classes ? `${classes}` : ''}`, 'rounded-xl', 'p-3']

  if (elevated) cardClass.push('shadow-md ring-1 ring-gray-300')
  else if (filled) cardClass.push('shadow-md')
  else cardClass.push('ring-1 ring-gray-300')

  return <div className={cardClass.join(' ')}>{children}</div>
}

export default Card
