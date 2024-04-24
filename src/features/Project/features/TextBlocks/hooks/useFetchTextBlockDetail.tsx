import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import { type TextBlockFromApi } from 'Project/features/TextBlocks/types'
import { textBlockFromApi } from 'Project/features/TextBlocks/transformers'
import useProject from 'features/Project/hooks/useProject'
import config from 'src/config.tsx'

interface UseFetchTextBlockProps {
  id?: string | null
}

interface UseFetchTextBlockReturn {
  textBlock?: TextBlockFromApi | undefined
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchTextBlock = ({ id }: UseFetchTextBlockProps): UseFetchTextBlockReturn => {
  const [textBlock, setTextBlock] = useState<TextBlockFromApi | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${project?.id}/text-blocks/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setTextBlock(undefined)
    void doFetch()
  }, [setTextBlock])

  useEffect(() => {
    if (!response) return

    setTextBlock(textBlockFromApi(response.data))
  }, [response, t])

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
  }, [error, t])

  const isLoading = useMemo(
    () => loading || !!(textBlock === undefined && id),
    [loading, textBlock, id]
  )

  return { textBlock, loading: isLoading, error, refresh }
}

export default useFetchTextBlock
