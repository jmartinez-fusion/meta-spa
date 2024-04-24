import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined } from '@mui/icons-material'
import { VIEW_PROCESS_MAPPINGS } from 'permissions'
import Table, { type TableProps } from 'components/Table'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type ProcessMapping } from 'Project/features/ProcessMapping/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface ProcessMappingTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (processMapping: ProcessMapping) => void
  onClickEdit: (processMapping: ProcessMapping) => void
}

const ProcessMappingTable: FC<ProcessMappingTableProps> = ({
  onClickView,
  onClickEdit,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_PROCESS_MAPPINGS],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default ProcessMappingTable
