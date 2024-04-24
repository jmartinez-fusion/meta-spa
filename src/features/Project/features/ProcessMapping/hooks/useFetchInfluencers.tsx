import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import { type Influencer } from 'Project/features/ProcessMapping/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { influencersFromApi } from 'Project/features/ProcessMapping/transformers'

interface UseFetchInfluencersProps {
  filters: Filters
}

interface UseFetchInfluencersReturn {
  influencers: Influencer[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchInfluencers = ({ filters }: UseFetchInfluencersProps): UseFetchInfluencersReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [influencers, setInfluencerss] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/influencers`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const influencers = response.data.map((influencer: Influencer[]) =>
      influencersFromApi(influencer)
    )
    setInfluencerss(influencers)
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
    influencers,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchInfluencers
