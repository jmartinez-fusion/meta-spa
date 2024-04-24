import React from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './modalHeader.module.scss'

interface HeaderProps {
  onClose: () => void
  title: string
}

const ModalHeader: React.FC<HeaderProps> = ({ onClose, title }) => {
  return (
    <header className={styles.modalHeader}>
      <div className={styles.modalHeaderTitle}>{title}</div>
      <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
        <CloseIcon />
      </IconButton>
    </header>
  )
}

export default ModalHeader
