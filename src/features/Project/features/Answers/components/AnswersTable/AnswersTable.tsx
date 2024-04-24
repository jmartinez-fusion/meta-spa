import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { RemoveRedEyeOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type Answer } from 'Project/features/Answers/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface AnswersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (answer: Answer) => void
}

const AnswersTable: FC<AnswersTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: RemoveRedEyeOutlined,
      onClick: onClickView,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default AnswersTable
