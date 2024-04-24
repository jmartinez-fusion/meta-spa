import { type FC, useCallback } from 'react'
import { type UploadEntitiesProps } from './types'
import ContentBox from 'components/ContentBox'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import ModalContent from 'components/ModalContent/ModalContent.tsx'
import DropZoneWrapper from 'src/components/DropZoneWrapper'
import UploadEntitiesDropbox from 'components/UploadEntitiesDropbox'
import UploadingEntities from 'components/UploadingEntities'
import styles from './uploadEntities.module.scss'

const UploadEntities: FC<UploadEntitiesProps> = ({ title, handleClose, useUploadEntities }) => {
  const { handleChangeFile, loading, uploadResult, error, file } = useUploadEntities

  const onChange = useCallback((files: File[] = []): void => {
    handleChangeFile(files[0])
  }, [])

  return (
    <ContentBox isModal>
      <ModalHeader title={title} onClose={handleClose} />
      <ModalContent>
        <div className={styles.content}>
          {(!loading && !uploadResult && !error) || !file ? (
            <>
              <DropZoneWrapper
                Component={UploadEntitiesDropbox}
                acceptedFiles={['text/csv']}
                onChange={onChange}
              />
              {error && <div className={styles.error}>{error}</div>}
            </>
          ) : (
            <UploadingEntities useUploadEntities={useUploadEntities} handleClose={handleClose} />
          )}
        </div>
      </ModalContent>
    </ContentBox>
  )
}

export default UploadEntities
