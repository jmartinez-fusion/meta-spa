import { type FC, useCallback } from 'react'
import { type TextBlockReference } from 'Project/features/TextBlocks/types'
import styles from 'Project/features/Surveys/screen/SurveyAnswer/surveyAnswer.module.scss'
import { Drawer, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TextBlocksLinking from 'Project/features/TextBlocks/screen/TextBlocksLinking/TextBlocksLinking.tsx'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

interface TextBlockLinkerModalProps {
  reference?: TextBlockReference
  handleClose: () => void
}

const TextBlockLinkerModal: FC<TextBlockLinkerModalProps> = ({ reference, handleClose }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { enqueueSnackbar } = useSnackbar()

  const handleSuccess = useCallback(() => {
    const message = t('textBlockLinkedSuccessfully')

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })

    handleClose()
  }, [handleClose, enqueueSnackbar])

  return (
    <Drawer open={!!reference?.id} variant="persistent" anchor="bottom">
      <div className={styles.closeIcon}>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      {!!reference && <TextBlocksLinking reference={reference} onSuccess={handleSuccess} />}
    </Drawer>
  )
}

export default TextBlockLinkerModal
