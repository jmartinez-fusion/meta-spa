import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type MetaUser } from 'MetaUsers/types'
import config from 'config'
import useFetch from 'hooks/useFetch'
import { META_USERS } from 'utils/constants'
import { metaUserFromApi } from 'MetaUsers/transformers'
import useFetchMetaUserDetail from './useFetchMetaUserDetail'

interface UseMetaUserEditionReturn {
  onSubmit: (data: any) => void
  loading: boolean
  metaUser?: MetaUser
  isSubmitting: boolean
}

const useMetaUserEdition = (): UseMetaUserEditionReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { metaUser, loading } = useFetchMetaUserDetail({
    id,
    transformer: metaUserFromApi,
  })
  const {
    response,
    doFetch,
    retry,
    error,
    loading: isSubmitting,
  } = useFetch(`${config.api.msAuth.baseUrl}/meta-users/${id}`, {
    method: 'PATCH',
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

    navigate(META_USERS)

    const message = t('editedSuccessfully', {
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

  return { onSubmit, loading, metaUser, isSubmitting }
}

export default useMetaUserEdition
