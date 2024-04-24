import { type FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { type ProjectPublicLayoutProps } from 'components/ProjectPublicLayout/types'
import UserCard from 'components/UserCard'
import useAuth from 'features/Auth/hooks/useAuth.ts'
import useProject from 'Project/hooks/useProject.ts'
import styles from './projectPublicLayout.module.scss'
import poweredByMeta from '../../assets/poweredByMeta.svg'
const ProjectPublicLayout: FC<ProjectPublicLayoutProps> = ({ children }) => {
  const { session } = useAuth()
  const { user } = session ?? {}
  const { project } = useProject()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.projectInformation}>
          <img src={project?.logoImage ?? ''} className={styles.logo} alt="Logo" />
          <div className={styles.projectName}>
            {project?.name}
            <img src={poweredByMeta} className={styles.poweredBy} alt={'Meta'} />
          </div>
        </div>
        <div className={styles.userInformation}>
          <UserCard name={user?.name} email={user?.email} />
        </div>
      </header>
      <main className={styles.main}>
        {children}
        <Outlet />
      </main>
    </div>
  )
}
export default memo(ProjectPublicLayout)
