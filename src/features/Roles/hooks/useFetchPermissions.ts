import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import Permission from 'src/features/Auth/models/Permission'
import { type PermissionFromAPIType } from 'src/features/Auth/types'
import i18n from 'src/i18n.ts'

interface FetchPermissionsResult {
  permissions: Permission[] | undefined
  groupedPermissions: GroupedPermission[]
  paginator: any
  loading: boolean
  error: any
}

export interface GroupedPermission {
  id?: string
  label: string
  subOptions?: GroupedPermission[]
}

function groupPermissions(permissions: Permission[]): GroupedPermission[] {
  const grouped: Record<string, GroupedPermission> = {}

  permissions.forEach((permission) => {
    const parts = permission.name.split('.')
    const label = parts[0]

    if (!grouped[label]) {
      grouped[label] = {
        label: i18n.t(`features:Roles.permissions.${label}`),
        subOptions: [],
      }
    }

    const subPermission: GroupedPermission = {
      id: permission.id,
      label: permission.label,
    }

    grouped[label].subOptions?.push(subPermission)
  })

  return Object.values(grouped)
}

export default function useFetchPermissions(): FetchPermissionsResult {
  const { t } = useTranslation()
  const [permissions, setPermissions] = useState<Permission[] | undefined>()
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermission[]>([])

  const { response, paginator, loading, error } = usePaginatedFetch({
    url: `${config.api.msAuth.baseUrl}/permissions`,
  })

  useEffect(() => {
    if (!response) return

    const fetchedPermissions: Permission[] = response.data.map(
      (permission: PermissionFromAPIType) => Permission.fromAPI(permission)
    )

    setGroupedPermissions(groupPermissions(fetchedPermissions ?? []))
    setPermissions(fetchedPermissions)
  }, [response, t])

  return {
    permissions,
    paginator,
    loading,
    error,
    groupedPermissions,
  }
}
