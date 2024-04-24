import { type FC, type ReactNode } from 'react'
import { Typography, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type FutureProcessDetail } from 'Project/features/FutureProcesses/types'
import FutureProcessChipStatus from 'Project/features/FutureProcesses/components/FutureProcessChipStatus/FutureProcessChipStatus'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import useProject from 'Project/hooks/useProject'
import styles from './futureProcessesInfo.module.scss'

const FutureProcessesInfo: FC<{
  viewStatus?: boolean
  rightContent?: ReactNode
  futureProcess?: FutureProcessDetail
}> = ({ viewStatus = true, rightContent, futureProcess }) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()

  const { futureProcessName, spc, processId, parentProcessName, subProcess, status } =
    futureProcess ?? {}

  return (
    <div className={styles.boxInfo}>
      <div>
        <Typography variant="h3">{futureProcessName}</Typography>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.processId')}</strong>
          </span>
          <span className={styles.item}>{processId}</span>
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.processName')}</strong>
          </span>
          <span className={styles.item}>{spc}</span>
        </div>
        {parentProcessName && (
          <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>
              <strong>{t('details.parentProcess')}</strong>{' '}
            </span>
            <span className={styles.item}>
              <Link
                className={styles.itemLink}
                href={
                  FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '') +
                  '?branchCode=' +
                  parentProcessName?.match(/\((.*?)\)/)?.[1]
                }
              >
                {' '}
                {parentProcessName}
              </Link>
            </span>
          </div>
        )}
        {subProcess && subProcess.length > 0 && (
          <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>
              <strong>{t('details.subProcesses')}</strong>{' '}
            </span>
            <span className={styles.item}>
              {subProcess.map((subProcess) => (
                <Link
                  className={styles.itemLink}
                  key={subProcess.futureProcessName}
                  href={
                    FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '') +
                    '?branchCode=' +
                    subProcess.futureProcessName?.match(/\((.*?)\)/)?.[1]
                  }
                >
                  {' '}
                  {subProcess.futureProcessName}
                </Link>
              ))}
            </span>
          </div>
        )}
        {viewStatus && (
          <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>
              <strong>{t('details.status')}</strong>
            </span>
            <span className={styles.item}>
              <FutureProcessChipStatus status={status ?? ''} />
            </span>
          </div>
        )}
      </div>
      {rightContent}
    </div>
  )
}

export default FutureProcessesInfo
