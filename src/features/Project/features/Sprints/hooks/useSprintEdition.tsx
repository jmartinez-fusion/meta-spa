import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type Sprint } from 'Project/features/Sprints/types'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { sprintFromApi } from 'Project/features/Sprints/transformers'
import useFetchSprintDetail from './useFetchSprintDetail.tsx'
import useProject from 'Project/hooks/useProject.ts'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'

interface UseSprintEditionReturn {
  onSubmit: (data: any) => void
  loading: boolean
  sprint?: Sprint
  isSubmitting: boolean
}

const useSprintEdition = (): UseSprintEditionReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { project } = useProject()
  const { sprint, loading } = useFetchSprintDetail({
    id,
    transformer: sprintFromApi,
  })
  const {
    response,
    doFetch,
    retry,
    error,
    loading: isSubmitting,
  } = useFetch(`${config.api.msOrganization.baseUrl}/projects/${project?.id}/sprints/${id}`, {
    method: 'PUT',
  })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ data })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    navigate(SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? ''))

    const message = t('editedSuccessfully', {
      name: response.data.email,
      type: t('features:Sprints:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar, project])

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

  return { onSubmit, loading, sprint, isSubmitting }
}

export default useSprintEdition
