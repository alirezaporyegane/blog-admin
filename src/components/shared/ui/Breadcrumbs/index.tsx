import { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export type IOption = {
  label: string
  key: string
  path?: string
  icon?: ReactNode
}

type IProps = {
  options: IOption[]
  classes?: string
  optionsClass?: string
}

const Breadcrumbs = ({ options, classes, optionsClass }: IProps) => {
  const breadCrumbClass = `${
    classes ? `${classes} ` : ''
  }flex items-center justify-start`

  const breadItemsClasses = `${
    optionsClass ? `${optionsClass} ` : ''
  } ms-2 flex items-center`

  return (
    <div className={breadCrumbClass}>
      {options.map((option, index) => {
        return (
          <Fragment key={option.key}>
            {option.path ? (
              <Link
                to={option.path}
                className={`${breadItemsClasses} text-gray-500`}
              >
                <span className={`${option.icon ? 'me-1 ' : ''}text-xl mb-1`}>
                  {option.icon}
                </span>

                {option.label}
              </Link>
            ) : (
              <span
                className={`${breadItemsClasses}text-gray-800 font-semibold`}
              >
                <span className={`${option.icon ? 'me-1 ' : ''}text-xl mb-1`}>
                  {option.icon}
                </span>

                {option.label}
              </span>
            )}

            {index !== options.length - 1 && <div className="ms-2">/</div>}
          </Fragment>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
