import { useCallback, type FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileUploadOutlined } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Gated from 'components/Gated'
import ContentBox from 'components/ContentBox'
import useFilters from 'hooks/useFilters'
import useModal from 'hooks/useModal'
import InfluencersTable from 'Project/features/ProcessMapping/components/InfluencersTable'
import UploadInfluencers from 'Project/features/ProcessMapping/components/UploadInfluencers'
import { type Influencer, type ProcessMappingDetail } from 'Project/features/ProcessMapping/types'
import { type Department } from 'Project/features/Structure/features/Departments/types'
import InfluencersStatusEdit from 'Project/features/ProcessMapping/components/InfluencersStatusEdit'
import InfluencersFilters from 'Project/features/ProcessMapping/components/InfluencersFilters'
import useFetchInfluencers from 'Project/features/ProcessMapping/hooks/useFetchInfluencers'
import { UPLOAD_INFLUENCERS } from 'permissions'
import styles from './influencersContent.module.scss'

const InfluencersContent: FC<{
  processMapping?: ProcessMappingDetail | undefined
}> = ({ processMapping }) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { processMappingId } = useParams()
  const [visibleInfluencer, setVisibleInfluencer] = useState(false)
  const [currentInfluencer, setCurrentInfluencer] = useState<Influencer>()
  const { onApply, onCancel, filters } = useFilters()

  const { influencers, paginator, sorter, setSorter, loading, refresh } = useFetchInfluencers({
    filters: {
      ...filters,
      processId: processMappingId,
      departments: [processMapping?.department?.id],
    },
  })
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const {
    Modal: ModalUploadInfluencers,
    close: closeUploadInfluencers,
    open,
    handleOpen,
  } = useModal()

  const columns = useMemo(
    () => [
      {
        header: t('influencers.name'),
        fieldName: 'name',
      },
      {
        header: t('influencers.departments'),
        fieldName: 'departments',
        dataModifier: (influencer: Influencer) =>
          influencer.departments.map((d: Department) => d.name),
      },
      { header: t('influencers.position'), fieldName: 'positions' },
      // { header: t('influencers.role'), fieldName: 'role' },
      {
        header: t('influencers.influences'),
        fieldName: 'influences',
        dataModifier: (influencer: Influencer): any => influencer.influences?.join(', ') ?? t('-'),
      },
      {
        header: t('influencers.excluded'),
        fieldName: 'excluded',
        dataModifier: (influencer: Influencer): any =>
          influencer.excluded === null
            ? ''
            : influencer.excluded
              ? t('common:Yes')
              : t('common:No'),
      },
    ],
    [t]
  )

  const handleClickView = useCallback((influencer: Influencer) => {
    setCurrentInfluencer(influencer)
    setVisibleInfluencer(true)
  }, [])

  const handleClickBackInfluencer = useCallback(() => {
    setCurrentInfluencer(undefined)
    setVisibleInfluencer(false)
    refresh()
  }, [])

  const handleClickUpload = useCallback(() => {
    handleOpen()
  }, [])

  return (
    <div>
      <div className={styles.headInfluencers}>
        <Typography variant="h3">{t('influencers.title')}</Typography>
        {!visibleInfluencer && (
          <Gated permissions={UPLOAD_INFLUENCERS}>
            <Button onClick={handleClickUpload} endIcon={<FileUploadOutlined />}>
              {t('upload.influencers')}
            </Button>
          </Gated>
        )}
      </div>
      {!visibleInfluencer && (
        <ContentBox>
          <InfluencersFilters onCancel={onCancel} onApply={onApply} />
          <InfluencersTable
            columns={columns}
            rows={influencers}
            loading={loading}
            onClickView={handleClickView}
            onSort={setSorter}
            count={lastPage}
            page={page}
            sorter={sorter}
            onPageChange={setPage}
            displayResultsMessage={displayResultsMessage}
            perPage={perPage}
            onRowsPerPageChange={setPerPage}
          />
        </ContentBox>
      )}

      {visibleInfluencer && (
        <InfluencersStatusEdit
          handleBack={handleClickBackInfluencer}
          influencerId={currentInfluencer?.influencerId ?? ''}
          processId={processMapping?.id ?? ''}
        />
      )}
      <ModalUploadInfluencers open={open && !loading} onClose={closeUploadInfluencers}>
        <UploadInfluencers
          processId={processMapping?.id ?? ''}
          handleClose={closeUploadInfluencers}
          onSuccess={refresh}
        />
      </ModalUploadInfluencers>
    </div>
  )
}

export default InfluencersContent
