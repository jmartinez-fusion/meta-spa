import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import useProject from 'features/Project/hooks/useProject'
import config from 'src/config.tsx'
import { type Department } from 'Project/features/Structure/features/Departments/types'
import { departmentFromApi } from 'Project/features/Structure/features/Departments/transformers'

interface UseFetchCurrentProcessProps {
  id?: string | null
}

interface UseFetchCurrentProcessReturn {
  department?: Department
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchDepartmentDetail = ({
  id,
}: UseFetchCurrentProcessProps): UseFetchCurrentProcessReturn => {
  const [department, setDepartment] = useState<Department | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/departments/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setDepartment(undefined)
    void doFetch()
  }, [setDepartment])

  useEffect(() => {
    if (!response) return

    setDepartment(departmentFromApi(response.data))
  }, [response, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        >
          {t('retry')}
        </div>
      ),
    })
  }, [error, t])

  const isLoading = useMemo(() => loading || department === undefined, [loading, department])

  return { department, loading: isLoading, error, refresh }
}

export default useFetchDepartmentDetail
