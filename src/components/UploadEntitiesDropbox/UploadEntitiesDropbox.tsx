import { type FC } from 'react'
import { SvgIcon } from '@mui/material'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import c from 'classnames'
import { type UploadEntitiesDropboxProps } from 'components/UploadEntitiesDropbox/types'
import { useTranslation } from 'react-i18next'
import styles from './uploadEntitiesDropbox.module.scss'

const UploadEntitiesDropbox: FC<UploadEntitiesDropboxProps> = ({
  isDragActive,
  handleClick,
  children,
  ...props
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={c(styles.mainContainer, isDragActive && styles.dragging)} {...props}>
      <div className={styles.icon}>
        <SvgIcon fontSize="inherit">
          <AddCircleOutlineRounded fontSize="inherit" />
        </SvgIcon>
      </div>
      <span>{t('dropYourFileHere')}</span>
      <span className={styles.subtext}>
        {t('Or')}
        <span className={styles.link}>{t('clickHere')}</span>
        {t('toSelectFromYourComputer')}
      </span>

      {children}
    </div>
  )
}

export default UploadEntitiesDropbox
