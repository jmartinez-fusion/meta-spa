import { type FC } from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from '@mui/icons-material'
import styles from './pagination.module.scss'

interface PaginationTextBlockProps {
  lastPage: number
  page: number
  setPage: (value: number) => void
}

const PaginationTextBlock: FC<PaginationTextBlockProps> = ({ setPage, page, lastPage }) => {
  return (
    <div className={styles.paginationBox}>
      <Pagination
        count={lastPage}
        page={page}
        onChange={(_, value) => {
          setPage(value)
        }}
        showFirstButton
        showLastButton
        size="large"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: ChevronLeftRounded,
              next: ChevronRightRounded,
              first: KeyboardDoubleArrowLeftRounded,
              last: KeyboardDoubleArrowRightRounded,
            }}
            {...item}
          />
        )}
      />
    </div>
  )
}

export default PaginationTextBlock
