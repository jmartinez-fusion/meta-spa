import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject.ts'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'
import FutureProcessesInfo from 'Project/features/FutureProcesses/components/FutureProcessesInfo/FutureProcessesInfo.tsx'
import PresentationTool from 'Project/features/PresentationTool/screens/PresentationTool/PresentationTool.tsx'
import useFetchFutureProcessPresentation from 'Project/features/FutureProcesses/hooks/useFetchFutureProcessPresentation.tsx'
import LoadingRing from 'components/LoadingRing'
import { useParams } from 'react-router-dom'
import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'
import useSaveFutureProcessPresentation from 'Project/features/FutureProcesses/hooks/useSaveFutureProcessPresentation.tsx'
import useFetchFutureProcessDetail from 'Project/features/FutureProcesses/hooks/useFetchFutureProcessDetail.tsx'
import { futureProcessFromApi } from 'Project/features/FutureProcesses/transformers'

const FutureProcessesPresentation: FC<{ mode?: 'view' | 'edit' }> = ({ mode = 'edit' }) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()
  const { futureProcessId } = useParams()
  const { effectiveProcessId, futureProcessSteps, loading, refresh } =
    useFetchFutureProcessPresentation(futureProcessId)
  const { futureProcess } = useFetchFutureProcessDetail({
    id: futureProcessId,
    transformer: futureProcessFromApi,
  })
  const { save: savePresentation, loading: loadingSave } = useSaveFutureProcessPresentation(
    futureProcessId,
    refresh
  )
  const handleSave = useCallback((steps: AllowedPresentationStep[]) => {
    savePresentation(steps)
  }, [])

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        goBackPath={FUTURE_PROCESSES_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
          ':futureProcessId',
          futureProcessId ?? ''
        )}
      />
      <div>
        <FutureProcessesInfo futureProcess={futureProcess ?? undefined} />
      </div>
      {loading && futureProcessSteps?.length === 0 ? (
        <LoadingRing center small />
      ) : (
        <PresentationTool
          processId={futureProcessId ?? ''}
          module="future_state_process"
          initialData={futureProcessSteps}
          onSave={handleSave}
          mode={mode}
          isSaving={loadingSave}
          effectiveProcessId={effectiveProcessId}
        />
      )}
    </div>
  )
}

export default FutureProcessesPresentation
