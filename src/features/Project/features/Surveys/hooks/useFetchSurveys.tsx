import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import useProject from 'Project/hooks/useProject.ts'
import { type Survey, type SurveyFromApi } from 'Project/features/Surveys/types'
import { surveyFromApi } from 'Project/features/Surveys/transformers'

interface UseFetchSprintsProps {
  filters: Filters
}

interface UseFetchSprintsReturn {
  surveys: Survey[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchSurveys = ({ filters }: UseFetchSprintsProps): UseFetchSprintsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [surveys, setSurveys] = useState(null)
  const { project } = useProject()
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const surveys = response.data.map((survey: SurveyFromApi) => surveyFromApi(survey))

    setSurveys(surveys)
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

  return { surveys, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchSurveys
