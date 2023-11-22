import { Input, InputProps } from '@material-tailwind/react'
import { forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

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
    <div ref={ref} className="custom-input pb-5 relative">
      <Input crossOrigin={{}} {...rest} />

      {errorMessage && (
        <small className="text-red-400 text-xs mt-1 absolute">
          {typeof errorMessage === 'string' && errorMessage}
        </small>
      )}
    </div>
  )
})

export default TextField
