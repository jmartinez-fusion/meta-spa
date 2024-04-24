import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import useProject from 'features/Project/hooks/useProject'
import config from 'src/config.tsx'
import { type StakeholderDetail } from 'Project/features/Structure/features/Stakeholders/types'
import { stakeholderDetailFromApi } from 'Project/features/Structure/features/Stakeholders/transformers'

interface UseFetchStakeholderDetailProps {
  id?: string | null
}

interface UseFetchStakeholderDetailReturn {
  stakeholder?: StakeholderDetail
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchStakeholderDetail = ({
  id,
}: UseFetchStakeholderDetailProps): UseFetchStakeholderDetailReturn => {
  const [stakeholder, setStakeholder] = useState<StakeholderDetail | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/stakeholders/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setStakeholder(undefined)
    void doFetch()
  }, [setStakeholder])

  useEffect(() => {
    if (!response) return

    setStakeholder(stakeholderDetailFromApi(response.data))
  }, [response, t])

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

  const isLoading = useMemo(() => loading || stakeholder === undefined, [loading, stakeholder])

  return { stakeholder, loading: isLoading, error, refresh }
}

export default useFetchStakeholderDetail
