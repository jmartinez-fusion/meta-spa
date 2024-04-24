import { memo, type FC } from 'react'
import c from 'classnames'
import Gated from 'src/components/Gated'
import styles from './menuButton.module.scss'
import { NavLink } from 'react-router-dom'
import { type MenuButtonProps } from 'components/MenuButton/types/menuButtonTypes'
import { Icon } from '@mui/material'

const MenuButton: FC<MenuButtonProps> = ({
  icon,
  label,
  to,
  collapsed = false,
  orValidation,
  permissions = 'yes',
}) => {
  return (
    <Gated permissions={permissions} orValidation={orValidation}>
      <NavLink
        className={(navData: any) =>
          c(
            styles.menuButton,
            navData.isActive ? styles.menuButtonActive : 'none',
            collapsed && styles.collapsed
          )
        }
        to={to}
      >
        <Icon component={icon} className={styles.icon} />
        <span className={styles.label}>{label}</span>
      </NavLink>
    </Gated>
  )
}

export default memo(MenuButton)
