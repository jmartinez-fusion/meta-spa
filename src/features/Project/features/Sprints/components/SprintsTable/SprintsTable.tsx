import {type ComponentType, type FC} from 'react'
import {useTranslation} from 'react-i18next'
import {EditOutlined, HighlightOffRounded, VisibilityOutlined} from '@mui/icons-material'
import {type PaginatedTableProps} from 'components/Table/components/withPagination/PaginatedTable'
import {type TableWithActionsProps} from 'components/Table/components/withActions/TableWithActions'
import {type Sprint} from 'Project/features/Sprints/types'
import {type SortableTableProps} from 'components/Table/components/withSortHeader/SortableTable'
import Table, {type TableProps} from 'components/Table'
import {DELETE_SPRINTS, UPDATE_SPRINTS, VIEW_SPRINTS} from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface SprintsTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (sprint: Sprint) => void
  onClickEdit: (sprint: Sprint) => void
  onClickRemove: (sprint: Sprint) => void
}

const SprintsTable: FC<SprintsTableProps> = ({
  onClickView,
  onClickEdit,
  onClickRemove,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_SPRINTS],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [UPDATE_SPRINTS, VIEW_SPRINTS],
    },
    {
      label: t('delete'),
      icon: HighlightOffRounded,
      onClick: onClickRemove,
      permissions: [DELETE_SPRINTS],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default SprintsTable
