import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'src/config'
import useFetch from 'src/hooks/useFetch'
import { type Role } from 'src/features/Roles/types/rolesTypes'

export interface UseRoleDeleteResult {
  onClickOpenConfirm: (role: Role) => void
}

export default function useRemoveRole(refresh: () => void): UseRoleDeleteResult {
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const confirm = useConfirm()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    (role: Role) => {
      const action = 'delete'

      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          void doFetch({
            method: 'DELETE',
            url: `${config.api.msAuth.baseUrl}/roles/${role.id}`,
          }).then(() => {
            refresh()
          })
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, refresh]
  )

  return { onClickOpenConfirm }
}
