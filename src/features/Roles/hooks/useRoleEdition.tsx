import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'src/hooks/useFetch'
import config from 'src/config'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchRoleDetail from './useFetchRoleDetail'
import { type Role } from '../types/rolesTypes'
import { ROLES_PATHS } from '../routes.tsx'

interface RoleEditionResponse {
  onSubmit: (data: any) => void
  loading: boolean
  role: Role | undefined
  isSubmitting: boolean
}

const useRoleEdition = (): RoleEditionResponse => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { role, loading: roleLoading } = useFetchRoleDetail(id)
  const {
    response,
    doFetch,
    retry,
    error,
    loading: isSubmitting,
  } = useFetch(`${config.api.msAuth.baseUrl}/roles/${id}`, {
    method: 'PATCH',
  })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ data })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    navigate(ROLES_PATHS.LIST)

    const message = t('editedSuccessfully', {
      name: response.data.name,
      type: t('features:Roles:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

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
        />
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSubmit, loading: roleLoading, role, isSubmitting }
}

export default useRoleEdition
