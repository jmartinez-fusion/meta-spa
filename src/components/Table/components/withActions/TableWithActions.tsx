import { type ElementType, useMemo, type FC } from 'react'
import Table, { type TableProps, type TableRowData } from 'components/Table'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type PermissionsProps } from 'components/Gated/types'
import styles from './tableWithActions.module.scss'
import MenuActions from 'components/Table/components/withActions/MenuActions.tsx'
import useAuth from 'features/Auth/hooks/useAuth.ts'

export interface Action {
  label: string
  icon: ElementType
  permissions: PermissionsProps
  onClick: (row: TableRowData) => void
  visible?: (row: TableRowData) => boolean
}

export interface TableWithActionsProps extends TableProps {
  actions?: Action[]
  as?: ElementType
}

const TableWithActions: FC<TableWithActionsProps> = ({
  columns,
  rows,
  as: Component = Table,
  actions = [],
  ...restTableProps
}: TableWithActionsProps) => {
  const { t } = useTranslation('common')
  const { checkPermissions } = useAuth()

  const columnsWithActions = useMemo(() => {
    return [
      ...columns,
      {
        header: t('actions'),
        fieldName: '$actions',
        cellStyles: {
          whiteSpace: 'nowrap',
          width: '180px !important',
        },
      },
    ]
  }, [columns, t])

  const rowsWithActions = useMemo(() => {
    if (!rows) return null

    return rows.map((row: TableRowData) => {
      const rowActions = actions?.filter(
        ({ visible = () => true, permissions }) => visible(row) && checkPermissions(permissions)
      )

      let displayedActions = []
      let menuActions: Action[] = []

      if (rowActions.length > 4) {
        displayedActions = rowActions.slice(0, 3)
        menuActions = rowActions.slice(3)
      } else {
        displayedActions = rowActions
      }

      return {
        ...row,
        $actions: (
          <div className={styles.actionsWrapper}>
            {displayedActions.map(({ label, icon: Icon, onClick }) => (
              <IconButton
                color="secondary"
                aria-label="hide"
                key={label}
                size="small"
                onClick={() => {
                  onClick(row)
                }}
              >
                <Tooltip title={label}>
                  <Icon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            ))}
            <MenuActions row={row} actions={menuActions} />
          </div>
        ),
      }
    })
  }, [rows, checkPermissions])

  return <Component columns={columnsWithActions} rows={rowsWithActions} {...restTableProps} />
}

export default TableWithActions
