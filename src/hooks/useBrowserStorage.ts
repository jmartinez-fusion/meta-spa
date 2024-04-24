export interface BrowserStorageResult {
  persist: (data: any) => void
  clear: () => void
  get: () => any
}

export default function useBrowserStorage(storageIdentifier: string): BrowserStorageResult {
  const persist = (data: any): void => {
    window.localStorage.setItem(storageIdentifier, JSON.stringify(data))
  }

  const clear = (): void => {
    window.localStorage.removeItem(storageIdentifier)
  }

  const get = (): any => {
    const value = window.localStorage.getItem(storageIdentifier)

    if (value) {
      return JSON.parse(value)
    }

    return null
  }

  return { persist, get, clear }
}
