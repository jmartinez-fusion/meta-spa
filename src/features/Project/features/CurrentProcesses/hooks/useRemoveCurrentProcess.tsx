import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import { useNavigate, useParams } from 'react-router-dom'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import { useSnackbar } from 'notistack'

export interface UseCurrentProcessRemoveResult {
  onClickOpenConfirm: (currentProcess?: CurrentProcess) => void
}

export default function useRemoveCurrentProcess(): UseCurrentProcessRemoveResult {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const confirm = useConfirm()
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { doFetch } = useFetch()
  const { enqueueSnackbar } = useSnackbar()

  const onClickOpenConfirm = useCallback(
    (currentProcess?: CurrentProcess) => {
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
            url: `${config.api.msProcesses.baseUrl}/projects/${projectId}/current-processes/${currentProcess?.id}`,
          })
            .then(() => {
              navigate(CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', projectId ?? ''))

              const message = t('common:deletedSuccessfully', {
                name: currentProcess?.currentProcess,
                type: t('singular'),
              })

              enqueueSnackbar(message, {
                preventDuplicate: false,
                variant: 'success',
              })
            }).catch((error) => {
              enqueueSnackbar(error, {
                preventDuplicate: true,
                variant: 'error',
                autoHideDuration: 2000,
              })
            })
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, navigate, doFetch, projectId, enqueueSnackbar]
  )

  return { onClickOpenConfirm }
}
