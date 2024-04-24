import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ProjectsTable from 'src/features/Projects/components/ProjectsTable'
import { useNavigate } from 'react-router-dom'
import useFetchProjects from 'src/features/Projects/hooks/useFetchProjects.tsx'
import useFilters from 'src/hooks/useFilters.js'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import ProjectsFilters from 'src/features/Projects/components/ProjectFilters'
import { type Project } from 'src/features/Projects/types'
import dateFormat from 'src/utils/dateFormat.ts'
import useRemoveProject from 'src/features/Projects/hooks/useRemoveProject.tsx'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { PROJECTS } from 'src/utils/constants.ts'
import Gated from 'components/Gated'
import { CREATE_PROJECT } from 'src/permissions.ts'
import { PROCESSES_PATHS } from 'Project/features/ProcessSelection/routes.tsx'

const ProjectsList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const { onCancel, onApply, filters } = useFilters()
  const { projects, paginator, sorter, refresh, setSorter, loading } = useFetchProjects({ filters })
  const { onClickOpenConfirm } = useRemoveProject(refresh)
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('projects'),
      path: PROJECTS,
      active: true,
    },
  ]

  const columns = useMemo(
    () => [
      { header: t('fields.name.label'), fieldName: 'name', sortable: true },
      {
        header: t('fields.client.label'),
        fieldName: 'client',
        sortable: true,
        dataModifier: (project: Project): string => project.client.name,
      },
      { header: t('fields.industries.label'), fieldName: 'industry', sortable: true },
      {
        header: t('fields.startDate'),
        fieldName: 'startDate',
        sortable: true,
        dataModifier: (project: Project): string => dateFormat(project.startDate),
      },
      {
        header: t('fields.dueDate'),
        fieldName: 'dueDate',
        sortable: true,
        dataModifier: (project: Project): string => dateFormat(project.dueDate),
      },
      {
        header: t('fields.createdAt'),
        fieldName: 'createdAt',
        sortable: true,
        dataModifier: (project: Project): string => dateFormat(project.createdAt),
      },
    ],
    [t]
  )

  const handleClickView = useCallback(
    ({ id }: { id: string }) => {
      navigate(`details/${id}`)
    },
    [navigate]
  )

  const handleClickConfigurations = useCallback(
    ({ id }: { id: string }) => {
      navigate(`settings/${id}`)
    },
    [navigate]
  )

  const handleClickAdd = useCallback(() => {
    navigate(`create`)
  }, [navigate])

  const handleGoToProject = useCallback(
    ({ id }: { id: string }) => {
      navigate(PROCESSES_PATHS.LIST.replace(':projectId', id))
    },
    [navigate]
  )

  const handleClickEdit = useCallback(
    ({ id }: { id: string }) => {
      navigate(`edit/${id}`)
    },
    [navigate]
  )

  const handleClickProjectRoles = useCallback(
    ({ id }: { id: string }) => {
      navigate(`project-roles/${id}`)
    },
    [navigate]
  )

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('projects')}
        rightContent={
          <Gated permissions={CREATE_PROJECT}>
            <Button onClick={handleClickAdd} endIcon={<Add />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <ContentBox>
        <ProjectsFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
        <ProjectsTable
          columns={columns}
          rows={projects}
          loading={loading}
          onClickView={handleClickView}
          onClickRemove={onClickOpenConfirm}
          onClickGoToProject={handleGoToProject}
          onSort={setSorter}
          onClickEdit={handleClickEdit}
          onClickConfigurations={handleClickConfigurations}
          count={lastPage}
          page={page}
          onClickProjectRoles={handleClickProjectRoles}
          sorter={sorter}
          onPageChange={setPage}
          displayResultsMessage={displayResultsMessage}
          perPage={perPage}
          onRowsPerPageChange={setPerPage}
        />
      </ContentBox>
    </div>
  )
}

export default ProjectsList
