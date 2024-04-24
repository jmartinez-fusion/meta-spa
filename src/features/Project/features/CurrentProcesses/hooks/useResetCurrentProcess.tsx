import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'
import useProject from 'features/Project/hooks/useProject'
import { CURRENT_PROCESSES_PATHS } from '../routes'

export interface UseCurrentProcessResetResult {
  onClickOpenConfirm: (currentProcessId: string) => void
  reset: (currentProcessId: string) => void
}

export default function useResetCurrentProcess(refresh: () => void): UseCurrentProcessResetResult {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const confirm = useConfirm()
  const navigate = useNavigate()
  const { project } = useProject()
  const { doFetch } = useFetch()

  const reset = (currentProcessId: string): void => {
    void doFetch({
      method: 'POST',
      url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-process-presentations/${currentProcessId}/reset-process`,
    }).then(() => {
      refresh()
      navigate(
        CURRENT_PROCESSES_PATHS.EDIT_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
          ':currentProcessId',
          currentProcessId ?? ''
        )
      )
    })
  }

  const onClickOpenConfirm = useCallback(
    (currentProcessId: string) => {
      const action = 'reset'
      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          reset(currentProcessId)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, reset]
  )

  return { onClickOpenConfirm, reset }
}
