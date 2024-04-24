import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch from 'hooks/useFetch.ts'
import { roleFromApi } from 'Roles/transformers'
import { type Role, type RoleFromApi } from 'Roles/types/rolesTypes'

const useFetchRolesOptions = (): { roles: Role[] } => {
  const { t } = useTranslation('features', { keyPrefix: 'Roles' })
  const { response, doFetch } = useFetch(`${config.api.msAuth.baseUrl}/roles`)
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    if (!response) return

    const roles = response.data.map((role: RoleFromApi) => roleFromApi(role))

    setRoles(roles)
  }, [response, t])

  useEffect(() => {
    void doFetch()
  }, [])

  return { roles }
}

export default useFetchRolesOptions
