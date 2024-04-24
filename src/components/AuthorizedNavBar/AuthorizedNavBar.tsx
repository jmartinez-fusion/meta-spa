import { type FC } from 'react'
import c from 'classnames'
import { NavLink } from 'react-router-dom'
import logo from 'src/assets/primaryLogo.svg'
import { type SidebarProps } from 'components/PrivateLayout/types'
import MenuButton from 'components/MenuButton'
import useAuth from 'src/features/Auth/hooks/useAuth.ts'
import { LogoutRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import UserCard from 'components/UserCard'
import styles from './authorizedNavBar.module.scss'
import NavSection from 'components/NavSection'
import { DASHBOARD } from 'src/utils/constants.ts'

const AuthorizedNavBar: FC<SidebarProps> = ({ collapsed = false, sidebarComponents = [] }) => {
  const { session } = useAuth()
  const { t } = useTranslation('menu')
  const { user } = session ?? {}

  return (
    <div className={c(styles.authorizedNavBarContainer, collapsed && styles.collapsed)}>
      <div className={styles.headerIconsContainer}>
        <NavLink to={DASHBOARD} title="Logo" className={styles.logo}>
          <img
            src={logo}
            className={c(!collapsed ? styles.wideLogo : styles.compactLogo)}
            alt="Logo"
          />
        </NavLink>
        <UserCard name={user?.name} email={user?.email} />
      </div>
      <div className={styles.navContainer}>
        {sidebarComponents.map((navSection, i) => (
          <NavSection
            key={`navSection_${navSection.title}_${i}`}
            navSection={navSection}
            collapsed={collapsed}
          />
        ))}
      </div>
      <div className={styles.bottomSection}>
        <MenuButton
          icon={LogoutRounded}
          to={'/auth/logout'}
          collapsed={collapsed}
          label={t('logout')}
        />
      </div>
    </div>
  )
}

export default AuthorizedNavBar
