import { type FC } from 'react'
import { Breadcrumbs, Typography, Link, IconButton, Tooltip } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import { type FutureProcessPath } from './types'
import useProject from 'Project/hooks/useProject'
import styles from './futureProcessesBreadcrumbs.module.scss'

const FutureProcessesBreadcrumbs: FC<{ futureProcessPaths: FutureProcessPath[] }> = ({
  futureProcessPaths,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()
  const navigate = useNavigate()

  const handleGoToFutureProcesses = (): void => {
    navigate(FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''))
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
          onClick={handleGoToFutureProcesses}
        >
          <Tooltip title={t('singular')}>
            <HomeIcon sx={{ fontSize: 14 }} />
          </Tooltip>
        </IconButton>
      </div>
      {futureProcessPaths.map((path: FutureProcessPath) => (
        <div key={path.code} className={styles.itemsBreadcrumbs}>
          <Link
            color="inherit"
            underline="none"
            href={
              FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '') +
              '?branchCode=' +
              path.code
            }
          >
            <Typography variant="h3">{path.name}</Typography>
          </Link>
          <span>{path.code}</span>
        </div>
      ))}
    </Breadcrumbs>
  )
}

export default FutureProcessesBreadcrumbs
