import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'src/hooks/useFetch'
import config from 'src/config'
import { useNavigate } from 'react-router-dom'
import { roleToApi as roleToApiTransformer } from '../transformers'
import { type RoleToApi } from 'src/features/Roles/types/rolesTypes'
import {ROLES_PATHS} from "../routes.tsx";

interface RoleCreationResponse {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useRoleCreation = (): RoleCreationResponse => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [roleToApi, setRoleToApi] = useState<RoleToApi | undefined>(undefined)
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msAuth.baseUrl}/roles`,
    {
      method: 'POST',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      const role = roleToApiTransformer(data)
      void doFetch({ data })
      setRoleToApi(role)
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    navigate(ROLES_PATHS.LIST)

    const message = t('createdSuccessfully', {
      name: roleToApi?.name,
      type: t('features:Roles:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, roleToApi, navigate, enqueueSnackbar])

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

  return { onSubmit, isSubmitting: loading }
}

export default useRoleCreation
