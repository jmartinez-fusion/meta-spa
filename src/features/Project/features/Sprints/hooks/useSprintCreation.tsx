import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import useProject from 'Project/hooks/useProject.ts'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'

interface UseSprintCreationReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useSprintCreation = (): UseSprintCreationReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/sprints`,
    {
      method: 'POST',
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

    navigate(SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? ''))

    const message = t('createdSuccessfully', {
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

  return { onSubmit, isSubmitting: loading }
}

export default useSprintCreation
