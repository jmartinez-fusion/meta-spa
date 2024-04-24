import { useState, useEffect } from 'react'
import { type Industry, type IndustryFromApi } from 'src/features/Industries/types'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch.ts'
import { industryFromApi } from 'Industries/transformers'

const useFetchIndustries = (): { industries: Industry[] } => {
  const { t } = useTranslation('features', { keyPrefix: 'Industries' })
  const { response, doFetch } = useFetch(`${config.api.msProjects.baseUrl}/industries`)
  const [industries, setIndustries] = useState<Industry[]>([])

  useEffect(() => {
    if (!response) return

    const industries = response.data.map((industry: IndustryFromApi) => industryFromApi(industry))

    setIndustries(industries)
  }, [response, t])

  useEffect(() => {
    void doFetch()
  }, [])

  return { industries }
}

export default useFetchIndustries
