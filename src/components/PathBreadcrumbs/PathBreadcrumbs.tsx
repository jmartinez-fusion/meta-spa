import c from 'classnames'
import { type FC } from 'react'
import { type BreadcrumbsProps } from 'components/PathBreadcrumbs/types'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import styles from './pathBreadcrumbs.module.scss'

const PathBreadcrumbs: FC<BreadcrumbsProps> = ({ itemsBreadcrumbs }) => {
  return (
    <div className={styles.content}>
      <Breadcrumbs aria-label="breadcrumb">
        {itemsBreadcrumbs.map((item, index) => (
          <Link
            key={`breadcrumb_${index}`}
            href={item.path}
            title={item.title}
            className={c(styles.link, item.active ? styles.active : '')}
          >
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  )
}

export default PathBreadcrumbs
