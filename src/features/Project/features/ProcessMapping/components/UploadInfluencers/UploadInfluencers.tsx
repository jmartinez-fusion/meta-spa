import { type FC, useCallback } from 'react'
import { type UploadInfluencersProps } from './types'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useUploadEntities from 'hooks/useUploadEntities'
import UploadEntities from 'components/UploadEntities'
import useProject from 'Project/hooks/useProject'

const UploadInfluencers: FC<UploadInfluencersProps> = ({
  handleClose,
  onSuccess,
  processId = '',
}) => {
  const { project } = useProject()
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const uploadEntities = useUploadEntities(
    `${config.api.msOrganization.baseUrl}/projects/${project?.id}/influencers`,
    processId
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
      title={t('influencers.uploadTitle')}
    />
  )
}

export default UploadInfluencers
