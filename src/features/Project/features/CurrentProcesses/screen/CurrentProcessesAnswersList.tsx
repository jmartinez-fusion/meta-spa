import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes'

import AnswersList from 'Project/features/Answers/screen/AnswersList'

const CurrentProcessesAnswersList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()
  const { surveyId } = useParams()

  const currentProcessesPathList = CURRENT_PROCESSES_PATHS.ANSWERS.replace(
    ':projectId',
    project?.id ?? ''
  ).replace(':surveyId', surveyId ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: currentProcessesPathList,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('answers.listing.title')} />
      <AnswersList module="current_state_process" />
    </div>
  )
}

export default CurrentProcessesAnswersList
