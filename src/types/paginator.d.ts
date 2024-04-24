import { type Dispatch, type SetStateAction } from 'react'

export interface Paginator {
  lastPage: number
  page: number
  displayResultsMessage: string,
  perPage: number
  setPage: Dispatch<SetStateAction<number>>
  setPerPage: Dispatch<SetStateAction<number>>
}
