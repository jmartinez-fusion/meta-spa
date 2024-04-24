import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseRemoveAssignedUserResult {
  onClickOpenConfirm: (projectId: string, userId: string) => void
  loading: boolean
}

export default function useRemoveAssignedUser(refresh: () => void): UseRemoveAssignedUserResult {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const confirm = useConfirm()
  const { doFetch, loading } = useFetch()

  const onClickOpenConfirm = useCallback(
    (projectId: string, userId: string) => {
      confirm({
        title: t('delete-assigned-user.title'),
        content: t('delete-assigned-user.content'),
        confirmationText: t(`delete-assigned-user.title`),
        cancellationText: t('delete-assigned-user.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          void doFetch({
            method: 'POST',
            url: `${config.api.msProjects.baseUrl}/projects/${projectId}/unassign-user`,
            data: {
              userId,
            },
          }).then(refresh)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, refresh]
  )

  return { onClickOpenConfirm, loading }
}
