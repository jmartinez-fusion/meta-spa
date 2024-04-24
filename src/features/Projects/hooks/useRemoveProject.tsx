import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type Project } from 'Projects/types'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseProjectDeleteResult {
  onClickOpenConfirm: (project: Project) => void
}

export default function useRemoveProject(refresh: () => void): UseProjectDeleteResult {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const confirm = useConfirm()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    (project: Project) => {
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
            url: `${config.api.msProjects.baseUrl}/projects/${project.id}`,
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
