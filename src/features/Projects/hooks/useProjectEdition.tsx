import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type Project } from 'src/features/Projects/types'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { PROJECTS } from 'utils/constants'
import useFetchProjectDetail from './useFetchProjectDetail'

interface UseProjectEditionReturn {
  onSubmit: (data: any) => void
  loading: boolean
  project?: Project
  isSubmitting: boolean
}

const useProjectEdition = (): UseProjectEditionReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { project, loading } = useFetchProjectDetail({
    id,
  })
  const {
    response,
    doFetch,
    retry,
    error,
    loading: isSubmitting,
  } = useFetch(`${config.api.msProjects.baseUrl}/projects/${id}`, {
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

    navigate(PROJECTS)

    const message = t('editedSuccessfully', {
      name: response.data.name,
      type: t('features:Projects:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

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

  return { onSubmit, loading, project, isSubmitting }
}

export default useProjectEdition
