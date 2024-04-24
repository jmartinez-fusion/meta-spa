import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useProject from 'Project/hooks/useProject'
import SurveyAnswer from 'Project/features/Surveys/screen/SurveyAnswer/SurveyAnswer.tsx'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'

const CurrentProcessesSurveyEdition: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()

  const futureStatePath = FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')
  const surveysListPath = FUTURE_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: futureStatePath,
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
      <SurveyAnswer module="future_state_process" goBackPath={futureStatePath} />
    </div>
  )
}

export default CurrentProcessesSurveyEdition
