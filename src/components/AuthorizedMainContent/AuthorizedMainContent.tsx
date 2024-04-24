import { memo, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './authorizedMainContent.module.scss'

const AuthorizedMainContent: FC = () => {
  return (
    <div className={styles.mainContent}>
      <Outlet />
    </div>
  )
}

export default memo(AuthorizedMainContent)
