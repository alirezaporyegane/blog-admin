import { IconButton } from '@material-tailwind/react'
import { MdExpandMore } from 'react-icons/md'

const Account = () => {
  return (
    <div className="flex items-center py-8">
      <img
        className="object-cover object-center me-6"
        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
        alt="Alireza"
        width={40}
        height={40}
      />

      <div className="text-sm me-3">
        <h6 className="text-gray-900 font-semibold">Alireza Yegane</h6>

        <h6>alirezayegnae@gmai.com</h6>
      </div>

      <IconButton variant="text" className="rounded-full">
        <MdExpandMore className="text-lg" />
      </IconButton>
    </div>
  )
}

export default Account
