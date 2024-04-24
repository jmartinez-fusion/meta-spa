import { type FC } from 'react'
import classNames from 'classnames'
import styles from './loadingRing.module.scss'

interface LoadingRingProps {
  small?: boolean
  center?: boolean
  absolute?: boolean
}

const LoadingRing: FC<LoadingRingProps> = ({ small, center, absolute }) => (
  <div className={classNames(center && styles.center, absolute && styles.absolute)}>
    <div className={classNames(styles.loadingRing, small && styles.small)}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default LoadingRing
