import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import StructureHeader from 'components/StructureHeader'
import useModal from 'hooks/useModal.tsx'
import Gated from 'components/Gated'
import { UPLOAD_STAKEHOLDERS } from 'permissions'
import { STAKEHOLDERS_PATHS } from 'Project/features/Structure/features/Stakeholders/routes.tsx'
import UploadStakeholders from 'src/features/Project/features/Structure/features/Stakeholders/components/UploadStakeholders'
import useFetchStakeholderDetail from 'Project/features/Structure/features/Stakeholders/hooks/useFetchStakeholderDetail.tsx'
import LoadingRing from 'components/LoadingRing'
import Subtitle from 'components/Subtitle'
import StakeholderInfo from 'Project/features/Structure/features/Stakeholders/components/StakeholderInfo/StakeholderInfo.tsx'
import styles from './stakeholderDetail.module.scss'

const StakeholderDetail: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })
  const { projectId, stakeholderId } = useParams()
  const { stakeholder, loading, refresh } = useFetchStakeholderDetail({ id: stakeholderId })

  const {
    Modal: ModalUploadStakeholders,
    close: closeUploadStakeholders,
    open,
    handleOpen,
  } = useModal()

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: STAKEHOLDERS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('plural'),
      path: STAKEHOLDERS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('view'),
      path: STAKEHOLDERS_PATHS.DETAILS.replace(':projectId', projectId ?? '').replace(
        ':stakeholderId',
        stakeholderId ?? ''
      ),
      active: true,
    },
  ]

  const handleClickAdd = useCallback(() => {
    handleOpen()
  }, [navigate])

  if (loading) {
    return <LoadingRing center small />
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <Gated permissions={UPLOAD_STAKEHOLDERS}>
            <Button onClick={handleClickAdd} endIcon={<FileUploadOutlined />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <StructureHeader active="stakeholders" />
      <Subtitle
        subtitle={t('plural')}
        goBackPath={STAKEHOLDERS_PATHS.LIST.replace(':projectId', projectId ?? '')}
      />
      {loading ? (
        <LoadingRing center small />
      ) : (
        <>
          <div className={styles.stakeholderInfo}>
            <StakeholderInfo stakeholder={stakeholder} onCreateUser={refresh} />
          </div>
          <ModalUploadStakeholders open={open && !loading} onClose={closeUploadStakeholders}>
            <UploadStakeholders handleClose={closeUploadStakeholders} onSuccess={console.log} />
          </ModalUploadStakeholders>
        </>
      )}
    </div>
  )
}

export default StakeholderDetail
