import { type FC } from 'react'
import { type FormBoxProps } from 'components/FormBox/types'
import styles from './formBox.module.scss'

const FormBox: FC<FormBoxProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default FormBox
