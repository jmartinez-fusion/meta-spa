import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import { type TextBlockFromApi } from 'Project/features/TextBlocks/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { textBlocksFromApi } from 'Project/features/TextBlocks/transformers'

interface UseFetchTextBlocksProps {
  filters: Filters
}

interface UseFetchTextBlocksReturn {
  textBlocks: TextBlockFromApi[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchTextBlocks = ({ filters }: UseFetchTextBlocksProps): UseFetchTextBlocksReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [textBlocks, setTextBlocks] = useState<TextBlockFromApi[] | null>(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProjects.baseUrl}/projects/${project?.id}/text-blocks`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const textBlocks = response.data.map((textBlock: TextBlockFromApi) =>
      textBlocksFromApi(textBlock)
    )
    setTextBlocks(textBlocks)
  }, [response?.data, t])

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
        />
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return {
    textBlocks,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchTextBlocks
