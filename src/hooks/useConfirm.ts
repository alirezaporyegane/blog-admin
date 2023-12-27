import { t } from 'i18next'
import {
  ConfirmOptions,
  useConfirm as useMaterialConfirm
} from 'material-ui-confirm'

export default function useConfirm() {
  const materialConfirm = useMaterialConfirm()

  const confirm = (title: string) => {
    const options: ConfirmOptions = {
      title,
      confirmationText: t('confirm'),
      cancellationText: t('cancel'),
      cancellationButtonProps: { variant: 'contained', color: 'error' },
      confirmationButtonProps: { variant: 'contained', color: 'primary' }
    }

    return materialConfirm(options)
  }

  return { confirm }
}
