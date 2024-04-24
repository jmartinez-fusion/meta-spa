import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'
import useSprintEdition from 'Project/features/Sprints/hooks/useSprintEdition.tsx'
import SprintForm from 'Project/features/Sprints/components/SprintForm/SprintForm.tsx'
import useProject from 'Project/hooks/useProject.ts'
import { sprintToFormValues } from 'Project/features/Sprints/transformers'

export default function SprintDetails(): ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Sprints' })
  const { onSubmit, isSubmitting, sprint } = useSprintEdition()
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
        title={t('singular')}
        goBackPath={SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? '')}
      />
      <Typography variant="h2">{t('details.title')}</Typography>
      <ContentBox>
        <FormBox>
          {sprint && (
            <SprintForm
              initialValues={sprintToFormValues(sprint)}
              mode="view"
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </FormBox>
      </ContentBox>
    </div>
  )
}
