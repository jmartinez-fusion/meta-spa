import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import {
  type Stakeholder,
  type StakeholderFromApi,
} from 'Project/features/Structure/features/Stakeholders/types'
import { stakeholderFromApi } from 'Project/features/Structure/features/Stakeholders/transformers'

interface UseFetchPositionsProps {
  filters: Filters
}

interface UseFetchPositionsReturn {
  stakeholders?: Stakeholder[]
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchStakeholders = ({ filters }: UseFetchPositionsProps): UseFetchPositionsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [stakeholders, setStakeholders] = useState<Stakeholder[] | undefined>(undefined)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/stakeholders`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const stakeholders = response.data.map((stakeholder: StakeholderFromApi) =>
      stakeholderFromApi(stakeholder)
    )
    setStakeholders(stakeholders)
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
    stakeholders,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchStakeholders
