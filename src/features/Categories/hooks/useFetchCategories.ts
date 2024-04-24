import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch.ts'
import { categoryFromApi } from 'features/Categories/transformers'
import { type Category, type CategoryFromApi } from 'features/Categories/types'

const useFetchCategories = (): { categories: Category[] } => {
  const { t } = useTranslation('features', { keyPrefix: 'Industries' })
  const { response, doFetch } = useFetch(`${config.api.msProjects.baseUrl}/categories`)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (!response) return

    const industries = response.data.map((category: CategoryFromApi) => categoryFromApi(category))

    setCategories(industries)
  }, [response, t])

  useEffect(() => {
    void doFetch()
  }, [])

  return { categories }
}

export default useFetchCategories
