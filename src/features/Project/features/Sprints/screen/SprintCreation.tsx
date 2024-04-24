import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import FormBox from 'components/FormBox'
import ContentBox from 'components/ContentBox'
import SprintForm from 'Project/features/Sprints/components/SprintForm/SprintForm.tsx'
import useProject from 'Project/hooks/useProject.ts'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'
import useSprintCreation from 'Project/features/Sprints/hooks/useSprintCreation.tsx'

export default function SprintCreation(): ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Sprints' })
  const { onSubmit, isSubmitting } = useSprintCreation()
  const { project } = useProject()

  const itemsBreadcrumbs = [
    {
      title: i18n.t('features:Project.menu.futureState'),
      path: SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: false,
    },
    {
      title: t('listing.title'),
      path: SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        goBackPath={SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? '')}
      />
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <SprintForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}
