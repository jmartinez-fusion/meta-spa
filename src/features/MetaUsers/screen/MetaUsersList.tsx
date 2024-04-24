import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Chip } from '@mui/material'
import { Add } from '@mui/icons-material'
import { type MetaUser } from 'MetaUsers/types'
import { type Role } from 'features/Roles/types/rolesTypes'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { META_USERS } from 'utils/constants.ts'
import dateFormat from 'utils/dateFormat.ts'
import useFilters from 'hooks/useFilters.js'
import MetaUsersTable from 'MetaUsers/components/MetaUsersTable'
import useFetchMetaUsers from 'MetaUsers/hooks/useFetchMetaUsers'
import MetaUsersFilters from 'MetaUsers/components/MetaUsersFilters'
import useRemoveMetaUser from 'MetaUsers/hooks/useRemoveMetaUser'
import useStatusMetaUser from 'MetaUsers/hooks/useStatusMetaUser'
import Gated from 'components/Gated'
import { CREATE_USERS } from 'permissions'

const MetaUsersList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const { onCancel, onApply, filters } = useFilters()
  const { metaUsers, paginator, sorter, refresh, setSorter, loading } = useFetchMetaUsers({
    filters,
  })
  const { onClickOpenConfirm } = useRemoveMetaUser(refresh)
  const { onClickOpenConfirmStatus } = useStatusMetaUser(refresh)
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: META_USERS,
      active: true,
    },
  ]

  const columns = useMemo(
    () => [
      {
        header: t('fields.name.label'),
        fieldName: 'name',
        sortable: true,
      },
      { header: t('fields.email.label'), fieldName: 'email', sortable: true },
      {
        header: t('fields.status.label'),
        fieldName: 'status',
        sortable: true,
        dataModifier: (metaUser: MetaUser): any => (
          <Chip
            label={t(metaUser.status)}
            color={metaUser.status === 'active' ? 'success' : 'error'}
          />
        ),
      },
      {
        header: t('fields.roles.label'),
        fieldName: 'roles',
        sortable: true,
        dataModifier: (metaUser: MetaUser): any =>
          metaUser.roles.map((role: Role) => role.name).join(', '),
      },
      {
        header: t('fields.createdAt.label'),
        fieldName: 'createdAt',
        sortable: true,
        dataModifier: (metaUser: MetaUser): string => dateFormat(metaUser.createdAt),
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
        title={t('metaUsers')}
        rightContent={
          <Gated permissions={CREATE_USERS}>
            <Button onClick={handleClickAdd} endIcon={<Add />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <ContentBox>
        <MetaUsersFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
        <MetaUsersTable
          columns={columns}
          rows={metaUsers}
          loading={loading}
          onClickView={handleClickView}
          onClickRemove={onClickOpenConfirm}
          onClickStatus={onClickOpenConfirmStatus}
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

export default MetaUsersList
