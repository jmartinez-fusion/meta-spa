import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import { VIEW_DEPARTMENT } from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type Department } from 'Project/features/Structure/features/Departments/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface MetaUsersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (department: Department) => void
}

const DepartmentsTable: FC<MetaUsersTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_DEPARTMENT],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default DepartmentsTable
