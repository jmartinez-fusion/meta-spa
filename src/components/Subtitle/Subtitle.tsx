import { type FC } from 'react'
import { type SubtitleProps } from './types'
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import styles from './subtitleProps.module.scss'

const Subtitle: FC<SubtitleProps> = ({ subtitle, goBackPath }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContent}>
        {goBackPath && (
          <IconButton
            color="primary"
            onClick={() => {
              navigate(goBackPath)
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  )
}

export default Subtitle
