import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import { META_USERS } from 'utils/constants'

interface UseMetaUserCreationReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useMetaUserCreation = (): UseMetaUserCreationReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msAuth.baseUrl}/meta-users`,
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

    navigate(META_USERS)

    const message = t('createdSuccessfully', {
      name: response.data.email,
      type: t('features:MetaUsers:singular'),
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

export default useMetaUserCreation
