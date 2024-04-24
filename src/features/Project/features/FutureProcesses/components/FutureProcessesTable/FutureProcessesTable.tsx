import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined, EditOutlined } from '@mui/icons-material'
// import CoPresentIcon from '@mui/icons-material/CoPresent'
// import HowToRegIcon from '@mui/icons-material/HowToReg'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type FutureProcess } from 'Project/features/FutureProcesses/types'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import { VIEW_FUTURE_PROCESS_PRESENTATION, VIEW_SELECTED_FUTURE_PROCESS } from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface FutureProcessesTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (futureProcess: FutureProcess) => void
  onClickEdit: (futureProcess: FutureProcess) => void
  // onClickRemove: (futureProcess: FutureProcess) => void
  // onClickStatus: (futureProcess: FutureProcess) => void
}

const FutureProcessesTable: FC<FutureProcessesTableProps> = ({
  onClickView,
  onClickEdit,
  // onClickRemove,
  // onClickStatus,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_SELECTED_FUTURE_PROCESS],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [VIEW_FUTURE_PROCESS_PRESENTATION],
    },
    // {
    //   label: t('present'),
    //   icon: CoPresentIcon,
    //   onClick: onClickRemove,
    //   permissions: [DELETE_USERS],
    // },
    // {
    //   label: t('review'),
    //   icon: HowToRegIcon,
    //   onClick: onClickStatus,
    //   permissions: [STATUS_USERS],
    // },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default FutureProcessesTable
