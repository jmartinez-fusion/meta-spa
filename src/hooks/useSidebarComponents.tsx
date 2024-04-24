import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FolderOutlined,
  ManageAccountsOutlined,
  PeopleAltOutlined,
} from '@mui/icons-material'
import { type SidebarComponents } from 'components/PrivateLayout/types'
import { LIST_PROJECTS, LIST_ROLES, LIST_USERS } from 'permissions'

export interface UseSidebarComponentsResult {
  components: SidebarComponents
}

export default function useSidebarComponents(): UseSidebarComponentsResult {
  const { t } = useTranslation()
  const components = useMemo(
    () => [
      {
        title: t('menu:projects'),
        items: [
          {
            to: 'projects',
            permissions: [LIST_PROJECTS],
            icon: FolderOutlined,
            label: t('menu:projects'),
          },
        ],
      },
      {
        title: t('menu:security'),
        items: [
          {
            permissions: [LIST_USERS],
            to: 'meta-users',
            icon: PeopleAltOutlined,
            label: t('menu:metaUsers'),
          },
          {
            permissions: [LIST_ROLES],
            to: 'roles',
            icon: ManageAccountsOutlined,
            label: t('menu:roles'),
          },
        ],
      },
    ],
    [t]
  )

  return { components }
}
