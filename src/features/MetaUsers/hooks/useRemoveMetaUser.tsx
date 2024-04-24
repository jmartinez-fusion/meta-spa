import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type MetaUser } from 'MetaUsers/types'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseMetaUserDeleteResult {
  onClickOpenConfirm: (metaUser: MetaUser) => void
}

export default function useRemoveMetaUser(refresh: () => void): UseMetaUserDeleteResult {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const confirm = useConfirm()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    (metaUser: MetaUser) => {
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
            url: `${config.api.msAuth.baseUrl}/meta-users/${metaUser.id}`,
          }).then(refresh)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, refresh]
  )

  return { onClickOpenConfirm }
}
