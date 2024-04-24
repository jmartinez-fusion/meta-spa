import { type FC } from 'react'
import { type GenericErrorProps } from 'components/GenericError/types'
import styles from './genericError.module.scss'

const GenericError: FC<GenericErrorProps> = ({ error }) => {
  if (!error) {
    return null
  }

  return <div className={styles.error}>{error}</div>
}

export default GenericError
