import { type ElementType, type FC, useCallback, useEffect, useMemo, useState } from 'react'
import Table, { type TableColumn } from 'components/Table'
import SortCell from '../SortCell'
import { type Sorter } from 'src/types/sorter'

export interface SortableTableProps {
  columns: TableColumn[]
  as?: ElementType
  sorter?: Sorter
  onSort?: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const SortableTable: FC<SortableTableProps> = ({
  columns,
  as: Component = Table,
  sorter,
  onSort,
  ...restTableProps
}) => {
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(undefined)
  const [orderBy, setOrderBy] = useState<string | null>(null)

  const handleClickSort = useCallback(
    (fieldName: string) => {
      const newOrder = orderBy === fieldName && order === 'desc' ? 'asc' : 'desc'

      setOrderBy(fieldName)
      setOrder(newOrder)
      onSort?.(fieldName, newOrder)
    },
    [orderBy, order, onSort]
  )

  const sortableColumns = useMemo(() => {
    return columns.map(({ header, fieldName, sortable, ...restColumn }) => {
      if (!sortable) return { header, fieldName, ...restColumn }

      const active = orderBy === fieldName

      return {
        fieldName,
        header: (
          <SortCell
            active={active}
            key={header?.toString()}
            header={header}
            direction={active ? order : 'desc'}
            onClick={() => {
              handleClickSort(fieldName)
            }}
          />
        ),
        ...restColumn,
      }
    })
  }, [columns, order, orderBy, handleClickSort])

  useEffect(() => {
    setOrder(sorter?.order ?? undefined)
    setOrderBy(sorter?.fieldName ?? null)
  }, [sorter])

  return <Component columns={sortableColumns} {...restTableProps} />
}

export default SortableTable
