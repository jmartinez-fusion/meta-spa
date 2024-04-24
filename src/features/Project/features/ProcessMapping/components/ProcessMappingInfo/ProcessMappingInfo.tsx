import { type FC, type ReactNode } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { VIEW_PROCESS_MAPPINGS } from 'permissions'
import LinkWithPermissions from 'components/LinkWithPermissions'
import { type ProcessMappingDetail } from 'Project/features/ProcessMapping/types'
import ProcessMappingChipStatus from 'Project/features/ProcessMapping/components/ProcessMappingChipStatus'
import { PROCESS_MAPPING_PATHS } from 'Project/features/ProcessMapping/routes'
import useProject from 'Project/hooks/useProject'
import styles from './processMappingInfo.module.scss'

const ProcessMappingInfo: FC<{
  viewStatus?: boolean
  rightContent?: ReactNode
  processMapping?: ProcessMappingDetail
}> = ({ viewStatus = true, rightContent, processMapping }) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()

  const { futureProcessName, visibleCode, spc, parentProcessName, subProcess, mappedStatus } =
    processMapping ?? {}

  return (
    <div className={styles.boxInfo}>
      <div>
        <Typography variant="h3">{futureProcessName}</Typography>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>
            <strong>{t('details.processId')}</strong>
          </span>
          <span className={styles.item}>{visibleCode}</span>
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
            <span className={styles.itemLink}>
              <LinkWithPermissions
                permissions={VIEW_PROCESS_MAPPINGS}
                to={
                  PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
                  '?branchCode=' +
                  parentProcessName?.match(/\((.*?)\)/)?.[1]
                }
              >
                {' '}
                {parentProcessName}
              </LinkWithPermissions>
            </span>
          </div>
        )}
        {subProcess && subProcess.length > 0 && (
          <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>
              <strong>{t('details.subProcesses')}</strong>{' '}
            </span>
            <span className={styles.itemLink}>
              {subProcess.map((subProcess) => (
                <LinkWithPermissions
                  key={subProcess.futureProcessName}
                  permissions={VIEW_PROCESS_MAPPINGS}
                  to={
                    PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
                    '?branchCode=' +
                    subProcess.futureProcessName?.match(/\((.*?)\)/)?.[1]
                  }
                >
                  {' '}
                  {subProcess.futureProcessName}
                </LinkWithPermissions>
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
              <ProcessMappingChipStatus status={mappedStatus} />
            </span>
          </div>
        )}
      </div>
      {rightContent}
    </div>
  )
}

export default ProcessMappingInfo
