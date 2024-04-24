import { type FC, type ReactNode } from 'react'
import secondaryLogo from 'src/assets/secondaryLogo.svg'
import c from 'classnames'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './publicLayout.module.scss'

interface PublicLayoutProps {
  children?: ReactNode
  title?: string | null
  secondary?: boolean
  subtitle?: string | null
}

const PublicLayout: FC<PublicLayoutProps> = ({ title, subtitle, secondary, children }) => {
  const { t } = useTranslation('authLayout')
  return (
    <div className={c(styles.layoutContainer, secondary && styles.secondaryLayoutContainer)}>
      <div className={styles.brandSection}>
        <img
          src={secondaryLogo}
          className={c(styles.logo, styles.onlyDesktop)}
          alt={t('projectName')}
        />
        <div className={styles.projectInformation}>
          <span className={styles.projectName}>{t('projectName')}</span>
          <span className={styles.projectNameDescription}>{t('projectNameDescription')}</span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PublicLayout
