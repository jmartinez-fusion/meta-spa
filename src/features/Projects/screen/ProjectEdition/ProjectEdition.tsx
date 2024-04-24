import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PROJECTS, PROJECTS_CREATE } from 'utils/constants'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { projectToInitialValues } from 'Projects/transformers'
import ProjectForm from 'Projects/components/ProjectForm/ProjectForm'
import useProjectEdition from 'Projects/hooks/useProjectEdition'

export default function ProjectEdition(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const { onSubmit, isSubmitting, project } = useProjectEdition()
  const itemsBreadcrumbs = [
    {
      title: t('projects'),
      path: PROJECTS,
      active: false,
    },
    {
      title: t('projects'),
      path: PROJECTS_CREATE,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('singular')} goBackPath={PROJECTS} />
      <Typography variant="h2">{t('edit.title')}</Typography>
      <ContentBox>
        <FormBox>
          <Typography variant="h3">{t('edit.client')}</Typography>
          {project && (
            <ProjectForm
              initialValues={projectToInitialValues(project)}
              mode="edit"
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </FormBox>
      </ContentBox>
    </div>
  )
}
