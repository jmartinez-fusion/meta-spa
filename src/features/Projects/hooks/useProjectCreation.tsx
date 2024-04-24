import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { PROJECTS } from 'utils/constants'

interface UseProjectCreationReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useProjectCreation = (): UseProjectCreationReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/projects`,
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

    navigate(PROJECTS)

    const message = t('createdSuccessfully', {
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

  return { onSubmit, isSubmitting: loading }
}

export default useProjectCreation
