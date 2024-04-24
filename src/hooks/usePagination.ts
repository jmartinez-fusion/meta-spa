import { useState } from 'react'

interface Paginator {
  currentPage: number
  lastPage: number
  from: number
  to: number
  perPage: number
  total: number
}

interface PaginatedResult<T> {
  displayResultsMessage: string
  data: T[]
  paginator: Paginator
  goToPage: (page: number) => void
  sorter: Sorter<T> | undefined
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

interface Sorter<T> {
  fieldName: keyof T
  order: 'asc' | 'desc' | undefined
}

const usePagination = <T>(data: T[], itemsPerPage: number): PaginatedResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSorter, setCurrentSorter] = useState<Sorter<T> | undefined>(undefined)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, data.length)

  const sortedData = currentSorter
    ? [...data].sort((a, b) => {
        const compareResult =
          currentSorter.order === 'asc'
            ? String(a[currentSorter.fieldName]).localeCompare(String(b[currentSorter.fieldName]))
            : String(b[currentSorter.fieldName]).localeCompare(String(a[currentSorter.fieldName]))
        return compareResult
      })
    : [...data]

  const paginatedData = sortedData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginator: Paginator = {
    currentPage,
    lastPage: totalPages,
    from: startIndex + 1,
    to: endIndex,
    perPage: itemsPerPage,
    total: data.length,
  }

  const goToPage = (page: number): void => {
    setCurrentPage(page)
  }

  const setSorter = (fieldName: string, order: 'asc' | 'desc' | undefined): void => {
    setCurrentSorter({ fieldName: fieldName as keyof T, order })
  }

  return {
    displayResultsMessage: `Showing ${paginator.from} to ${paginator.to} of ${paginator.total} results`,
    data: paginatedData,
    paginator,
    goToPage,
    sorter: currentSorter,
    setSorter,
  }
}

export default usePagination
