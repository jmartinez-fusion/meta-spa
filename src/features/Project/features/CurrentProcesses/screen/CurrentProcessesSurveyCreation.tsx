import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useProject from 'Project/hooks/useProject'
import SurveyCreation from 'Project/features/Surveys/screen/SurveyCreation/SurveyCreation.tsx'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'

const CurrentProcessesSurveyCreation: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()

  const currentStatePath = CURRENT_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: currentStatePath,
      active: false,
    },
    {
      title: t('surveys.create.title'),
      path: currentStatePath,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <SurveyCreation module="current_state_process" goBackPath={currentStatePath} />
    </div>
  )
}

export default CurrentProcessesSurveyCreation
