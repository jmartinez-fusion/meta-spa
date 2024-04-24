import { type FC } from 'react'
import { type UploadResultProps } from 'components/UploadingEntities/components/UploadResult/types'
import { useTranslation } from 'react-i18next'
import styles from './uploadResult.module.scss'

const UploadResult: FC<UploadResultProps> = ({ useUploadEntities }) => {
  const { t } = useTranslation('common')
  const { uploadResult, file } = useUploadEntities

  return (
    <div className={styles.resultContainer}>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error */}
      <div className={styles.filePath}>{file?.path}</div>
      <div className={styles.informationContainer}>
        <span className={styles.title}>{t('additions')}</span>
        <span>{uploadResult?.additions}</span>
      </div>
      <div className={styles.informationContainer}>
        <span className={styles.title}>{t('updates')}</span>
        <span>{uploadResult?.updates}</span>
      </div>
      <div className={styles.informationContainer}>
        <span className={styles.title}>{t('deletions')}</span>
        <span>{uploadResult?.deletions}</span>
      </div>
    </div>
  )
}

export default UploadResult
