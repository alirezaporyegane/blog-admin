import classNames from 'classnames'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  to: string
  classes?: string
  icon?: ReactNode
}

const Links = ({ children, to = '/', classes, icon }: IProps) => {
  const linkClasses = classNames(classes, 'flex', 'items-center')
  const iconClasses = classNames({ 'ps-2': !!children })

  return (
    <Link to={to} className={linkClasses}>
      <>
        <span className="leading-1">{children}</span>

        {icon && <span className={iconClasses}>{icon}</span>}
      </>
    </Link>
  )
}

export default Links
