import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface UseProcessesListConfirmDialogResult {
  onClickOpenConfirm: () => void
}

export default function useProcessesListConfirmDialog(
  refresh: () => void
): UseProcessesListConfirmDialogResult {
  const { t } = useTranslation('features', { keyPrefix: `ProcessSelection.cancelSelectionDialog` })
  const confirm = useConfirm()
  const navigate = useNavigate()

  const onClickOpenConfirm = useCallback(() => {
    confirm({
      title: t('title', { action: t('cancelSelection') }),
      content: t('content', { action: t('cancel') }),
      confirmationText: t('confirm'),
      cancellationText: t('cancelSelection'),
      cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
    }).catch(() => {
      refresh()
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}
