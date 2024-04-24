import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { type Tag, type TagFromApi } from 'Project/features/TextBlocks/types'
import { tagFromApi } from 'Project/features/TextBlocks/transformers'

interface UseFetchTagsReturn {
  tags: Tag[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchTags = (): UseFetchTagsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [tags, setTags] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProjects.baseUrl}/projects/${project?.id}/tags`,
  })

  useEffect(() => {
    if (!response) return

    const tags = response.data.map((tag: TagFromApi) => tagFromApi(tag))
    setTags(tags)
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
    tags,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchTags
