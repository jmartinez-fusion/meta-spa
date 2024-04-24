import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { PROJECTS, PROJECTS_CREATE } from 'utils/constants'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import ProjectCreationForm from 'Projects/components/ProjectForm/ProjectForm'
import useProjectCreation from 'Projects/hooks/useProjectCreation'

export default function ProjectCreation(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const { onSubmit, isSubmitting } = useProjectCreation()
  const itemsBreadcrumbs = [
    {
      title: t('projects'),
      path: PROJECTS,
      active: false,
    },
    {
      title: t('create.title'),
      path: PROJECTS_CREATE,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('singular')} goBackPath={PROJECTS} />
      <Typography variant="h2">{t('create.title')}</Typography>
      <ContentBox>
        <FormBox>
          <Typography variant="h3">{t('create.client')}</Typography>
          <ProjectCreationForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </FormBox>
      </ContentBox>
    </div>
  )
}
