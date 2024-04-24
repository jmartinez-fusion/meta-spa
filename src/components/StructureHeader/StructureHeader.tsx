import { type FC, useCallback } from 'react'
import { type StructureHeaderProps } from './types'
import styles from './structureHeader.module.scss'
import BoxIconButton from 'components/BoxIconButton'
import { useTranslation } from 'react-i18next'
import { AccountTreeOutlined, GroupsOutlined, SupervisorAccountOutlined } from '@mui/icons-material'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes.tsx'
import useProject from 'Project/hooks/useProject.ts'
import { useNavigate } from 'react-router-dom'
import { POSITIONS_PATHS } from 'Project/features/Structure/features/Positions/routes.tsx'
import Gated from 'components/Gated'
import { LIST_DEPARTMENTS, LIST_POSITIONS, LIST_STAKEHOLDERS } from 'permissions'
import { STAKEHOLDERS_PATHS } from 'Project/features/Structure/features/Stakeholders/routes.tsx'

const StructureHeader: FC<StructureHeaderProps> = ({ active }) => {
  const { t } = useTranslation('features')
  const { project } = useProject()
  const navigate = useNavigate()

  const handleClickDepartments = useCallback(() => {
    navigate(DEPARTMENTS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
  }, [navigate, project])

  const handleClickPositions = useCallback(() => {
    navigate(POSITIONS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
  }, [navigate, project])

    const handleClickStakeholders = useCallback(() => {
        navigate(STAKEHOLDERS_PATHS.LIST.replace(':projectId', project?.id ?? ''))
    }, [navigate, project])

  return (
    <div className={styles.headerContainer}>
      <Gated permissions={LIST_DEPARTMENTS}>
        <BoxIconButton
          onClick={handleClickDepartments}
          Icon={AccountTreeOutlined}
          active={active === 'departments'}
          label={t('Departments.plural')}
        />
      </Gated>
        <Gated permissions={LIST_STAKEHOLDERS}>
            <BoxIconButton
                Icon={GroupsOutlined}
                onClick={handleClickStakeholders}
                active={active === 'stakeholders'}
                label={t('Stakeholders.plural')}
            />
        </Gated>
      <Gated permissions={LIST_POSITIONS}>
        <BoxIconButton
          Icon={SupervisorAccountOutlined}
          active={active === 'positions'}
          onClick={handleClickPositions}
          label={t('Positions.plural')}
        />
      </Gated>
    </div>
  )
}

export default StructureHeader
