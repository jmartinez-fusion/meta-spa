import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AccountTreeOutlined,
  FactCheckOutlined,
  PeopleAltOutlined,
  RestartAlt,
} from '@mui/icons-material'
import UpdateIcon from '@mui/icons-material/Update'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import RouteIcon from '@mui/icons-material/Route'
import { type SidebarComponents } from 'components/PrivateLayout/types'
import {
  LIST_CURRENT_PROCESS,
  LIST_DEPARTMENTS,
  LIST_FUTURE_PROCESS,
  LIST_STAKEHOLDERS,
  LIST_SPRINTS,
  LIST_POSITIONS,
  LIST_PROCESS_MAPPINGS,
  LIST_TEXT_BLOCKS,
} from 'permissions'

export interface UseProjectSidebarComponentsResult {
  components: SidebarComponents
}

export default function useProjectSidebarComponents(): UseProjectSidebarComponentsResult {
  const { t } = useTranslation('features', { keyPrefix: 'Project' })
  const components = useMemo(
    () => [
      {
        title: t('menu.currentState'),
        items: [
          {
            to: 'structure',
            icon: AccountTreeOutlined,
            label: t('menu.structure'),
            permissions: [LIST_DEPARTMENTS, LIST_POSITIONS, LIST_STAKEHOLDERS],
            orValidation: true,
          },
          {
            to: 'current-processes',
            icon: ChecklistRtlIcon,
            label: t('menu.currentProcesses'),
            permissions: [LIST_CURRENT_PROCESS],
          },
        ],
      },
      {
        title: t('menu.futureState'),
        items: [
          {
            to: 'process-mappings',
            icon: RouteIcon,
            label: t('menu.processMapping'),
            permissions: [LIST_PROCESS_MAPPINGS],
          },
          {
            to: 'sprints',
            icon: RestartAlt,
            label: t('menu.sprints'),
            permissions: [LIST_SPRINTS],
          },
          {
            to: 'future-processes',
            icon: UpdateIcon,
            label: t('menu.futureProcesses'),
            permissions: [LIST_FUTURE_PROCESS],
          },
          {
            to: 'text-blocks',
            icon: BookmarkBorderOutlinedIcon,
            label: t('menu.library'),
            permissions: [LIST_TEXT_BLOCKS],
          },
        ],
      },
      {
        title: t('menu.configuration'),
        items: [
          {
            to: 'selected-processes',
            icon: FactCheckOutlined,
            label: t('menu.selectedProcesses'),
          },
        ],
      },
      {
        title: t('menu.security'),
        items: [
          {
            to: 'administration/client-users',
            icon: PeopleAltOutlined,
            label: t('menu.clientUsers'),
          },
        ],
      },
    ],
    [t]
  )

  return { components }
}
