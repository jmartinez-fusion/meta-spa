import { type FC } from 'react'
import { type BoxIconButtonProps } from './types'
import styles from './boxIconButton.module.scss'
import c from 'classnames'
import { SvgIcon } from '@mui/material'

const BoxIconButton: FC<BoxIconButtonProps> = ({ label, Icon, active, onClick = () => null }) => {
  return (
    <div className={c(styles.mainContainer, active && styles.active)} onClick={onClick}>
      <div className={styles.icon}>
        <SvgIcon fontSize="inherit">
          <Icon />
        </SvgIcon>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default BoxIconButton
