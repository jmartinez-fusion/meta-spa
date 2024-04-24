import { useCallback, useMemo, useState } from 'react'
import _ from 'lodash'
import { type Filters } from 'src/types/filter'

export interface FiltersHook {
  isOpenFilters: boolean
  openFilters: () => void
  onCancel: () => void
  onApply: (filters: Filters) => void
  count: number
  filters: Filters
}

export default function useFilters(): FiltersHook {
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>({})

  const onCancel = useCallback(() => {
    setIsOpenFilters(false)
  }, [])
  const openFilters = useCallback(() => {
    setIsOpenFilters(true)
  }, [])
  const onApply = useCallback((filtersData: Filters) => {
    const filledFilters = _.omitBy(filtersData, (value: any) => {
      return (
        (_.isArray(value) && _.isEmpty(value)) ||
        (_.isString(value) && _.isEmpty(_.trim(value))) ||
        value === null ||
        value === undefined
      )
    })
    setFilters(filledFilters)
    setIsOpenFilters(false)
  }, [])

  const count = useMemo(() => Object.keys(filters).length, [filters])

  return { isOpenFilters, openFilters, onCancel, onApply, count, filters }
}
