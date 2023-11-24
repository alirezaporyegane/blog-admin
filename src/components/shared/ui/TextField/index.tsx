import { Input, InputProps } from '@material-tailwind/react'
import { forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import './index.scss'

type IProps = InputProps & {
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
}

const TextField = forwardRef<HTMLInputElement, IProps>((props: IProps, ref) => {
  const { errorMessage, ...rest } = props
  return (
    <div
      ref={ref}
      className={`pb-5 relative ${
        rest.variant === 'outlined' ? 'label-outlined' : ''
      }`}
    >
      <Input crossOrigin={{}} {...rest} />

      {errorMessage && (
        <small className="text-red-400 text-[12px] mt-1 absolute">
          {typeof errorMessage === 'string' && errorMessage}
        </small>
      )}
    </div>
  )
})

export default TextField
