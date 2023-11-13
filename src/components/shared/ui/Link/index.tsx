import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  to: string
  classes?: string
  icon?: ReactNode
}

const Links = ({ children, to = '/', classes, icon }: IProps) => {
  return (
    <Link
      to={to}
      className={`${classes ? `${classes} ` : ''}flex items-center`}
    >
      <>
        <span className="leading-1">{children}</span>

        {icon && <span className={children ? 'ps-2' : ''}>{icon}</span>}
      </>
    </Link>
  )
}

export default Links
