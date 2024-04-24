import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'
import useProject from 'features/Project/hooks/useProject'
import { FUTURE_PROCESSES_PATHS } from '../routes'

export interface UseFutureProcessResetResult {
  onClickOpenConfirm: (futureProcessId: string) => void
  reset: (futureProcessId: string) => void
}

export default function useResetFutureProcess(): UseFutureProcessResetResult {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const confirm = useConfirm()
  const navigate = useNavigate()
  const { project } = useProject()
  const { doFetch } = useFetch()

  const reset = (futureProcessId: string): void => {
    void doFetch({
      method: 'POST',
      url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/future-process-presentations/${futureProcessId}/reset-process`,
    }).then(() => {
      navigate(
        FUTURE_PROCESSES_PATHS.EDIT_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
          ':futureProcessId',
          futureProcessId ?? ''
        )
      )
    })
  }

  const onClickOpenConfirm = useCallback(
    (futureProcessId: string) => {
      const action = 'reset'
      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          reset(futureProcessId)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, reset]
  )

  return { onClickOpenConfirm, reset }
}
