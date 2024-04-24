import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined, EditOutlined, HighlightOffRounded } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import { type Role } from 'Roles/types/rolesTypes'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import { DELETE_ROLES, UPDATE_ROLES, VIEW_ROLES } from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface RolesTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (role: Role) => void
  onClickEdit: (role: Role) => void
  onClickRemove: (role: Role) => void
}

const RolesTable: FC<RolesTableProps> = ({
  onClickView,
  onClickRemove,
  onClickEdit,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')

  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_ROLES],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [VIEW_ROLES, UPDATE_ROLES],
    },
    {
      label: t('delete'),
      icon: HighlightOffRounded,
      onClick: onClickRemove,
      permissions: [DELETE_ROLES],
      visible: (role: Role) => role.canBeDeleted,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default RolesTable
