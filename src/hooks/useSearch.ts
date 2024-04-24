import { useCallback, useEffect, useState } from 'react'

interface UseSearchResult<T> {
  filteredOptions: T[]
  handleChangeSearch: (e: any) => void
}

const useSearch = <T>(
  options: T[] = [],
  onSearch: (value: string, options: T[]) => T[]
): UseSearchResult<T> => {
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options)
  const [throttle, setThrottle] = useState<any>(undefined)

  const handleChangeSearch = useCallback(
    (e: any) => {
      if (throttle) {
        clearTimeout(throttle)
      }

      const { value } = e.target

      setThrottle(
        setTimeout(() => {
          setFilteredOptions(onSearch(value, [...options]))
        }, 300)
      )
    },
    [onSearch, options, throttle]
  )

  useEffect(() => {
    if (options.length > 0) {
      setFilteredOptions(options)
    }
  }, [options])

  return {
    handleChangeSearch,
    filteredOptions,
  }
}

export default useSearch
