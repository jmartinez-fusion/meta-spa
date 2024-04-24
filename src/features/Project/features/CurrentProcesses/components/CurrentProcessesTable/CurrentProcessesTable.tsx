import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined, EditOutlined } from '@mui/icons-material'
// import CoPresentIcon from '@mui/icons-material/CoPresent'
// import HowToRegIcon from '@mui/icons-material/HowToReg'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import { LIST_CURRENT_PROCESS, UPDATE_CURRENT_PROCESS } from 'permissions'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface CurrentProcessesTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (currentProcess: CurrentProcess) => void
  onClickEdit: (currentProcess: CurrentProcess) => void
  // onClickRemove: (currentProcess: CurrentProcess) => void
  // onClickStatus: (currentProcess: CurrentProcess) => void
}

const CurrentProcessesTable: FC<CurrentProcessesTableProps> = ({
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
      permissions: [LIST_CURRENT_PROCESS],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [UPDATE_CURRENT_PROCESS],
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

export default CurrentProcessesTable
