interface IProps {
  label: string
  classes?: string
  color?: TVariants
}

const Badge = ({ label, classes, color }: IProps) => {
  const badgeColor = (bg: TVariants) => {
    if (bg === 'primary') return 'bg-blue-100 border-blue-200'
    else if (bg === 'danger') return 'bg-red-100 border-red-200'
    else if (bg === 'warning')
      return 'bg-yellow-100 border-yellow-200 text-dark'
    else if (bg === 'success') return 'bg-emerald-100 border-emerald-200'
    else if (bg === 'secondary') return 'bg-orange-100 border-orange-200'
    else if (bg === 'gray') return 'bg-gray-100 border-gray-200'
  }
  
  return (
    <div
      className={`${
        classes ? `${classes} ` : ''
      } px-2 py-1 flex items-center justify-center rounded-xl text-xs/4 border ${
        color ? badgeColor(color) : ''
      }`}
    >
      {label}
    </div>
  )
}

export default Badge
