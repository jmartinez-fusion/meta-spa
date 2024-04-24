export interface UploadResult {
  additions: number
  deletions: number
  updates: number
}

export interface UploadErrorRow {
  row: number
  errors: string[]
}
export interface UploadError {
  message: UploadErrorRow[]
}
