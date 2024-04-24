import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PROJECTS_PATHS } from 'Projects/routes'

interface ProjectFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useProjectFormConfirmDialog = (mode: string): ProjectFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `Projects.${mode}.cancelDialog` })
  const confirm = useConfirm()
  const navigate = useNavigate()

  const onClickOpenConfirm = useCallback(() => {
    confirm({
      title: t('title'),
      content: t('content'),
      confirmationText: t('confirm'),
      cancellationText: t('cancel'),
      cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
    }).catch(() => {
      navigate(PROJECTS_PATHS.LIST)
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useProjectFormConfirmDialog
