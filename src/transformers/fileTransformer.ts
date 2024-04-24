import { type File, type FileFromApi } from 'types/file'

export const fileFromApi = (data: FileFromApi): File => {
  const { name, id, url, type } = data ?? {}

  return { name, id, url, type }
}
