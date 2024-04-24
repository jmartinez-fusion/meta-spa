import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined } from '@mui/icons-material'
import { VIEW_INFLUENCERS } from 'permissions'
import Table, { type TableProps } from 'components/Table'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type Influencer } from 'Project/features/ProcessMapping/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface InfluencersTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (influencer: Influencer) => void
}

const InfluencersTable: FC<InfluencersTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      visible: (influencer: Influencer) => !!influencer.influencerId,
      permissions: [VIEW_INFLUENCERS],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default InfluencersTable
