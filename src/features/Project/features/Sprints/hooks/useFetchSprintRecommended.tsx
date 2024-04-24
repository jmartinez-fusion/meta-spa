import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { type Sprint } from 'Project/features/Sprints/types'
import { sprintFromApi } from 'Project/features/Sprints/transformers'
import useProject from 'Project/hooks/useProject.ts'

interface UseFetchSprintRecommendedProps {
  transformer: (data: any, t: any) => any
}

interface UseFetchSprintRecommendedReturn {
  sprint?: Sprint
  loading: boolean
  error: RequestError
}

const useFetchSprintRecommended = ({
  transformer,
}: UseFetchSprintRecommendedProps): UseFetchSprintRecommendedReturn => {
  const [sprint, setSprint] = useState<Sprint | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/sprints/recommended`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return
    if (!response.data) return
    setSprint(sprintFromApi(response.data))
  }, [response, transformer, t])

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

  const isLoading = useMemo(() => loading || sprint === undefined, [loading, sprint])

  return { sprint, loading: isLoading, error }
}

export default useFetchSprintRecommended
