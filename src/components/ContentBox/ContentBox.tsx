import c from 'classnames'
import { type FC } from 'react'
import { type ContentBoxProps } from 'components/ContentBox/types'
import styles from './contentBox.module.scss'

const ContentBox: FC<ContentBoxProps> = ({ children, isModal }) => {
  return <div className={c(styles.wrapper, isModal && styles.isModal)}>{children}</div>
}

export default ContentBox
