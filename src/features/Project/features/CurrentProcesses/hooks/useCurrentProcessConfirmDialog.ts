import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useProject from 'Project/hooks/useProject'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes'

interface CurrentProcessFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useCurrentProcessFormConfirmDialog = (
  mode: string
): CurrentProcessFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `CurrentProcesses.${mode}.cancelDialog` })
  const confirm = useConfirm()
  const { project } = useProject()
  const navigate = useNavigate()

  const onClickOpenConfirm = useCallback(() => {
    confirm({
      title: t('title'),
      content: t('content'),
      confirmationText: t('confirm'),
      cancellationText: t('cancel'),
      cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      confirmationButtonProps: { variant: 'contained', sx: { mr: '5px' } },
    }).catch(() => {
      navigate(CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''))
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useCurrentProcessFormConfirmDialog
