import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'

interface MetaUserFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useMetaUserFormConfirmDialog = (mode: string): MetaUserFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `Sprints.${mode}.cancelDialog` })
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
      navigate(SPRINTS_PATHS.LIST)
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useMetaUserFormConfirmDialog
