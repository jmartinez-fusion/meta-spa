import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'src/hooks/useFetch'
import config from 'src/config'
import { useNavigate } from 'react-router-dom'
import { type FutureProcessToApi } from 'Project/features/ProcessSelection/types'
import { PROCESSES_PATHS } from 'Project/features/ProcessSelection/routes.tsx'
import useProject from 'Project/hooks/useProject.ts'

interface FutureProcessCreationResponse {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useFutureProcessCreation = (): FutureProcessCreationResponse => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const goBackPath = PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')
  const [futureProcessToApi, setFutureProcessToApi] = useState<FutureProcessToApi | undefined>(
    undefined
  )
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/project-future-processes`,
    {
      method: 'POST',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ data: { ...data, projectId: project?.id } })
      setFutureProcessToApi(data)
    },
    [doFetch, project]
  )

  useEffect(() => {
    if (!response) return

    navigate(goBackPath)

    const message = t('createdSuccessfully', {
      name: futureProcessToApi?.name,
      type: t('features:ProcessSelection:futureProcess'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, goBackPath, t, futureProcessToApi, navigate, enqueueSnackbar])

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
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSubmit, isSubmitting: loading }
}

export default useFutureProcessCreation
