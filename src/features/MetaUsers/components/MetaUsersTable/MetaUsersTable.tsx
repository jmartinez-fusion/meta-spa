import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  VisibilityOutlined,
  EditOutlined,
  HighlightOffRounded,
  ManageAccountsRounded,
} from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type MetaUser } from 'MetaUsers/types'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import { DELETE_USERS, STATUS_USERS, UPDATE_USERS, VIEW_USERS } from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface MetaUsersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (metaUser: MetaUser) => void
  onClickEdit: (metaUser: MetaUser) => void
  onClickRemove: (metaUser: MetaUser) => void
  onClickStatus: (metaUser: MetaUser) => void
}

const MetaUsersTable: FC<MetaUsersTableProps> = ({
  onClickView,
  onClickEdit,
  onClickRemove,
  onClickStatus,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_USERS],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [UPDATE_USERS],
    },
    {
      label: t('delete'),
      icon: HighlightOffRounded,
      onClick: onClickRemove,
      permissions: [DELETE_USERS],
    },
    {
      label: `${t('unhide')} / ${t('hide')}`,
      icon: ManageAccountsRounded,
      onClick: onClickStatus,
      permissions: [STATUS_USERS],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default MetaUsersTable
