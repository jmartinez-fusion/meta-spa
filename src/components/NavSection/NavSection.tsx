import { type FC } from 'react'
import c from 'classnames'
import Gated from 'components/Gated'
import MenuButton from 'components/MenuButton/MenuButton.tsx'
import { type NavSectionProps } from 'components/NavSection/types'
import styles from './navSection.module.scss'

const NavSection: FC<NavSectionProps> = ({ navSection, collapsed = false }) => {
  const { title, items } = navSection
  let unifiedPermissions: string[] | undefined

  items.forEach((item) => {
    if (item.permissions) {
      if (!unifiedPermissions) {
        unifiedPermissions = []
      }

      if (Array.isArray(item.permissions)) {
        unifiedPermissions = [...unifiedPermissions, ...item.permissions]
      } else {
        unifiedPermissions.push(item.permissions)
      }
    }
  })

  return (
    <Gated permissions={unifiedPermissions} orValidation>
      <div className={c(styles.navSection, collapsed && styles.collapsed)}>
        {title && <div className={styles.navigationTitle}>{title}</div>}
        {items.map(({ to, icon, permissions, label, orValidation }, i) => (
          <MenuButton
            key={`navItem_${to}_${i}`}
            icon={icon}
            to={to}
            orValidation={orValidation}
            label={label}
            collapsed={collapsed}
            permissions={permissions}
          />
        ))}
      </div>
    </Gated>
  )
}

export default NavSection
