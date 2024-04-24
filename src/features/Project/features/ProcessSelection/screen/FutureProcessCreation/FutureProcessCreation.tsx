import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Typography } from '@mui/material'
import FormBox from 'components/FormBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { PROCESSES_PATHS } from 'Project/features/ProcessSelection/routes.tsx'
import useProject from 'Project/hooks/useProject.ts'
import FutureProcessForm from 'Project/features/ProcessSelection/components/FutureProcessForm'
import useFutureProcessCreation from 'Project/features/ProcessSelection/hooks/useFutureProcessCreation.tsx'

const FutureProcessCreation: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessSelection' })
  const { project } = useProject()
  const goBackPath = PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')
  const { onSubmit, isSubmitting } = useFutureProcessCreation()

  const itemsBreadcrumbs = [
    {
      title: t('configuration'),
      path: goBackPath,
      active: false,
    },
    {
      title: t('create.title'),
      path: PROCESSES_PATHS.CREATE.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('listing.title')} goBackPath={goBackPath} />
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <FutureProcessForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}

export default FutureProcessCreation
