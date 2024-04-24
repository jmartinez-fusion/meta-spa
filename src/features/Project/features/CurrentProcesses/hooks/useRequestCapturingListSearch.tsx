import { type CurrentProcessRequestCapturing } from 'Project/features/CurrentProcesses/types'

interface UseProcessesListSearch {
  filter: (
    searchValue?: string,
    options?: CurrentProcessRequestCapturing[]
  ) => CurrentProcessRequestCapturing[]
}

const useProcessesListSearch = (): UseProcessesListSearch => {
  const isOptionSearched = (
    searchValue: string = '',
    currentProcessRequestCapturing: CurrentProcessRequestCapturing
  ): boolean => {
    const showValue = `${currentProcessRequestCapturing.name}`
    return showValue.toLowerCase().includes(searchValue.toLowerCase())
  }

  const isBranchSearched = (
    searchValue: string = '',
    currentProcessRequestCapturing: CurrentProcessRequestCapturing
  ): boolean => {
    let searched = isOptionSearched(searchValue, currentProcessRequestCapturing)

    if (!searched) {
      currentProcessRequestCapturing.subProcesses?.forEach((subProcess) => {
        searched = searched || isBranchSearched(searchValue, subProcess)
      })
    }

    return searched
  }

  const filter = (
    searchValue: string = '',
    options: CurrentProcessRequestCapturing[] = []
  ): CurrentProcessRequestCapturing[] => {
    const filtered: CurrentProcessRequestCapturing[] = []

    options.forEach((option) => {
      if (isBranchSearched(searchValue, option)) {
        filtered.push({
          ...option,
          subProcesses: isOptionSearched(searchValue, option)
            ? option.subProcesses
            : filter(searchValue, option.subProcesses),
        })
      }
    })

    return filtered
  }

  return { filter }
}

export default useProcessesListSearch
