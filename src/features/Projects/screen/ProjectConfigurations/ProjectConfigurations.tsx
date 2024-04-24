import { type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from 'utils/constants.ts'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import useFetchProjectDetail from 'Projects/hooks/useFetchProjectDetail.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingRing from 'components/LoadingRing'
import { PROJECTS_PATHS } from 'Projects/routes.tsx'
import ProjectConfigurationsForm from 'Projects/screen/ProjectConfigurations/components/ProjectConfigurationsForm/ProjectConfigurationsForm.tsx'
import FormBox from 'components/FormBox'
import useFetchProjectConfigurations from 'Projects/hooks/useFetchProjectConfigurations.tsx'
import useSaveProjectConfigurations from 'Projects/hooks/useSaveProjectConfigurations.tsx'
export default function ProjectConfigurations(): ReactNode {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Projects.projectConfigurations' })
  const { id } = useParams()
  const { project, loading: loadingProject, error: projectError } = useFetchProjectDetail({ id })
  const { projectConfigurations, loading: loadingConfigurations } = useFetchProjectConfigurations({
    id,
  })
  const { save, loading: isSubmitting } = useSaveProjectConfigurations(id)

  const itemsBreadcrumbs = [
    {
      title: i18n.t('features:Projects.listing.title'),
      path: PROJECTS,
      active: false,
    },
    {
      title: i18n.t('features:Projects.projectConfigurations.title'),
      path: PROJECTS_PATHS.ROLES.replace(':id', id ?? ''),
      active: true,
    },
  ]

  if (projectError) {
    navigate('/410')
  }

  if (loadingProject || loadingConfigurations) {
    return <LoadingRing center small />
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={project?.name} goBackPath={PROJECTS} />
      <Typography variant="h2">{t('title')}</Typography>
      <ContentBox>
        <Typography variant="h3">{t('connection')}</Typography>
        <FormBox>
          <ProjectConfigurationsForm
            onSubmit={save}
            isSubmitting={isSubmitting}
            initialValues={projectConfigurations}
          />
        </FormBox>
      </ContentBox>
    </div>
  )
}
