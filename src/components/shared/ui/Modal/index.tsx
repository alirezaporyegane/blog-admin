import {
  Fragment,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'
import { Button } from '..'

export interface IRef {
  show: () => void
  hide: () => void
}

type TProps = {
  children?: ReactNode
  centered?: boolean
  showTitle?: boolean
  title?: string
  classes?: string
  bodyClasses?: string
  headerClasses?: string
  ariaLabelledby?: string
}

const Modal = forwardRef(
  (
    {
      children,
      centered,
      showTitle,
      title,
      classes,
      ariaLabelledby,
      bodyClasses,
      headerClasses
    }: TProps,
    ref
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useImperativeHandle(
      ref,
      () =>
        ({
          show: () => setIsVisible(true),
          hide: () => setIsVisible(false)
        } as IRef)
    )

    const hide = () => setIsVisible(false)

    return createPortal(
      <Fragment>
        {isVisible && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            className={`relative z-10${classes ? ` ${classes}` : ''}`}
          >
            <div
              className="fixed inset-0 z-[-1] bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-300"
              onClick={hide}
            />

            <div className="fixed inset-0 w-screen overflow-y-auto">
              <div
                className={`${
                  centered ? 'items-center ' : 'items-start '
                }flex min-h-full justify-center p-4 text-center sm:p-0`}
              >
                <div className="relative transform overflow-hidden rounded-3xl z-50 bg-white text-right shadow-xl transition-opacity ease-in-out duration-300 sm:my-8 sm:w-full sm:max-w-lg">
                  {showTitle && (
                    <div
                      className={`px-6 pt-6 flex justify-between items-center ${
                        headerClasses ? ` ${headerClasses}` : ''
                      }`}
                    >
                      <h4 className="text-xl font-semibold">{title}</h4>

                      <Button
                        flat
                        class="rounded-full"
                        icon={<MdClose />}
                        clicked={hide}
                      />
                    </div>
                  )}

                  <div
                    className={`p-6 ${bodyClasses ? ` ${bodyClasses}` : ''}`}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>,
      document.body
    )
  }
)

export default Modal
