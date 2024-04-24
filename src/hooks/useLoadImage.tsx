import { useEffect, useState } from 'react'
import config from '../config.tsx'
import { useTranslation } from 'react-i18next'
import { type RequestError } from 'hooks/useFetch.ts'
import { type Image } from 'Project/features/PresentationTool/types'
import useLoadFile from 'hooks/useLoadFile.tsx'

interface useLoadImageProps {
  image?: Image
  loading: boolean
  error: RequestError
  refresh: () => void
  doFetch: (
    params?: any,
    options?: { isPollingFetch?: boolean | undefined } | undefined
  ) => Promise<any>
}

const useLoadImage = (): useLoadImageProps => {
  const { t } = useTranslation()
  const [image, setImage] = useState<Image | undefined>(undefined)
  const { retry, response, loading, error, doFetch } = useLoadFile({
    url: `${config.api.msProcesses.baseUrl}/image`,
  })

  useEffect(() => {
    if (!response) return

    setImage(response.data)
  }, [response?.data, response, t])

  return { image, doFetch, loading, error, refresh: retry }
}

export default useLoadImage
