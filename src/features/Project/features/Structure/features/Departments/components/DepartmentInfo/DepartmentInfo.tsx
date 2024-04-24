import { type FC } from 'react'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useProject from 'Project/hooks/useProject'
import { type Department } from 'Project/features/Structure/features/Departments/types'
import styles from './departmentInfo.module.scss'
import { DEPARTMENTS_PATHS } from 'Project/features/Structure/features/Departments/routes.tsx'

const DepartmentInfo: FC<{
  department?: Department
}> = ({ department }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Departments' })
  const { project } = useProject()

  const { name, code, subDepartments, parent } = department ?? {}

  return (
    <div className={styles.boxInfo}>
      <Typography variant="h3">{name}</Typography>
      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.departmentId')}</strong>
          </span>
          <span className={styles.item}>{code}</span>
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.subDepartments')}</strong>
          </span>
          <span className={styles.item}>
            {subDepartments?.map((subDepartment) => (
              <Link
                className={styles.itemLink}
                href={DEPARTMENTS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
                  ':departmentId',
                  subDepartment.id ?? ''
                )}
                key={subDepartment.name}
              >
                {`${subDepartment.name} (${subDepartment.code})`}
              </Link>
            ))}
          </span>
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.parentDepartment')}</strong>
          </span>
          {parent && (
            <Link
              className={styles.itemLink}
              href={DEPARTMENTS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
                ':departmentId',
                parent?.id ?? ''
              )}
              key={parent?.name}
            >
              {`${parent?.name} (${parent?.code})`}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default DepartmentInfo
