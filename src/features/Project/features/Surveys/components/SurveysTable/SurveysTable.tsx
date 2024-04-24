import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable'
import Table, { type TableProps } from 'components/Table'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import {
  EditOutlined,
  HighlightOffOutlined,
  PlayCircleOutlined,
  RateReviewOutlined,
  StopCircleOutlined,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type Survey } from 'Project/features/Surveys/types'
import {
  CLOSE_SURVEY,
  CONTINUE_SURVEY,
  DEADLINE_SURVEY,
  GENERIC_UPDATE_SURVEY,
  PAUSE_SURVEY,
} from 'permissions'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface SprintsTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (survey: Survey) => void
  onClickStop: (survey: Survey) => void
  onClickContinue: (survey: Survey) => void
  onClickEditConfigurations: (survey: Survey) => void
  onClickCancel: (survey: Survey) => void
  onClickViewAnswers: (survey: Survey) => void
}

const SurveysTable: FC<SprintsTableProps> = ({
  onClickView,
  onClickStop,
  onClickContinue,
  onClickEditConfigurations,
  onClickCancel,
  onClickViewAnswers,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')
  const actions = [
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickView,
      visible: (survey: Survey) => survey.type.isContext && survey.status.isPending,
      permissions: [GENERIC_UPDATE_SURVEY],
    },
    {
      label: t('features:Surveys.configurations.title'),
      icon: PlayCircleOutlined,
      onClick: onClickEditConfigurations,
      visible: (survey: Survey) => survey.type.isContext && survey.status.isPending,
      permissions: [DEADLINE_SURVEY],
    },
    {
      label: t('features:Surveys.continue'),
      icon: PlayCircleOutlined,
      onClick: onClickContinue,
      visible: (survey: Survey) => survey.type.isContext && survey.status.isPaused,
      permissions: [CONTINUE_SURVEY],
    },
    {
      label: t('stop'),
      icon: StopCircleOutlined,
      onClick: onClickStop,
      visible: (survey: Survey) => survey.type.isContext && survey.status.isOpen,
      permissions: [PAUSE_SURVEY],
    },
    {
      label: t('features:Surveys.close'),
      icon: HighlightOffOutlined,
      onClick: onClickCancel,
      visible: (survey: Survey) => survey.type.isContext && survey.status.isOpen,
      permissions: [CLOSE_SURVEY],
    },
    {
      label: t('features:Surveys.answers'),
      icon: RateReviewOutlined,
      onClick: onClickViewAnswers,
      visible: (survey: Survey) => survey.type.isContext && survey.totalSurveyed > 0,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default SurveysTable
