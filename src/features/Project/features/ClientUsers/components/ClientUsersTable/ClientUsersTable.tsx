import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
// import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type ClientUser } from 'Project/features/ClientUsers/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
// const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface ClientUsersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (clientUser: ClientUser) => void
}

const ClientUsersTable: FC<ClientUsersTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
    },
  ]

  return <SortableTable {...restOfProps} actions={actions} />
}

export default ClientUsersTable
