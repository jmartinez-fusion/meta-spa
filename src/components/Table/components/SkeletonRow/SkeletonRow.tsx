import { useMemo, type ReactNode } from 'react'
import PropTypes from 'prop-types'
import { Skeleton, TableCell, TableRow } from '@mui/material'

interface SkeletonRowProps {
  columnsQuantity: number
}

function SkeletonRow({ columnsQuantity }: SkeletonRowProps): ReactNode {
  const cells: ReactNode[] = useMemo(() => {
    const cellList: ReactNode[] = []

    for (let i = 0; i < columnsQuantity; i++) {
      cellList.push(
        <TableCell key={i}>
          <Skeleton />
        </TableCell>
      )
    }

    return cellList
  }, [columnsQuantity])

  return <TableRow hover>{cells}</TableRow>
}

SkeletonRow.propTypes = {
  columnsQuantity: PropTypes.number.isRequired,
}

export default SkeletonRow
