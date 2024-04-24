import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import dateFormat from 'utils/dateFormat.ts'
import useFilters from 'hooks/useFilters.js'
import SprintsTable from 'Project/features/Sprints/components/SprintsTable'
import useFetchSprints from 'Project/features/Sprints/hooks/useFetchSprints'
import SprintsFilters from 'Project/features/Sprints/components/SprintsFilters'
import useRemoveSprint from 'Project/features/Sprints/hooks/useRemoveSprint'
import { type Sprint } from 'Project/features/Sprints/types'
import useProject from 'Project/hooks/useProject.ts'
import { SPRINTS_PATHS } from 'Project/features/Sprints/routes.tsx'
import Gated from 'components/Gated'
import { CREATE_SPRINTS } from 'permissions'

const SprintsList: FC = () => {
  const navigate = useNavigate()
  const { project } = useProject()
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Sprints' })
  const { onCancel, onApply, filters } = useFilters()
  const { sprints, paginator, sorter, refresh, setSorter, loading } = useFetchSprints({
    filters,
  })
  const { onClickOpenConfirm } = useRemoveSprint(refresh)
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: i18n.t('features:Project.menu.futureState'),
      path: SPRINTS_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: false,
    },
  ]

  const columns = useMemo(
    () => [
      {
        header: t('fields.code'),
        fieldName: 'code',
        sortable: true,
      },
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.startDate'),
        fieldName: 'startDate',
        sortable: true,
        dataModifier: (sprint: Sprint): string => dateFormat(sprint.startDate),
      },
      {
        header: t('fields.dueDate'),
        fieldName: 'dueDate',
        sortable: true,
        dataModifier: (sprint: Sprint): string => dateFormat(sprint.dueDate),
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

  const handleClickAdd = useCallback(() => {
    navigate(`create`)
  }, [navigate])

  const handleClickEdit = useCallback(
    ({ id }: { id: string }) => {
      navigate(`edit/${id}`)
    },
    [navigate]
  )

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('sprints')}
        rightContent={
          <Gated permissions={CREATE_SPRINTS}>
            <Button onClick={handleClickAdd} endIcon={<Add />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <ContentBox>
        <SprintsFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
        <SprintsTable
          columns={columns}
          rows={sprints}
          loading={loading}
          onClickView={handleClickView}
          onClickRemove={onClickOpenConfirm}
          onSort={setSorter}
          onClickEdit={handleClickEdit}
          count={lastPage}
          page={page}
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

export default SprintsList
