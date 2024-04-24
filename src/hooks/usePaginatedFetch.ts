import { useState, useEffect } from 'react'
import useFetch from './useFetch'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types//sorter'
import { useTranslation } from 'react-i18next'

interface PaginatedFetchProps {
  initialPerPage?: number
  initialPage?: number
  url: string
  filters?: Filters
  defaultSorter?: { fieldName: string; order: 'asc' | 'desc' | undefined }
  config?: any
}

interface PaginatedFetchResult {
  doFetch?: () => void
  retry: () => void
  response: any
  paginator: Paginator
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  loading: boolean
  error: any
}

const getApiSorter = (fieldName?: string, order?: 'asc' | 'desc'): string | undefined => {
  if (fieldName && order) {
    return `${fieldName}:${order}`
  }

  return undefined
}

const usePaginatedFetch = ({
  initialPerPage = 10,
  initialPage = 1,
  url,
  filters,
  defaultSorter,
  config,
}: PaginatedFetchProps): PaginatedFetchResult => {
  const { t } = useTranslation('common')
  const [currentSorter, setCurrentSorter] = useState<Sorter | undefined>(defaultSorter)
  const [perPage, setPerPage] = useState(initialPerPage)
  const [page, setPage] = useState(initialPage)

  const setSorter = (fieldName: string, order: 'asc' | 'desc' | undefined): void => {
    setCurrentSorter({
      fieldName,
      order,
    })
  }

  const paginatedConfig = {
    ...config,
    params: {
      ...filters,
      sort: getApiSorter(currentSorter?.fieldName, currentSorter?.order),
      perPage,
      page,
    },
  }

  const {
    doThrottledFetch: doFetch,
    retry,
    response,
    loading,
    error,
  } = useFetch(url, paginatedConfig)

  useEffect(() => {
    setPage(initialPage)
  }, [initialPage, filters, perPage])

  useEffect(() => {
    if (doFetch) {
      void doFetch()
    }
  }, [doFetch])

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    doFetch,
    retry,
    response,
    sorter: currentSorter,
    setSorter,
    paginator: {
      lastPage: response?.meta?.lastPage || 0,
      displayResultsMessage: t('showingResults', {
        from: response?.meta?.from,
        to: response?.meta?.to,
        total: response?.meta?.total,
      }),
      page: response?.meta?.currentPage || page,
      perPage: response?.meta?.perPage || initialPerPage,
      setPage,
      setPerPage,
    },
    loading,
    error,
  }
}

export default usePaginatedFetch
