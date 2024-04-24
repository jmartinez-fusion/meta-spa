import React, { type ReactNode, useState } from 'react'
import { Modal, Fade } from '@mui/material'

interface ModalProps {
  children?: ReactNode
  open: boolean
  onClose: () => void
}

interface UseModalResult {
  Modal: React.FC<ModalProps>
  open: () => void
  close: () => void
}

const useModal = (): UseModalResult => {
  const [, setOpen] = useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const ModalComponent: React.FC<ModalProps> = ({ children, open, onClose }) => {
    // Usa directamente la prop open
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <div>{children}</div>
        </Fade>
      </Modal>
    )
  }

  return {
    Modal: ModalComponent,
    open: handleOpen,
    close: handleClose,
  }
}

export default useModal
