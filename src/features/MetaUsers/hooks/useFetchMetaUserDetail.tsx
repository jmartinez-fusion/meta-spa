import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { metaUserFromApi } from 'MetaUsers/transformers'
import { type MetaUser } from 'MetaUsers/types'

interface UseFetchMetaUserDetailProps {
  id?: string
  transformer: (data: any, t: any) => any
}

interface UseFetchMetaUserDetailReturn {
  metaUser?: any
  loading: boolean
  error: RequestError
}

const useFetchMetaUserDetail = ({
  id,
  transformer,
}: UseFetchMetaUserDetailProps): UseFetchMetaUserDetailReturn => {
  const [metaUser, setMetaUser] = useState<MetaUser | null>(null)
  const { t } = useTranslation('common')
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msAuth.baseUrl}/meta-users/${id}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setMetaUser(metaUserFromApi(response.data))
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

  const isLoading = useMemo(() => loading || metaUser === undefined, [loading, metaUser])

  return { metaUser, loading: isLoading, error }
}

export default useFetchMetaUserDetail
