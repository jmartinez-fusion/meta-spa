import { useState, type FC, useCallback, type ChangeEvent, useEffect } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PersonAddAlt, SyncAlt } from '@mui/icons-material'
import ManagerWarning from 'components/ManagerWarning'
import useProject from 'Project/hooks/useProject'
import LinkWithPermissions from 'components/LinkWithPermissions'
import { CREATE_STAKEHOLDER_USER, VIEW_DEPARTMENT } from 'permissions'
import Gated from 'components/Gated'
import Select from 'components/Select'
import useGetOptions from 'hooks/useGetOptions'
import { type StakeholderDetail } from 'Project/features/Structure/features/Stakeholders/types'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes'
import useCreateStakeholderUser from 'Project/features/Structure/features/Stakeholders/hooks/useCreateStakeholderUser'
import usePatchStakeholderProjectRole from 'Project/features/Structure/features/Stakeholders/hooks/usePatchStakeholderProjectRole'
import styles from './stakeholderInfo.module.scss'

const StakeholderInfo: FC<{
  stakeholder?: StakeholderDetail
  onCreateUser: () => void
}> = ({ stakeholder, onCreateUser }) => {
  const { project } = useProject()

  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })
  const { id, name, code, email, departments = [], isUser, projectRole } = stakeholder ?? {}
  const { projectRolesOptions } = useGetOptions(['projectRoles'])
  const { onClickOpenConfirm } = useCreateStakeholderUser(id ?? '', onCreateUser)
  const { onSubmit } = usePatchStakeholderProjectRole(() => null)
  const [visibleProjectRoles, setVisibleProjectRoles] = useState(false)
  const [projectRoleSelected, setProjectRoleSelected] = useState('')

  const onClickChangeProjectRole = (): void => {
    setVisibleProjectRoles(true)
  }

  const handleOnChangeProjectRole = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      const selectedRoleName =
        projectRolesOptions.find((role) => role.id === e.target.value)?.name || ''
      setProjectRoleSelected(selectedRoleName as string)
      setVisibleProjectRoles(false)
      onSubmit({ id: e.target.value })
      onCreateUser()
    },
    [projectRole]
  )

  useEffect(() => {
    // TODO: Refactor this
    if (typeof projectRole === 'object' && projectRole !== null && 'name' in projectRole) {
      setProjectRoleSelected(projectRole.name)
    }
  }, [projectRole])

  return (
    <div className={styles.boxInfo}>
      <Typography variant="h3">{name}</Typography>
      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.stakeholderId')}</strong>
          </span>
          <span className={styles.item}>{code}</span>
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.email')}</strong>
          </span>
          <span className={styles.item}>
            {email}
            {!isUser && (
              <Gated permissions={CREATE_STAKEHOLDER_USER}>
                <div className={styles.createUser}>
                  <IconButton
                    aria-label="hide"
                    size="small"
                    onClick={onClickOpenConfirm}
                    color="inherit"
                  >
                    <Tooltip title={t('createUser.action')}>
                      <PersonAddAlt sx={{ fontSize: 14 }} />
                    </Tooltip>
                  </IconButton>
                </div>
              </Gated>
            )}
          </span>
        </div>

        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.projectRole')}</strong>
          </span>
          {!visibleProjectRoles && (
            <span className={styles.item}>{projectRoleSelected ?? '-'}</span>
          )}
          {visibleProjectRoles && (
            <Select
              options={projectRolesOptions}
              name="projectRole"
              variant="filled"
              value={typeof projectRole === 'object' && projectRole !== null ? projectRole.id : ''}
              onChange={handleOnChangeProjectRole}
              sx={{ width: '100%' }}
            />
          )}
          <div className={styles.createUser}>
            <IconButton
              aria-label="hide"
              size="small"
              onClick={onClickChangeProjectRole}
              color="inherit"
            >
              <Tooltip title={t('changeProjectRole.title')}>
                <SyncAlt sx={{ fontSize: 14 }} />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.departmentsContainer}>
        {departments.map((departmentDetail) => (
          <div className={styles.department} key={departmentDetail.id}>
            <div className={styles.departmentNameLabel}>{t('department')}</div>
            <div className={styles.departmentName}>
              <LinkWithPermissions
                permissions={VIEW_DEPARTMENT}
                to={DEPARTMENTS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
                  ':departmentId',
                  departmentDetail.id
                )}
              >
                {departmentDetail.name}
              </LinkWithPermissions>
              {departmentDetail.manager && <ManagerWarning />}
            </div>
            <div className={styles.positionsLabel}>{t('position')}</div>
            <div className={styles.positionsValue}>{departmentDetail.positions.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StakeholderInfo
