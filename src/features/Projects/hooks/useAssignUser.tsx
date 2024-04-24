import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseRemoveAssignedUserResult {
  assignUser: (projectId: string, userId: string) => void
  loading: boolean
}

export default function useAssignUser(refresh: () => void): UseRemoveAssignedUserResult {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const confirm = useConfirm()
  const { doFetch, loading } = useFetch()

  const assignUser = useCallback(
    (projectId: string, userId: string) => {
      void doFetch({
        method: 'POST',
        url: `${config.api.msProjects.baseUrl}/projects/${projectId}/assign-user`,
        data: {
          userId,
        },
      }).then(refresh)
    },
    [t, confirm, doFetch, refresh]
  )

  return { assignUser, loading }
}
