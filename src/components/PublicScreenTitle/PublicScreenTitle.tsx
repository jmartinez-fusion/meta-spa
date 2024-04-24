import { type FC } from 'react'
import { type PublicScreenTitleProps } from './types'
import { IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import styles from './publicScreenTitle.module.scss'

const PublicScreenTitle: FC<PublicScreenTitleProps> = ({ title, subtitle, goBackPath }) => {
  const navigate = useNavigate()

  const handleGoBack = (): void => {
    navigate(-1)
  }

  return (
    <div className={styles.wrapper}>
      {goBackPath && (
        <IconButton className={styles.goBackButton} color="primary" onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
      )}
      <div className={styles.contentContainer}>
        <Typography variant="h1">{title}</Typography>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  )
}

export default PublicScreenTitle
