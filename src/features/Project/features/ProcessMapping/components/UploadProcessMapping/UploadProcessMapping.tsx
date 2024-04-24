import { type FC, useCallback } from 'react'
import { type UploadProcessMappingProps } from './types'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useUploadEntities from 'hooks/useUploadEntities'
import UploadEntities from 'components/UploadEntities'
import useProject from 'Project/hooks/useProject'

const UploadProcessMapping: FC<UploadProcessMappingProps> = ({ handleClose, onSuccess }) => {
  const { project } = useProject()
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const uploadEntities = useUploadEntities(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/process-mappings`
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

export default UploadProcessMapping
