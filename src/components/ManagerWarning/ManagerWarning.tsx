import { type FC } from 'react'
import { SvgIcon, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from './managerWarning.module.scss'
import { ShieldOutlined } from '@mui/icons-material'

const ManagerWarning: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })

  return (
    <Tooltip title={t('manager')}>
      <div className={styles.managerIcon}>
        <SvgIcon fontSize="inherit">
          <ShieldOutlined />
        </SvgIcon>
      </div>
    </Tooltip>
  )
}

export default ManagerWarning
