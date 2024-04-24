import { type FC, useCallback } from 'react'
import { type UploadPositionsProps } from './types'
import useUploadEntities from 'hooks/useUploadEntities.tsx'
import UploadEntities from 'components/UploadEntities'
import { useTranslation } from 'react-i18next'
import config from 'src/config.tsx'
import useProject from 'Project/hooks/useProject.ts'

const UploadPositions: FC<UploadPositionsProps> = ({ handleClose, onSuccess }) => {
  const { project } = useProject()
  const { t } = useTranslation('features', { keyPrefix: 'Positions' })
  const uploadEntities = useUploadEntities(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/positions`
  )
  const { uploadResult } = uploadEntities
  const onClose = useCallback(() => {
    if (uploadResult && onSuccess) {
      onSuccess()
    }
    handleClose()
  }, [handleClose, uploadResult, onSuccess])

  return (
    <UploadEntities
      useUploadEntities={uploadEntities}
      handleClose={onClose}
      title={t('create.title')}
    />
  )
}

export default UploadPositions
