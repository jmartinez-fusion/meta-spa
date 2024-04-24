import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useProject from 'Project/hooks/useProject'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import SurveyEdition from 'Project/features/Surveys/screen/SurveyEdition.tsx'

const CurrentProcessesSurveyEdition: FC = () => {
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
      title: t('surveys.edit.title'),
      path: currentStatePath,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <SurveyEdition module="current_state_process" goBackPath={currentStatePath} />
    </div>
  )
}

export default CurrentProcessesSurveyEdition
