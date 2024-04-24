import { type ChangeEvent, type ElementType, type FC, type ReactNode, useMemo } from 'react'
import Table from 'components/Table'
import { Checkbox } from '@mui/material'
import { useSelection } from 'components/Table/hooks/useSelection'

interface Column {
  header: string | ReactNode
  fieldName: string
}

type Row = any

export interface MultiSelectTableProps {
  columns: Column[]
  rows: Row[] | undefined
  as?: ElementType
  onSelectOne: (item: Row) => void
  onDeselectOne: (item: Row) => void
  onSelectAll: (items: Row[]) => void
  onDeselectAll: () => void
}

const MultiSelectTable: FC<MultiSelectTableProps> = ({
  rows,
  columns,
  as: Component = Table,
  onSelectOne,
  onDeselectOne,
  onSelectAll,
  onDeselectAll,
  ...restTableProps
}) => {
  const rowsIds = useMemo(() => rows?.map((row) => row.id), [rows])
  const { selected = [], ...rowsSelection } = useSelection(rowsIds || [])

  const onHeaderCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      rowsSelection.handleSelectAll(onSelectAll)
    } else {
      rowsSelection.handleDeselectAll(onDeselectAll)
    }
  }

  const onRowCheckboxChange =
    (rowId: string | number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        rowsSelection.handleSelectOne(rowId, onSelectOne)
      } else {
        rowsSelection.handleDeselectOne(rowId, onDeselectOne)
      }
    }

  const columnsWithCheckbox = useMemo(() => {
    const selectedSome = selected.length > 0 && selected.length < (rows?.length || 0)
    const selectedAll = rows && rows?.length > 0 && selected.length === rows?.length

    return [
      {
        header: (
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={onHeaderCheckboxChange}
          />
        ),
        fieldName: '$checkbox',
      },
      ...columns,
    ]
  }, [selected, rows, columns, onHeaderCheckboxChange])

  const rowsWithCheckbox = useMemo(() => {
    if (!rows) return null

    return rows.map((row) => {
      const isSelected = selected.includes(row.id)

      return {
        $checkbox: <Checkbox checked={isSelected} onChange={onRowCheckboxChange(row.id)} />,
        $isSelected: isSelected,
        ...row,
      }
    })
  }, [selected, rows, onRowCheckboxChange])

  return <Component columns={columnsWithCheckbox} rows={rowsWithCheckbox} {...restTableProps} />
}

export default MultiSelectTable
