import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { type TextBlockFromApi } from 'Project/features/TextBlocks/types'
import useFetch from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import config from 'config'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import useFetchTextBlock from 'Project/features/TextBlocks/hooks/useFetchTextBlockDetail'

interface UseTextBlockReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
  textBlock?: TextBlockFromApi | undefined
  loading: boolean
}

const useTextBlockEdit = (textBlockId: string, onSuccess?: () => void): UseTextBlockReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { textBlock, loading } = useFetchTextBlock({
    id: textBlockId,
  })
  const {
    response,
    doFetch,
    retry,
    error,
    loading: isSubmitting,
  } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${project?.id}/text-blocks/${textBlockId}`,
    {
      method: 'PUT',
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

      const message = t('editedSuccessfully', {
        name: response.data.name,
        type: t('features:TextBlocks:singular'),
      })

      enqueueSnackbar(message, {
        preventDuplicate: false,
        variant: 'success',
      })
    }
  }, [response, t, navigate, enqueueSnackbar, onSuccess])

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

  return { onSubmit, isSubmitting, textBlock, loading }
}

export default useTextBlockEdit
