import React, { type ChangeEventHandler, type FC, useRef } from 'react'
import { Button, SvgIcon } from '@mui/material'
import { AddPhotoAlternateOutlined, PostAdd } from '@mui/icons-material'
import { type AddStepsActionsProps } from 'components/AddStepsActions/types'
import { useTranslation } from 'react-i18next'
import styles from './addStepsActions.module.scss'

const AddStepsActions: FC<AddStepsActionsProps> = ({
  onAddCaptures,
  children,
  onAddDescription,
  ...props
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })

  const handleAddDescription = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    onAddDescription()
  }

  const handleAddCapture = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    hiddenFileInput?.current?.click()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileInput = event.target

    if (fileInput.files && fileInput.files.length > 0) {
      const files = []
      for (const file of fileInput.files) {
        files.push(file)
      }
      onAddCaptures(files)
      // if (hiddenFileInput?.current?.value) {
      //   hiddenFileInput.current.value = ''
      // }
    }
  }

  return (
    <div className={styles.actions} {...props}>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
      <Button
        variant="outlined"
        fullWidth
        onClick={handleAddCapture}
        size="small"
        sx={{
          borderRadius: '10px !important',
          minHeight: '28px !important',
          height: '28px !important',
          maxHeight: '28px !important',
        }}
        startIcon={
          <SvgIcon>
            <AddPhotoAlternateOutlined />
          </SvgIcon>
        }
      >
        {t('addCapture')}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        size="small"
        onClick={handleAddDescription}
        sx={{
          borderRadius: '10px !important',
          minHeight: '28px !important',
          height: '28px !important',
          maxHeight: '28px !important',
        }}
        startIcon={
          <SvgIcon>
            <PostAdd />
          </SvgIcon>
        }
      >
        {t('addDescription')}
      </Button>
      {children}
    </div>
  )
}

export default AddStepsActions
