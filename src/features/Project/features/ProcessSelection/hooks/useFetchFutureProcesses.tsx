import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import {
  type FutureProcess,
  type FutureProcessFromApi,
} from 'Project/features/ProcessSelection/types'
import { futureProcessFromApi } from 'Project/features/ProcessSelection/transformers'
import useProject from 'Project/hooks/useProject.ts'

interface UseFetchFutureProcesses {
  futureProcesses?: FutureProcess[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchFutureProcesses = (): UseFetchFutureProcesses => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [futureProcesses, setFutureProcesses] = useState<FutureProcess[] | undefined>(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProjects.baseUrl}/project-future-processes/${project?.id}`
  )

  useEffect(() => {
    if (!response) return

    const futureProcesses = response.data.map((futureProcess: FutureProcessFromApi) =>
      futureProcessFromApi(futureProcess)
    )

    setFutureProcesses(futureProcesses)
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
    if (project?.id) {
      void doFetch()
    }
  }, [project])

  return { futureProcesses, loading, error, refresh: retry }
}

export default useFetchFutureProcesses
