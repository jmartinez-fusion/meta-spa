import { type FutureProcess } from 'Project/features/ProcessSelection/types'

interface UseProcessesListSearch {
  filter: (searchValue?: string, options?: FutureProcess[]) => FutureProcess[]
}

const useProcessesListSearch = (): UseProcessesListSearch => {
  const isOptionSearched = (searchValue: string = '', futureProcess: FutureProcess): boolean => {
    const showValue = `${futureProcess.code} ${futureProcess.name}`
    return showValue.toLowerCase().includes(searchValue.toLowerCase())
  }

  const isBranchSearched = (searchValue: string = '', futureProcess: FutureProcess): boolean => {
    let searched = isOptionSearched(searchValue, futureProcess)

    if (!searched) {
      futureProcess.subProcesses?.forEach((subProcess) => {
        searched = searched || isBranchSearched(searchValue, subProcess)
      })
    }

    return searched
  }

  const filter = (searchValue: string = '', options: FutureProcess[] = []): FutureProcess[] => {
    const filtered: FutureProcess[] = []

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
