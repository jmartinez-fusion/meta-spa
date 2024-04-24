import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import { type SPC, type SPCFromApi } from 'Project/features/ProcessSelection/types'
import { spcFromApi } from 'Project/features/ProcessSelection/transformers'

interface UseFetchSPCes {
  SPCs?: SPC[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchSPCes = (): UseFetchSPCes => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [SPCs, setSPCs] = useState<SPC[] | undefined>(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProjects.baseUrl}/spcs`
  )

  useEffect(() => {
    if (!response) return

    const SPCs = response.data.map((SPC: SPCFromApi) => spcFromApi(SPC))

    setSPCs(SPCs)
  }, [response?.data, t])

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
        />
      ),
    })
  }, [error, t])

  useEffect(() => {
    void doFetch()
  }, [])

  return { SPCs, loading, error, refresh: retry }
}

export default useFetchSPCes
