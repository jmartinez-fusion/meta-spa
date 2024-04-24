import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useProject from 'Project/hooks/useProject'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'

interface FutureProcessFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useFutureProcessFormConfirmDialog = (
  mode: string
): FutureProcessFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `FutureProcess.${mode}.cancelDialog` })
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
    }).catch(() => {
      navigate(FUTURE_PROCESSES_PATHS.DETAILS.replace(':projectId', project?.id ?? ''))
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useFutureProcessFormConfirmDialog
