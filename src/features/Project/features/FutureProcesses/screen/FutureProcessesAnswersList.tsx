import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import useProject from 'Project/hooks/useProject'
import AnswersList from 'Project/features/Answers/screen/AnswersList'

const CurrentProcessesAnswersList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()

  const futureStatePath = FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: futureStatePath,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('answers.listing.title')} />
      <AnswersList module="future_state_process" />
    </div>
  )
}

export default CurrentProcessesAnswersList
