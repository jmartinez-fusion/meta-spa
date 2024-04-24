import React, { type ReactNode, useState } from 'react'
import { Modal, Fade } from '@mui/material'

interface ModalProps {
  children?: ReactNode
  open: boolean
  onClose: () => void
}

interface UseModalResult {
  Modal: React.FC<ModalProps>
  handleOpen: () => void
  open: boolean
  close: () => void
}

const useModal = (modalProps: any = {}): UseModalResult => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const ModalComponent: React.FC<ModalProps> = ({ children, open, onClose }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...modalProps}
      >
        <Fade in={open}>
          <div>{children}</div>
        </Fade>
      </Modal>
    )
  }

  return {
    Modal: ModalComponent,
    handleOpen,
    open,
    close: handleClose,
  }
}

export default useModal
