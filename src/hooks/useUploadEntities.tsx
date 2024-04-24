import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useLoadFile, { type UploadFileFetchResult } from 'hooks/useLoadFile.tsx'
import { type UploadError, type UploadResult } from 'types/uploadEntities'
import {
  uploadErrorFromApi,
  uploadResultFromApi,
} from '../transformers/uploadEntitiesTransformer.ts'

export interface UseUploadEntitiesResult {
  uploadResult?: UploadResult
  loading: boolean
  error?: string | UploadError
  refresh: () => void
  progress?: number
  file: File | undefined
  useUploadFile: UploadFileFetchResult | undefined
  handleChangeFile: (file: File) => void
}

const useUploadEntities = (url: string, processId?: string): UseUploadEntitiesResult => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | undefined>(undefined)
  const [error, setError] = useState<string | UploadError | undefined>(undefined)
  const useUploadFile = useLoadFile({ url, showErrorSnackbar: false })
  const {
    doFetch: uploadFile,
    retry,
    response,
    loading,
    error: requestError,
    progress,
  } = useUploadFile
  const [uploadResult, setUploadResult] = useState<UploadResult | undefined>(undefined)

  const handleChangeFile = (file: File): void => {
    setError(undefined)
    setFile(undefined)
    if (file.type === 'text/csv') {
      setFile(file)
      void uploadFile({ data: { file, processId } })
    } else {
      setError(t('validations:fileTypeMustBeCsv'))
    }
  }

  useEffect(() => {
    if (!response) return

    setUploadResult(uploadResultFromApi(response.data))
  }, [response?.data, response, t])

  useEffect(() => {
    if (!requestError) return

    setError(uploadErrorFromApi(requestError))
  }, [requestError, t])

  return {
    uploadResult,
    useUploadFile,
    handleChangeFile,
    progress,
    file,
    loading,
    error,
    refresh: retry,
  }
}

export default useUploadEntities
