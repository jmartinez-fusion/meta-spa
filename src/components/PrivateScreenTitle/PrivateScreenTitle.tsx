import { type FC } from 'react'
import { type PrivateScreenTitleProps } from './types'
import { IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import styles from './privateScreenTitle.module.scss'

const PrivateScreenTitle: FC<PrivateScreenTitleProps> = ({
  title,
  goBackPath,
  onGoBack,
  rightContent,
}) => {
  const navigate = useNavigate()

  const handleGoBack = (): void => {
    navigate(-1)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContent}>
        {(goBackPath ?? onGoBack) && (
          <IconButton
            className={styles.goBackButton}
            color="primary"
            onClick={() => {
              if (onGoBack) {
                onGoBack()
              } else {
                handleGoBack()
              }
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <div className={styles.contentContainer}>
          <Typography variant="h1">{title}</Typography>
        </div>
      </div>
      {rightContent}
    </div>
  )
}

export default PrivateScreenTitle
