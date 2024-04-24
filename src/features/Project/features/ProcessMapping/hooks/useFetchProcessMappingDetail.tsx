import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { type ProcessMappingDetail } from 'Project/features/ProcessMapping/types'
import { processMappingDetailFromApi } from 'Project/features/ProcessMapping/transformers'
import useProject from 'features/Project/hooks/useProject'

interface UseFetchProcessMappingDetailProps {
  id?: string | null
  transformer: (data: any, t: any) => any
}

interface UseFetchProcessMappingDetailReturn {
  processMapping?: ProcessMappingDetail
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchProcessMappingDetail = ({
  id,
  transformer,
}: UseFetchProcessMappingDetailProps): UseFetchProcessMappingDetailReturn => {
  const [processMapping, setProcessMapping] = useState<ProcessMappingDetail | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/process-mappings/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setProcessMapping(undefined)
    void doFetch()
  }, [setProcessMapping])

  useEffect(() => {
    if (!response) return

    setProcessMapping(processMappingDetailFromApi(response.data))
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

  const isLoading = useMemo(
    () => loading || processMapping === undefined,
    [loading, processMapping]
  )

  return { processMapping, loading: isLoading, error, refresh }
}

export default useFetchProcessMappingDetail
