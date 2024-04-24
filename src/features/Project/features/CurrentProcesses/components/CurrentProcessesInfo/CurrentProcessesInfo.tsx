import { type FC, type ReactNode } from 'react'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import CurrentProcessChipStatus from 'Project/features/CurrentProcesses/components/CurrentProcessChipStatus/CurrentProcessChipStatus'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes'
import useProject from 'Project/hooks/useProject'
import styles from './currentProcessesInfo.module.scss'

const CurrentProcessesInfo: FC<{
  viewStatus?: boolean
  rightContent?: ReactNode
  currentProcess?: CurrentProcess
}> = ({ viewStatus = true, rightContent, currentProcess }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()

  const {
    currentProcess: processName,
    associatedSpc,
    associatedCurrentProcesses,
    status,
  } = currentProcess ?? {}

  return (
    <div className={styles.boxInfo}>
      <div>
        <Typography variant="h3">{processName}</Typography>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.associatedSpcs')}</strong>
          </span>
          <span className={styles.item}>
            <span>{`${associatedSpc?.name} ${associatedSpc?.branchCode}`}</span>
          </span>
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.associatedCurrentProcesses')}</strong>
          </span>
          <span className={styles.item}>
            <Link
              className={styles.itemLink}
              href={CURRENT_PROCESSES_PATHS.DETAILS.replace(
                ':projectId',
                project?.id ?? ''
              ).replace(':currentProcessId', associatedCurrentProcesses?.id ?? '')}
            >
              {associatedCurrentProcesses?.name}
            </Link>
          </span>
        </div>

        {viewStatus && (
          <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>
              <strong>{t('details.status')}</strong>
            </span>
            <span className={styles.item}>
              <CurrentProcessChipStatus status={status ?? ''} />
            </span>
          </div>
        )}
      </div>
      {rightContent}
    </div>
  )
}

export default CurrentProcessesInfo
