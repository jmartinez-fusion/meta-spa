import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useProject from 'Project/hooks/useProject'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import SurveyAnswer from 'Project/features/Surveys/screen/SurveyAnswer/SurveyAnswer.tsx'
import PrivateScreenTitle from 'components/PrivateScreenTitle'

const CurrentProcessesSurveyEdition: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()

  const currentStatePath = CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')
  const surveysListPath = CURRENT_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: currentStatePath,
      active: false,
    },
    {
      title: t('surveys.listing.title'),
      path: surveysListPath,
      active: false,
    },
    {
      title: t('surveys.answer.title'),
      path: surveysListPath,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('surveys.answer.title')} goBackPath={surveysListPath} />
      <SurveyAnswer module="current_state_process" goBackPath={currentStatePath} />
    </div>
  )
}

export default CurrentProcessesSurveyEdition
