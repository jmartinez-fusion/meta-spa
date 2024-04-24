import { type FC } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import FormBox from 'components/FormBox'
import ContentBox from 'components/ContentBox'
import useProject from 'features/Project/hooks/useProject'
import CurrentProcessForm from 'Project/features/CurrentProcesses/components/CurrentProcessForm'
import { CURRENT_PROCESSES_PATHS } from '../routes'
import { useParams } from 'react-router-dom'
import useFetchCurrentProcessDetail from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcessDetail.tsx'
import { currentProcessToFormValues } from 'Project/features/CurrentProcesses/transformers'
import useCurrentProcessCreation from 'Project/features/CurrentProcesses/hooks/useCurrentProcessCreation.tsx'

const CurrentProcessClone: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { currentProcessId } = useParams()
  const { currentProcess } = useFetchCurrentProcessDetail({ id: currentProcessId })
  const currentProcessFormValues = currentProcess && currentProcessToFormValues(currentProcess)
  const { onSubmit, isSubmitting } = useCurrentProcessCreation(currentProcessId ?? '')
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
      <Typography variant="h2">{t('clone.title')}</Typography>
      <ContentBox>
        <FormBox>
          <CurrentProcessForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            mode="clone"
            initialValues={currentProcessFormValues}
          />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default CurrentProcessClone
