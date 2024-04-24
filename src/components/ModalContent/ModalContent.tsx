import React from 'react'
import styles from './modalContent.module.scss'
import { type ModalContentProps } from './types'

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <main className={styles.modalContent}>{children}</main>
}

export default ModalContent
