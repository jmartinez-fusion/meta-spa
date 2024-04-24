import { type FC } from 'react'
import styles from './selectTypeCapturing.module.scss'
import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UploadOutlined } from '@mui/icons-material'
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import CaptureExtension from 'components/CaptureExtension'
import { type ProcessModule } from 'types/processModule'

interface SelectTypeCapturingProps {
  onSelectTypeCapturing: (typeCapturingSelected: string) => void
  module: ProcessModule
  processId: string
}

const SelectTypeCapturing: FC<SelectTypeCapturingProps> = ({
  onSelectTypeCapturing,
  processId,
  module,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })
  return (
    <div className={styles.boxTypes}>
      <div className={styles.boxType}>
        <UploadOutlined />
        <Typography variant="h2">{t('manualUploadToCmTool')}</Typography>
        <p>{t('manualMsg')}</p>
        <Button
          onClick={(): void => {
            onSelectTypeCapturing('manual')
          }}
        >
          {t('manualBtn')}
        </Button>
      </div>
      <div className={styles.boxType}>
        <ExtensionOutlinedIcon />
        <Typography variant="h2">{t('captureBrowserBasedProcess')}</Typography>
        <p>{t('captureMsg')}</p>
        <CaptureExtension processId={processId} module={module}>
          <Button>{t('captureBtn')}</Button>
        </CaptureExtension>
      </div>
    </div>
  )
}

export default SelectTypeCapturing
