import { type ReactNode, useCallback } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from 'utils/constants.ts'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import FormBox from 'components/FormBox'
import useFetchProjectDetail from 'Projects/hooks/useFetchProjectDetail.tsx'
import { useParams } from 'react-router-dom'
import LoadingRing from 'components/LoadingRing'
import { PROJECTS_PATHS } from 'Projects/routes.tsx'
import AssignUsersForm from 'Projects/screen/ProjectRoles/components/AssignUsersForm'
import useFetchProjectUsers from 'Projects/hooks/useFetchProjectUsers.tsx'
import AssignedUser from 'Projects/screen/ProjectRoles/components/AssignedUser'
import styles from './projectRoles.module.scss'
import useRemoveAssignedUser from 'Projects/hooks/useRemoveAssignedUser.tsx'
import useAssignUser from 'Projects/hooks/useAssignUser.tsx'
import useAssignUserRole from 'Projects/hooks/useAssignUserRole.tsx'
import useFetchProjectRoles from 'Projects/hooks/useFetchProjectRoles.tsx'
export default function ProjectRoles(): ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Projects.projectRoles' })
  const { id } = useParams()
  const { project, loading: loadingProject } = useFetchProjectDetail({ id })
  const { projectUsers, loading: isLoadingUsers, refresh } = useFetchProjectUsers({ id })
  const { onClickOpenConfirm, loading: loadingRemove } = useRemoveAssignedUser(refresh)
  const { assignUser, loading: loadingAssignUser } = useAssignUser(refresh)
  const { assignUserRole } = useAssignUserRole(refresh)
  const { projectRoles } = useFetchProjectRoles()

  const handleRemoveAssignedUser = useCallback(
    (userId: string) => {
      onClickOpenConfirm(id ?? '', userId)
    },
    [onClickOpenConfirm, id]
  )

  const handleAssignUser = useCallback(
    (userId: string) => {
      assignUser(id ?? '', userId)
    },
    [assignUser, id]
  )

  const handleAssignUserRole = useCallback(
    (userId: string, projectRole: string) => {
      assignUserRole(id ?? '', userId, projectRole)
    },
    [assignUserRole, id]
  )

  const itemsBreadcrumbs = [
    {
      title: i18n.t('features:Projects.listing.title'),
      path: PROJECTS,
      active: false,
    },
    {
      title: i18n.t('features:Projects.projectRoles.title'),
      path: PROJECTS_PATHS.ROLES.replace(':id', id ?? ''),
      active: true,
    },
  ]

  if (loadingProject || isLoadingUsers || loadingRemove) {
    return <LoadingRing center small />
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={project?.name} goBackPath={PROJECTS} />
      <Typography variant="h2">{t('title')}</Typography>
      <ContentBox>
        <FormBox>
          <Typography variant="h3">{t('users')}</Typography>
          <div className={styles.assignUsersContainer}>
            <AssignUsersForm
              onSubmit={(data) => {
                if (data.user) {
                  handleAssignUser(data.user)
                }
              }}
              options={projectUsers?.unselected}
              isSubmitting={loadingAssignUser}
            />
          </div>
          {projectUsers?.selected && projectUsers?.selected?.length > 0 && (
            <div className={styles.assignedUsersContainer}>
              <Typography variant="h3">{t('projectRole')}</Typography>
              <div className={styles.usersList}>
                {projectUsers?.selected.map((selected) => (
                  <AssignedUser
                    key={selected.id}
                    projectUser={selected}
                    roleOptions={projectRoles ?? []}
                    onChangeRole={(projectRole) => {
                      handleAssignUserRole(selected.id, projectRole)
                    }}
                    handleRemove={() => {
                      handleRemoveAssignedUser(selected.id)
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </FormBox>
      </ContentBox>
    </div>
  )
}
