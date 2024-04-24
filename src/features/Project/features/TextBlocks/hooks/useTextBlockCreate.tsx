import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import useProject from 'features/Project/hooks/useProject'

interface UseTextBlockCreationReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useTextBlockCreate = (onSuccess?: () => void): UseTextBlockCreationReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${project?.id}/text-blocks`,
    {
      method: 'POST',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ data })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    if (onSuccess) {
      onSuccess()
    } else {
      navigate(TEXT_BLOCKS_PATHS.LIST.replace(':projectId', project?.id ?? ''))

      const message = t('createdSuccessfully', {
        name: response.data.title,
        type: t('features:TextBlocks:singular'),
      })

      enqueueSnackbar(message, {
        preventDuplicate: false,
        variant: 'success',
      })
    }
  }, [response, t, navigate, enqueueSnackbar])

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
          {t('retry')}
        </div>
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSubmit, isSubmitting: loading }
}

export default useTextBlockCreate
