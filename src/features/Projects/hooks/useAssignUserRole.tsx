import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseAssignUserRoleResult {
  assignUserRole: (projectId: string, userId: string, projectRole: string) => void
  loading: boolean
}

export default function useAssignUserRole(refresh: () => void): UseAssignUserRoleResult {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const confirm = useConfirm()
  const { doFetch, loading } = useFetch()

  const assignUserRole = useCallback(
    (projectId: string, userId: string, projectRole: string) => {
      void doFetch({
        method: 'POST',
        url: `${config.api.msProjects.baseUrl}/projects/${projectId}/assign-user-role`,
        data: {
          projectRole,
          userId,
        },
      })
    },
    [t, confirm, doFetch, refresh]
  )

  return { assignUserRole, loading }
}
