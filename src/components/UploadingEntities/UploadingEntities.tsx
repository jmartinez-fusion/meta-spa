import c from 'classnames'
import { type FC } from 'react'
import { type UploadingEntitiesProps } from 'components/UploadingEntities/types'
import styles from './uploadingEntities.module.scss'
import { InsertDriveFileOutlined } from '@mui/icons-material'
import UploadError from 'components/UploadingEntities/components/UploadErrors'
import UploadResult from 'components/UploadingEntities/components/UploadResult'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const UploadingEntities: FC<UploadingEntitiesProps> = ({ useUploadEntities, handleClose }) => {
  const { t } = useTranslation('common')
  const { file, progress, uploadResult, error } = useUploadEntities
  return (
    <div className={styles.mainContainer}>
      <div className={c(styles.contentContainer, error && styles.error)}>
        {!uploadResult && !error ? (
          <div className={styles.uploadingContainer}>
            <InsertDriveFileOutlined />
            <div className={styles.uploadStatus}>
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error */}
              <div className={styles.filePath}>{file?.path}</div>
              <div className={styles.fileSize}>{file?.size} bytes</div>
              <div className={styles.progressBarContainer}>
                <div className={styles.wrapper}>
                  <div className={styles.filler} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.value}>{(progress || progress === 0) && `${progress}%`}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.finishedUploadContainer}>
            {error && <UploadError useUploadEntities={useUploadEntities} />}
            {uploadResult && <UploadResult useUploadEntities={useUploadEntities} />}
          </div>
        )}
      </div>
      <Button onClick={handleClose}>{t('done')}</Button>
    </div>
  )
}

export default UploadingEntities
