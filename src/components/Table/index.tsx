import { type CSSProperties, type FC, type ReactNode } from 'react'
import {
  Box,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Scrollbar from 'components/Scrollbar'
import img404 from 'src/assets/errors/error-404.png'
import SkeletonRow from './components/SkeletonRow'
import { generateUniqueId } from 'src/utils/utils.ts'

export interface TableColumn {
  header: string | ReactNode
  fieldName: string
  sortable?: boolean
  dataModifier?: (data: any) => ReactNode | string | null
  cellStyles?: CSSProperties
  fillEmptyValue?: string | number | ReactNode
}

export type TableRowData = object | null | undefined

export interface TableProps {
  columns: TableColumn[]
  rows?: TableRowData[] | null
  loading?: boolean
  minWidth?: number
  skeletonRowsQuantity?: number
}

const Table: FC<TableProps> = ({
  columns = [],
  rows,
  minWidth = 800,
  loading = true,
  skeletonRowsQuantity = 10,
}: TableProps) => {
  const { t } = useTranslation()

  if (!loading && rows?.length === 0) {
    return (
        <Stack m={3} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
          <img
              alt="no results"
              src={img404}
              style={{
                width: 120,
              }}
          />
          <Typography color="text.secondary">{t('noResults')}</Typography>
      </Stack>
    )
  }

  return (
    <Scrollbar>
      <Box sx={{ minWidth }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map(({ header, cellStyles }) => (
                <TableCell key={generateUniqueId()} sx={cellStyles}>
                  <>{header}</>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || rows === null ? (
              <>
                {Array.from({ length: skeletonRowsQuantity }, (_, i) => (
                  <SkeletonRow key={i} columnsQuantity={columns.length} />
                ))}
              </>
            ) : (
              rows?.map((row, rowIndex) => {
                return (
                  <TableRow key={generateUniqueId()}>
                    {columns.map(
                      ({ dataModifier, fieldName, cellStyles, fillEmptyValue = '-' }, colIndex) => {
                        const value = dataModifier
                          ? dataModifier(row)
                          : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            row[fieldName] ?? fillEmptyValue
                        return (
                          <TableCell
                            key={`${rowIndex}_${colIndex}_${generateUniqueId()}`}
                            sx={cellStyles}
                          >
                            {value}
                          </TableCell>
                        )
                      }
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </MuiTable>
      </Box>
    </Scrollbar>
  )
}

export default Table
