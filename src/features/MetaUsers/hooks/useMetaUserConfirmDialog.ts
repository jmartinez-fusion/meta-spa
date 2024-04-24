import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { META_USERS_PATHS } from 'MetaUsers/routes'

interface MetaUserFormConfirmDialogResponse {
  onClickOpenConfirm: () => void
}

const useMetaUserFormConfirmDialog = (mode: string): MetaUserFormConfirmDialogResponse => {
  const { t } = useTranslation('features', { keyPrefix: `MetaUsers.${mode}.cancelDialog` })
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
      navigate(META_USERS_PATHS.LIST)
    })
  }, [t, confirm, navigate])

  return { onClickOpenConfirm }
}

export default useMetaUserFormConfirmDialog
