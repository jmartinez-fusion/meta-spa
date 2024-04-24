import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { type Sprint } from 'Project/features/Sprints/types'
import useProject from 'Project/hooks/useProject.ts'

export interface UseMetaUserDeleteResult {
  onClickOpenConfirm: (sprint: Sprint) => void
}

export default function useRemoveSprint(refresh: () => void): UseMetaUserDeleteResult {
  const { t } = useTranslation('features', { keyPrefix: 'Sprints' })
  const confirm = useConfirm()
  const { project } = useProject()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    (sprint: Sprint) => {
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
            url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/sprints/${sprint.id}`,
          }).then(refresh)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, refresh, project]
  )

  return { onClickOpenConfirm }
}
