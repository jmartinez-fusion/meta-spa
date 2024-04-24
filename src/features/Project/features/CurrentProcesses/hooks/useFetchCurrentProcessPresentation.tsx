import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useProject from 'Project/hooks/useProject'
import {
  type AllowedPresentationStep,
  type AllowedPresentationStepFromJson,
} from 'Project/features/PresentationTool/types'
import PresentationType from 'Project/features/PresentationTool/types/PresentationType.ts'

interface useFetchCurrentProcessPresentationProps {
  currentProcessSteps?: AllowedPresentationStep[]
  effectiveProcessId: string | undefined
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchCurrentProcessPresentation = (
  id: string = ''
): useFetchCurrentProcessPresentationProps => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [effectiveProcessId, setEffectiveProcessId] = useState<string | undefined>(undefined)
  const [currentProcessSteps, setCurrentProcessSteps] = useState<
    AllowedPresentationStep[] | undefined
  >(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-process-presentations/${id}`
  )

  useEffect(() => {
    if (!response) return

    const currentProcessSteps = response.data.steps.map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (step: AllowedPresentationStepFromJson) => PresentationType[step.type]?.(step)
    )

    setEffectiveProcessId(response.data.effectiveId)
    setCurrentProcessSteps(currentProcessSteps)
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

  return { effectiveProcessId, currentProcessSteps, loading, error, refresh: retry }
}

export default useFetchCurrentProcessPresentation
