import { useCallback, useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import RolesFilters from '../components/RolesFilters'
import RolesTable from '../components/RolesTable/RolesTable'
import { useNavigate } from 'react-router-dom'
import useFetchRoles from 'src/features/Roles/hooks/useFetchRoles.tsx'
import useFilters from 'src/hooks/useFilters'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Add } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import { type Role } from 'src/features/Roles/types/rolesTypes'
import dateFormat from 'src/utils/dateFormat.ts'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { ROLES_PATHS } from 'src/features/Roles/routes.tsx'
import useRemoveRole from 'src/features/Roles/hooks/useRemoveRole.tsx'
import Gated from 'components/Gated'
import { CREATE_ROLES } from 'src/permissions.ts'

const RolesList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const { onCancel, onApply, filters } = useFilters()
  const { roles, sorter, setSorter, refresh, paginator, loading } = useFetchRoles(filters)
  const { onClickOpenConfirm } = useRemoveRole(refresh)
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: ROLES_PATHS.LIST,
      active: true,
    },
  ]

  const columns = useMemo(
    () => [
      { header: t('fields.name'), fieldName: 'name', sortable: true },
      {
        header: t('fields.createdAt'),
        fieldName: 'createdAt',
        sortable: true,
        dataModifier: (role: Role): string => dateFormat(role.createdAt),
      },
    ],
    [t]
  )

  const handleClickView = useCallback(
    ({ id }: Role) => {
      navigate(`details/${id}`)
    },
    [navigate]
  )

  const handleClickAdd = useCallback(() => {
    navigate(`create`)
  }, [navigate])

  const handleClickEdit = useCallback(
    ({ id }: Role) => {
      navigate(`edit/${id}`)
    },
    [navigate]
  )

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('roles')}
        rightContent={
          <Gated permissions={CREATE_ROLES}>
            <Button onClick={handleClickAdd} endIcon={<Add />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <ContentBox>
        <RolesFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
        <RolesTable
          columns={columns}
          rows={roles}
          loading={loading}
          onClickView={handleClickView}
          onSort={setSorter}
          onClickEdit={handleClickEdit}
          count={lastPage}
          page={page}
          onClickRemove={onClickOpenConfirm}
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

export default RolesList
