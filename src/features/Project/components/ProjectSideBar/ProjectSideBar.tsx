import { type FC } from 'react'
import c from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'
import { type SidebarProps } from 'components/PrivateLayout/types'
import MenuButton from 'components/MenuButton'
import useAuth from 'src/features/Auth/hooks/useAuth.ts'
import { ArrowBack, LogoutRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import UserCard from 'components/UserCard'
import NavSection from 'components/NavSection'
import styles from './projectSideBar.module.scss'
import useProject from 'src/features/Project/hooks/useProject.ts'
import { IconButton } from '@mui/material'
import poweredByMeta from 'src/assets/poweredByMeta.svg'
import { PROJECTS_PATHS } from 'Projects/routes.tsx'

const ProjectSideBar: FC<SidebarProps> = ({ collapsed = false, sidebarComponents = [] }) => {
  const { session } = useAuth()
  const { project } = useProject()
  const navigate = useNavigate()
  const { t } = useTranslation('menu')
  const { user } = session ?? {}

  return (
    <div className={c(styles.authorizedNavBarContainer, collapsed && styles.collapsed)}>
      <div className={styles.headerIconsContainer}>
        <NavLink to={`/project/${project?.id}`} title="Logo" className={styles.logo}>
          <img
            src={project?.logoImage ?? ''}
            className={c(!collapsed ? styles.wideLogo : styles.compactLogo)}
            alt="Logo"
          />
          <img src={poweredByMeta} className={styles.poweredBy} alt={'Meta'} />
        </NavLink>
        <UserCard name={user?.name} email={user?.email} />
      </div>
      <div className={styles.projectName}>
        <IconButton
          className={styles.goBackButton}
          color="primary"
          size="medium"
          onClick={() => {
            navigate(PROJECTS_PATHS.LIST)
          }}
        >
          <ArrowBack sx={{ fontSize: '14px !important' }} />
        </IconButton>
        {project?.name}
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

export default ProjectSideBar
