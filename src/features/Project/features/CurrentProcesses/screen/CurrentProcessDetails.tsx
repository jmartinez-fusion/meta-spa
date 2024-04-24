import { type FC, useCallback } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import FormBox from 'components/FormBox'
import ContentBox from 'components/ContentBox'
import useProject from 'features/Project/hooks/useProject'
import CurrentProcessForm from 'Project/features/CurrentProcesses/components/CurrentProcessForm'
import { CURRENT_PROCESSES_PATHS } from '../routes'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchCurrentProcessDetail from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcessDetail.tsx'
import { currentProcessToFormValues } from 'Project/features/CurrentProcesses/transformers'

const CurrentProcessDetails: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { currentProcessId } = useParams()
  const { currentProcess } = useFetchCurrentProcessDetail({ id: currentProcessId })
  const navigate = useNavigate()
  const currentProcessFormValues = currentProcess && currentProcessToFormValues(currentProcess)
  const { project } = useProject()

  const onSubmit = useCallback(() => {
    navigate(
      CURRENT_PROCESSES_PATHS.VIEW_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
        ':currentProcessId',
        currentProcessId ?? ''
      )
    )
  }, [navigate, currentProcessId])

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
      <Typography variant="h2">{t('details.title')}</Typography>
      <ContentBox>
        <FormBox>
          <CurrentProcessForm
            onSubmit={onSubmit}
            mode="details"
            initialValues={currentProcessFormValues}
          />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default CurrentProcessDetails
