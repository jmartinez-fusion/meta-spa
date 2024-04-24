import { type FC, type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type DepartmentProcessMapping } from 'Project/features/ProcessMapping/types'
import { PROCESS_MAPPING_PATHS } from 'Project/features/ProcessMapping/routes'
import { VIEW_DEPARTMENT, VIEW_PROCESS_MAPPINGS } from 'permissions'
import { PROJECT_PATH } from 'features/Project/util'
import LinkWithPermissions from 'components/LinkWithPermissions'
import useProject from 'Project/hooks/useProject'
import styles from './processMappingDepartmentInfo.module.scss'

const ProcessMappingDepartmentInfo: FC<{
  rightContent?: ReactNode
  department?: DepartmentProcessMapping | undefined
}> = ({ rightContent, department }) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()

  const { name, code, subDepartments, parent, manager } = department ?? {}

  return (
    <div className={styles.boxInfo}>
      <div>
        <Typography variant="h3">{name ?? '-'}</Typography>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.departmentId')}</strong>
          </span>
          <span className={styles.item}>{code ?? '-'}</span>
        </div>

        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.parentDepartment')}</strong>{' '}
          </span>
          {parent && (
            <span className={styles.itemLink}>
              <LinkWithPermissions
                permissions={VIEW_PROCESS_MAPPINGS}
                to={
                  PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
                  '?branchCode=' +
                  name?.match(/\((.*?)\)/)?.[1]
                }
              >
                {' '}
                {parent?.name ?? '-'} ({parent?.code ?? '-'})
              </LinkWithPermissions>
            </span>
          )}
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.subDepartment')}</strong>{' '}
          </span>
          {subDepartments?.map((subDepartment) => {
            return (
              <div key={subDepartment.id} className={styles.itemLink}>
                <LinkWithPermissions
                  permissions={VIEW_DEPARTMENT}
                  to={
                    PROJECT_PATH.replace(':projectId', project?.id ?? '') +
                    'structure/departments/' +
                    subDepartment.id +
                    '/view'
                  }
                >
                  {' '}
                  {subDepartment?.name ?? '-'} ({subDepartment?.code ?? '-'})
                </LinkWithPermissions>
              </div>
            )
          })}
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.manager')}</strong>{' '}
          </span>
          {manager?.name}
        </div>
      </div>
      {rightContent}
    </div>
  )
}

export default ProcessMappingDepartmentInfo
