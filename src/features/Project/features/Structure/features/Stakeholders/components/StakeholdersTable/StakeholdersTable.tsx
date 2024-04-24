import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import withActions from 'components/Table/components/withActions'
import { VisibilityOutlined } from '@mui/icons-material'
import { VIEW_STAKEHOLDERS } from 'permissions'
import { type Stakeholder } from 'Project/features/Structure/features/Stakeholders/types'
import { useTranslation } from 'react-i18next'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface StakeholdersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (stakeholder: Stakeholder) => void
}

const StakeholdersTable: FC<StakeholdersTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('Stakeholders')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_STAKEHOLDERS],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default StakeholdersTable
