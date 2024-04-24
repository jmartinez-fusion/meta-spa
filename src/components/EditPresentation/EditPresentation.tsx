import { type FC } from 'react'
import { type EditPresentationModalProps } from 'components/EditPresentation/types'
import ContentBox from 'components/ContentBox'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import ModalContent from 'components/ModalContent/ModalContent.tsx'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from './editPresentation.module.scss'
import Gated from 'components/Gated'

const EditPresentation: FC<EditPresentationModalProps> = ({
  children,
  handleCloseModalEdit,
  goToEditPresentation,
  handleStart,
  handleReset,
  showStart = false,
  resetPermissions,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })

  return (
    <ContentBox isModal>
      <ModalHeader title={t('editPresentation')} onClose={handleCloseModalEdit} />
      <ModalContent>
        {children}
        <div className={styles.buttonsContainer}>
          {showStart ? (
            <Gated permissions={resetPermissions}>
              <Button onClick={handleStart}>{t('start')}</Button>
            </Gated>
          ) : (
            <>
              <Gated permissions={resetPermissions}>
                <Button onClick={handleReset} variant="outlined">
                  {t('startFromScratch')}
                </Button>
              </Gated>
              <Button onClick={goToEditPresentation}>{t('editCurrentPresentation')}</Button>
            </>
          )}
        </div>
      </ModalContent>
    </ContentBox>
  )
}

export default EditPresentation
