import { type FC } from 'react'
import { Breadcrumbs, Typography, IconButton, Tooltip } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { PROCESS_MAPPING_PATHS } from 'Project/features/ProcessMapping/routes'
import { type ProcessMappingPath } from './types'
import { VIEW_PROCESS_MAPPINGS } from 'permissions'
import LinkWithPermissions from 'components/LinkWithPermissions'
import useProject from 'Project/hooks/useProject'
import styles from './processMappingBreadcrumbs.module.scss'

const ProcessMappingBreadcrumbs: FC<{ processMappingPaths: ProcessMappingPath[] }> = ({
  processMappingPaths,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()
  const navigate = useNavigate()

  const handleGoToProcessMapping = (): void => {
    navigate(PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? ''))
  }

  return (
    <Breadcrumbs
      separator={
        <ArrowForwardIosIcon sx={{ fontSize: 14, display: 'flex', alignSelf: 'flex-start' }} />
      }
      aria-label="breadcrumb"
    >
      <div className={styles.itemsBreadcrumbs}>
        <IconButton
          color="secondary"
          aria-label="hide"
          size="small"
          onClick={handleGoToProcessMapping}
        >
          <Tooltip title={t('singular')}>
            <HomeIcon sx={{ fontSize: 14 }} />
          </Tooltip>
        </IconButton>
      </div>
      {processMappingPaths.map((path: ProcessMappingPath) => (
        <div key={path.code} className={styles.itemsBreadcrumbs}>
          <LinkWithPermissions
            permissions={VIEW_PROCESS_MAPPINGS}
            to={
              PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
              '?branchCode=' +
              path.code
            }
          >
            <Typography variant="h3">{path.name}</Typography>
          </LinkWithPermissions>
          <span>{path.code}</span>
        </div>
      ))}
    </Breadcrumbs>
  )
}

export default ProcessMappingBreadcrumbs
