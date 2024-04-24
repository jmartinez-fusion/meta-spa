import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { ArrowBack, VisibilityOutlined, PersonAddAlt } from '@mui/icons-material'
import { CREATE_STAKEHOLDER_USER, VIEW_STAKEHOLDERS } from 'permissions'
import LinkWithPermissions from 'components/LinkWithPermissions'
import Gated from 'components/Gated'
import useProject from 'Project/hooks/useProject'
import { STAKEHOLDERS_PATHS } from 'Project/features/Structure/features/Stakeholders/routes'
import useCreateStakeholderUser from 'Project/features/Structure/features/Stakeholders/hooks/useCreateStakeholderUser'
import useInfluencerUpdate from 'Project/features/ProcessMapping/hooks/useInfluencerUpdate'
import useFetchInfluencerDetail from 'Project/features/ProcessMapping/hooks/useFetchInfluencerDetail'
import { influencerDetailFromApi } from 'Project/features/ProcessMapping/transformers'
import InfluencersForm from 'Project/features/ProcessMapping/components/InfluencersForm'
import styles from './influencerStatusEdit.module.scss'

interface InfluencersStatusEditProps {
  handleBack: () => void
  processId: string
  influencerId: string
}

const InfluencersStatusEdit: FC<InfluencersStatusEditProps> = ({
  handleBack,
  processId,
  influencerId,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()
  const { influencer } = useFetchInfluencerDetail({
    id: influencerId,
    transformer: influencerDetailFromApi,
  })
  const { onClickOpenConfirm } = useCreateStakeholderUser(
    influencer?.stakeholder.id ?? '',
    () => null
  )
  const { onSubmit, isSubmitting } = useInfluencerUpdate(influencer?.id ?? '', handleBack)

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.leftContent}>
          <IconButton
            className={styles.goBackButton}
            color="primary"
            onClick={() => {
              handleBack()
            }}
          >
            <ArrowBack />
          </IconButton>
          <div className={styles.contentContainer}>
            <Typography variant="h3">{t('influencers.title')}</Typography>
          </div>
        </div>
      </div>
      <div className={styles.infoInfluencer}>
        <div className={styles.headInfluencer}>
          <h5 className={styles.nameInfluencer}>{influencer?.stakeholder.name ?? '-'}</h5>
          <div className={styles.linkInfluencer}>
            <LinkWithPermissions
              permissions={VIEW_STAKEHOLDERS}
              to={STAKEHOLDERS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
                ':stakeholderId',
                influencer?.stakeholder.id ?? ''
              )}
            >
              <VisibilityOutlined className={styles.iconInfluencer} />
            </LinkWithPermissions>
          </div>
        </div>
        <div className={styles.mainInfluencer}>
          <div className={styles.itemInfluencer}>
            <strong>{t('influencers.stakeholderId')}</strong>
            <span>{influencer?.stakeholder.code ?? '-'}</span>
          </div>
          <div className={styles.itemInfluencer}>
            <strong>{t('influencers.email')}</strong>
            <span>
              <LinkWithPermissions
                permissions={VIEW_STAKEHOLDERS}
                to={STAKEHOLDERS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
                  ':stakeholderId',
                  influencer?.stakeholder.id ?? ''
                )}
              >
                {influencer?.stakeholder.email ?? '-'}
              </LinkWithPermissions>
            </span>
            <div className={styles.actionInfluencer}>
              {!influencer?.stakeholder.isUser && (
                <Gated permissions={CREATE_STAKEHOLDER_USER}>
                  <div className={styles.createUser}>
                    <IconButton
                      aria-label="hide"
                      className={styles.btnActionInfluencer}
                      size="small"
                      onClick={onClickOpenConfirm}
                      color="inherit"
                    >
                      <Tooltip title={t('createUser.action')}>
                        <PersonAddAlt sx={{ fontSize: 14 }} />
                      </Tooltip>
                    </IconButton>
                  </div>
                </Gated>
              )}
            </div>
          </div>
          <div className={styles.itemInfluencer}>
            <strong>{t('influencers.position')}</strong>
            <span>{influencer?.stakeholder.positions.join(', ') ?? '-'}</span>
          </div>
        </div>
        <InfluencersForm
          initialValues={{
            processId,
            excluded: null,
            influences: influencer?.influences ?? {},
          }}
          influencer={influencer ?? undefined}
          onSubmit={onSubmit}
          handleBack={handleBack}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

export default InfluencersStatusEdit
