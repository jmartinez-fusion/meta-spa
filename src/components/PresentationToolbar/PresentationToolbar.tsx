import { type FC } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AddStepsActions from 'components/AddStepsActions'
import LoadingButton from '@mui/lab/LoadingButton'
import { type PresentationToolbarProps } from 'components/PresentationToolbar/types'
import styles from './presentationToolbar.module.scss'
import c from 'classnames'

const PresentationToolbar: FC<PresentationToolbarProps> = ({
  onAddCaptures,
  children,
  onAddDescription,
  onDiscardChanges,
  onSave,
  isSaving,
  isDragActive,
  ...props
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })

  return (
    <div className={c(styles.floatingActions, isDragActive && styles.dragActive)}>
      <AddStepsActions
        onAddCaptures={onAddCaptures}
        onAddDescription={onAddDescription}
        {...props}
      />
      <div className={styles.buttons}>
        <Button variant="outlined" fullWidth onClick={onDiscardChanges}>
          {t('discardChanges')}
        </Button>
        <LoadingButton fullWidth onClick={onSave} loading={isSaving}>
          {t('common:save')}
        </LoadingButton>
      </div>
      {children}
    </div>
  )
}

export default PresentationToolbar
