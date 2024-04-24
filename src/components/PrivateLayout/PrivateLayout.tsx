import { type FC, memo, useCallback, useEffect, useState } from 'react'
import c from 'classnames'
import { useLocation } from 'react-router-dom'
import styles from './privateLayout.module.scss'
import { type PrivateLayoutProps } from 'components/PrivateLayout/types'
import AuthorizedNavBar from 'components/AuthorizedNavBar'
import AuthorizedMainContent from 'components/AuthorizedMainContent'
import AuthorizedHeader from 'components/AuthorizedHeader'
import useSidebarComponents from 'src/hooks/useSidebarComponents'

const PrivateLayout: FC<PrivateLayoutProps> = ({
  sidebar: Sidebar = AuthorizedNavBar,
  header: Header = AuthorizedHeader,
  mainContent: MainContent = AuthorizedMainContent,
  sidebarComponents = useSidebarComponents().components,
  children,
}) => {
  const [visibleMobileSideBar, setVisibleMobileSideBar] = useState(false)
  const [collapsedSideBar, setCollapsedSideBar] = useState(false)

  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setVisibleMobileSideBar(false)
    }, 100)
  }, [location])

  const handleClickMenu = useCallback(() => {
    setVisibleMobileSideBar((prevVisibleMobileSideBar) => !prevVisibleMobileSideBar)
  }, [])

  const handleClickCollapse = useCallback(() => {
    setCollapsedSideBar((prevCollapsedSideBar) => !prevCollapsedSideBar)
  }, [])

  return (
    <div className={c(styles.wrapper, collapsedSideBar && styles.collapsedSideBar)}>
      <header className={styles.header}>
        <Header handleClickMenu={handleClickMenu} />
      </header>
      <div className={c(styles.overlay, visibleMobileSideBar && styles.visibleOverlay)} />
      <nav className={c(styles.sidebar, visibleMobileSideBar && styles.visibleMobileSideBar)}>
        <Sidebar
          handleClickMenu={handleClickMenu}
          collapsed={collapsedSideBar}
          handleClickCollapse={handleClickCollapse}
          sidebarComponents={sidebarComponents}
        />
      </nav>
      <main className={styles.main}>
        <MainContent />
        {children}
      </main>
    </div>
  )
}
export default memo(PrivateLayout)
