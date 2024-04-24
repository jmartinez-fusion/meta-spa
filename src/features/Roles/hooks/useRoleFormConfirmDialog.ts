import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROLES_PATHS } from 'src/features/Roles/routes.tsx'

interface RoleFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useRoleFormConfirmDialog = (mode: string): RoleFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `Roles.${mode}.cancelDialog` })
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
      navigate(ROLES_PATHS.LIST)
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useRoleFormConfirmDialog
