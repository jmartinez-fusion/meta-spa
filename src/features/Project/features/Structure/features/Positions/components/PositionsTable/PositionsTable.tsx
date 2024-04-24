import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)

interface MetaUsersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {}

const PositionsTable: FC<MetaUsersTableProps> = ({ ...restOfProps }) => {
  return <SortableTable {...restOfProps} />
}

export default PositionsTable
