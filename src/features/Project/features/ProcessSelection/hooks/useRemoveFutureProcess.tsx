import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'src/config'
import useFetch from 'src/hooks/useFetch'
import useProject from 'Project/hooks/useProject.ts'

export interface UseRemoveFutureProcessResult {
  onClickOpenConfirm: (futureProcessId: string) => void
}

export default function useRemoveFutureProcess(refresh: () => void): UseRemoveFutureProcessResult {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessSelection' })
  const confirm = useConfirm()
  const { project } = useProject()
  const { id } = project ?? {}

  function removeProject(futureProcessId: string): void {
    void doFetch({
      data: {
        projectId: id,
        selected: [],
        unselected: [],
        deleted: [futureProcessId],
      },
    }).then(() => {
      refresh()
    })
  }

  const { doFetch } = useFetch(
    `${config.api.msProjects.baseUrl}/project-future-processes/update-selection`,
    {
      method: 'POST',
    }
  )
  const onClickOpenConfirm = useCallback(
    (futureProcessId: string) => {
      const action = 'delete'

      void confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          removeProject(futureProcessId)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    [t, confirm, removeProject]
  )

  return { onClickOpenConfirm }
}
