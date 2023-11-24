interface IProps {
  label: string
  classes?: string
  color?: string
}

const Badge = ({ label, classes, color }: IProps) => {
  const badgeColor = (bg: string) => {
    if (bg === 'primary') return 'bg-blue-50 text-blue-800 ring-blue-500/10'
    else if (bg === 'danger') return 'bg-red-50 text-red-800 ring-red-500/10'
    else if (bg === 'warning')
      return 'bg-yellow-50 text-yellow-800 ring-yellow-500/10'
    else if (bg === 'success')
      return 'bg-emerald-50 text-emerald-800 ring-emerald-500/10'
    else if (bg === 'secondary')
      return 'bg-orange-50 text-orange-800 ring-orange-500/10'
    else if (bg === 'gray') return 'bg-gray-50 text-gray-800 ring-gray-500/10'
  }

  return (
    <div
      className={`${
        classes ? `${classes} ` : ''
      } px-2 py-1 flex items-center justify-center rounded-xl text-xs/4 ring-1 ring-inset ${
        color ? badgeColor(color) : ''
      }`}
    >
      {label}
    </div>
  )
}

export default Badge
