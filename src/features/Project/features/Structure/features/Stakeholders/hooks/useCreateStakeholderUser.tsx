import { useConfirm } from 'material-ui-confirm'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject.ts'
import { useSnackbar } from 'notistack'

export interface UseCreateStakeholderUserResult {
  onClickOpenConfirm: () => void
}

export default function useCreateStakeholderUser(
  id: string,
  refresh: () => void
): UseCreateStakeholderUserResult {
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })
  const confirm = useConfirm()
  const { doFetch, response, error, retry } = useFetch()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()

  const onClickOpenConfirm = useCallback(() => {
    confirm({
      title: t('createUser.title'),
      content: t('createUser.content'),
      confirmationText: t(`createUser.action`),
      cancellationText: t('createUser.cancel'),
      cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
    })
      .then(() => {
        void doFetch({
          method: 'POST',
          url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/stakeholders/${id}/activate`,
        })
      })
      .catch(() => {
        console.log('cancel', null)
      })
  }, [t, confirm, doFetch, project, id])

  useEffect(() => {
    if (!response) return

    const message = t('emailSentSuccessFully')

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })

    refresh()
  }, [response, t, enqueueSnackbar, refresh])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        >
          {t('common:retry')}
        </div>
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])
  return { onClickOpenConfirm }
}
