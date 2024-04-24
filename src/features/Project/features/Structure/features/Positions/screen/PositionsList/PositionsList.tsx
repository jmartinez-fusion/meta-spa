import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFilters from 'hooks/useFilters.js'
import PositionsFilters from 'Project/features/Structure/features/Positions/components/PositionsFilters'
import PositionsTable from 'Project/features/Structure/features/Positions/components/PositionsTable'
import useFetchPositions from 'Project/features/Structure/features/Positions/hooks/useFetchPositions.tsx'
import { POSITIONS_PATHS } from 'Project/features/Structure/features/Positions/routes.tsx'
import { type Position } from 'Project/features/Structure/features/Positions/types'
import dateFormat from 'utils/dateFormat.ts'
import StructureHeader from 'components/StructureHeader'
import useModal from 'hooks/useModal.tsx'
import Gated from 'components/Gated'
import { UPLOAD_POSITIONS } from 'permissions'
import UploadPositions from 'Project/features/Structure/features/Positions/components/UploadPositions'
import styles from './positionsList.module.scss'
const PositionsList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Positions' })
  const { projectId } = useParams()
  const { onCancel, onApply, filters } = useFilters()
  const { positions, paginator, sorter, setSorter, loading, refresh } = useFetchPositions({
    filters,
  })
  const { Modal: ModalUploadPositions, close: closeUploadPositions, open, handleOpen } = useModal()
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: POSITIONS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('plural'),
      path: POSITIONS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: true,
    },
  ]

  const columns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.code'),
        fieldName: 'code',
        sortable: true,
      },
      {
        header: t('fields.updatedAt'),
        fieldName: 'updatedAt',
        sortable: true,
        dataModifier: (position: Position): string =>
          dateFormat(position.updatedAt, 'MM/DD/YYYY HH:mm'),
      },
    ],
    [t]
  )

  const handleClickAdd = useCallback(() => {
    handleOpen()
  }, [navigate])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <Gated permissions={UPLOAD_POSITIONS}>
            <Button onClick={handleClickAdd} endIcon={<FileUploadOutlined />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <StructureHeader active="positions" />
      <div className={styles.subtitle}>{t('plural')}</div>
      <ContentBox>
        <PositionsFilters onCancel={onCancel} onApply={onApply} />
        <PositionsTable
          columns={columns}
          rows={positions}
          loading={loading}
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
      <ModalUploadPositions open={open && !loading} onClose={closeUploadPositions}>
        <UploadPositions handleClose={closeUploadPositions} onSuccess={refresh} />
      </ModalUploadPositions>
    </div>
  )
}

export default PositionsList
