import { type UploadError, type UploadResult } from 'types/uploadEntities'

export const uploadErrorFromApi = (data: any = {}): UploadError => {
  const { message, requestError } = data

  return Array.isArray(requestError?.message) ? requestError : message
}

export const uploadResultFromApi = (data: any = {}): UploadResult => {
  const { additions, deletions, updates } = data

  return {
    additions,
    deletions,
    updates,
  }
}
