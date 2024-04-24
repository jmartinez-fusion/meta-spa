import { type FC } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import FormBox from 'components/FormBox'
import ContentBox from 'components/ContentBox'
import useProject from 'features/Project/hooks/useProject'
import CurrentProcessForm from 'Project/features/CurrentProcesses/components/CurrentProcessForm'
import useCurrentProcessCreation from 'Project/features/CurrentProcesses/hooks/useCurrentProcessCreation'
import { CURRENT_PROCESSES_PATHS } from '../routes'

const CurrentProcessesCreate: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { onSubmit, isSubmitting } = useCurrentProcessCreation()
  const { project } = useProject()
  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('singular')}
        goBackPath={CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')}
      />
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <CurrentProcessForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default CurrentProcessesCreate
