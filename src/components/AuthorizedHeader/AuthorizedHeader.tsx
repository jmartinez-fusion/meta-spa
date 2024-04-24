import { type FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import logo from 'src/assets/primaryLogo.svg'
import { SvgIcon } from '@mui/material'
import { MenuRounded } from '@mui/icons-material'
import { DASHBOARD } from 'src/utils/constants.ts'
import { type HeaderProps } from 'components/PrivateLayout/types'
import styles from './authorizedHeader.module.scss'

const AuthorizedHeader: FC<HeaderProps> = ({ handleClickMenu, i18n }) => {
  const { t } = useTranslation('header', { i18n })

  const handleMenuClick = useCallback(() => {
    handleClickMenu()
  }, [handleClickMenu])

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <NavLink to={DASHBOARD} title="Dashboard">
          <img src={logo} className={styles.logo} alt={t('common:projectName')} />
        </NavLink>
        <div className={styles.menuTrigger}>
          <SvgIcon onClick={handleMenuClick} titleAccess={t('menu')}>
            <MenuRounded />
          </SvgIcon>
        </div>
      </div>
    </div>
  )
}

export default memo(AuthorizedHeader)
