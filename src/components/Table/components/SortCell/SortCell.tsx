import { TableSortLabel } from '@mui/material'
import { type FC, type ReactNode } from 'react'
import { ImportExport } from '@mui/icons-material'

interface SortCellProps {
  active?: boolean
  direction?: 'asc' | 'desc'
  onClick: () => void
  header?: string | ReactNode
  order?: 'asc' | 'desc'
}

const SortCell: FC<SortCellProps> = ({ direction, active, onClick, header }: SortCellProps) => {
  return (
    <TableSortLabel
      active
      direction={direction}
      onClick={onClick}
      IconComponent={!active ? ImportExport : undefined}
    >
      {header}
    </TableSortLabel>
  )
}

export default SortCell
