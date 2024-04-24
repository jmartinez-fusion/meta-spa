import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import dateFormat from 'utils/dateFormat.ts'
import useFilters from 'hooks/useFilters.js'
import { type ClientUser } from 'Project/features/ClientUsers/types'
import { CLIENT_USERS_PATHS } from 'Project/features/ClientUsers/routes.tsx'
import ClientUsersTable from 'src/features/Project/features/ClientUsers/components/ClientUsersTable'
import useProject from 'Project/hooks/useProject.ts'
import ClientUsersFilters from 'Project/features/ClientUsers/components/ClientUsersFilters'
import useFetchClientUsers from 'Project/features/ClientUsers/hooks/useFetchClientUsers.tsx'

const ClientUsersList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'ClientUsers' })
  const { onCancel, onApply, filters } = useFilters()
  const { project } = useProject()
  const { clientUsers, paginator, sorter, setSorter, loading } = useFetchClientUsers({
    filters: {
      ...filters,
      isUser: true,
    },
  })
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('security'),
      path: CLIENT_USERS_PATHS.LIST.replace(':projectId', project?.id ?? ''),
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
        header: t('fields.createdAt.label'),
        fieldName: 'createdAt',
        sortable: false,
        dataModifier: (clientUser: ClientUser): string => dateFormat(clientUser.createdAt),
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

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle title={t('clientUsers')} />
      <ContentBox>
        <ClientUsersFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
        <ClientUsersTable
          columns={columns}
          rows={clientUsers}
          loading={loading}
          onClickView={handleClickView}
          onSort={setSorter}
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

export default ClientUsersList
