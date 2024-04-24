import Table, { type TableProps } from 'components/Table'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import { useTranslation } from 'react-i18next'
import { type Project } from 'src/features/Projects/types'
import {
  VisibilityOutlined,
  EditOutlined,
  HighlightOffRounded,
  Login,
  AdminPanelSettingsOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import {
  DELETE_PROJECT,
  EDIT_PROJECT_CONFIGURATIONS,
  UPDATE_PROJECT,
  VIEW_PROJECT,
  VIEW_PROJECT_CONFIGURATIONS,
} from 'src/permissions.ts'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface AdministratorsTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (project: Project) => void
  onClickEdit: (project: Project) => void
  onClickGoToProject: (project: Project) => void
  onClickConfigurations: (project: Project) => void
  onClickRemove: (project: Project) => void
  onClickProjectRoles: (project: Project) => void
}

const ProjectsTable: FC<AdministratorsTableProps> = ({
  onClickView,
  onClickEdit,
  onClickConfigurations,
  onClickRemove,
  onClickGoToProject,
  onClickProjectRoles,
  ...restOfProps
}) => {
  const { t } = useTranslation('common')

  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      permissions: [VIEW_PROJECT],
    },
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      permissions: [VIEW_PROJECT, UPDATE_PROJECT],
    },
    {
      label: t('features:Projects.goToProject'),
      icon: Login,
      onClick: onClickGoToProject,
    },
    {
      label: t('features:Projects.projectRoles.title'),
      icon: AdminPanelSettingsOutlined,
      onClick: onClickProjectRoles,
      permissions: [],
    },
    {
      label: t('features:Projects.projectConfigurations.title'),
      icon: SettingsOutlined,
      onClick: onClickConfigurations,
      permissions: [EDIT_PROJECT_CONFIGURATIONS, VIEW_PROJECT_CONFIGURATIONS],
    },
    {
      label: t('delete'),
      icon: HighlightOffRounded,
      onClick: onClickRemove,
      permissions: [DELETE_PROJECT],
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default ProjectsTable
