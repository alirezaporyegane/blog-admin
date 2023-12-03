import toast, { ToastOptions } from 'react-hot-toast'

const options: ToastOptions = {
  duration: 3000,
  position: 'top-center',
  ariaProps: {
    role: 'status',
    'aria-live': 'polite'
  }
}
export const custom = (cmp: JSX.Element) => toast.custom(cmp, options)

export const success = (title: string) => toast.success(title, options)

export const error = (title: string) => toast.error(title, options)

export const loading = (title: string) => toast.loading(title, options)
