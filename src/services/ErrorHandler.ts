import { ErrorExceptions } from '@/@types/Services'
import { error as errorNotify } from '@/utils/Notify'
import { t } from 'i18next'

export function errorHandler(err: ErrorExceptions | unknown) {
  let error
  if (Array.isArray(err)) error = err[0]

  if (!error) return errorNotify('')

  if (error?.msg) return errorNotify(t(error?.msg))

  return errorNotify(error?.code.toString())
}
