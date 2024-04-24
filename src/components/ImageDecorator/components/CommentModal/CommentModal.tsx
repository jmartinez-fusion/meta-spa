import { type FC, useEffect, useState } from 'react'
import { Button, SvgIcon, Tooltip } from '@mui/material'
import { type CommentModalProps } from './types'
import styles from './commentModal.module.scss'
import { useTranslation } from 'react-i18next'
import RichTextEditor from 'components/RichTextEditor/RichTextEditor.tsx'
import { DeleteForeverOutlined } from '@mui/icons-material'

const CommentModal: FC<CommentModalProps> = ({
  onClose,
  onDelete,
  readOnly = false,
  element,
  onConfirm,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })
  const [comment, setComment] = useState(element?.savedComment || undefined)

  const onSubmit = (): void => {
    onConfirm(comment)
    setComment(undefined)
  }

  useEffect(() => {
    setComment(element?.savedComment || undefined)
  }, [element?.savedComment])

  return (
    <div className={styles.modalContent}>
      <RichTextEditor
        disabled={readOnly}
        value={element?.savedComment}
        onChange={(value) => {
          setComment(value)
        }}
      />
      {!readOnly && (
        <div className={styles.actions}>
          <>
            <Button onClick={onClose} variant="outlined">
              {t('common:cancel')}
            </Button>
            <Button variant="contained" onClick={onSubmit}>
              {t('common:save')}
            </Button>
          </>

          {element?.savedComment && (
            <Tooltip title={t('deleteComment')}>
              <SvgIcon
                fontSize="inherit"
                className={styles.deleteButton}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <DeleteForeverOutlined />
              </SvgIcon>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentModal
