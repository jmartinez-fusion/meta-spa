import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { type InfluencerDetail } from 'Project/features/ProcessMapping/types'
import { influencerDetailFromApi } from 'Project/features/ProcessMapping/transformers'
import useProject from 'features/Project/hooks/useProject'

interface UseFetchInfluencerDetailProps {
  id?: string | null
  transformer: (data: any, t: any) => any
}

interface UseFetchInfluencerDetailReturn {
  influencer?: InfluencerDetail | null
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchInfluencerDetail = ({
  id,
  transformer,
}: UseFetchInfluencerDetailProps): UseFetchInfluencerDetailReturn => {
  const [influencer, setInfluencer] = useState<InfluencerDetail | null>(null)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/influencers/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setInfluencer(null)
    void doFetch()
  }, [setInfluencer])

  useEffect(() => {
    if (!response) return

    setInfluencer(influencerDetailFromApi(response.data))
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

  const isLoading = useMemo(() => loading || influencer === undefined, [loading, influencer])

  return { influencer, loading: isLoading, error, refresh }
}

export default useFetchInfluencerDetail
