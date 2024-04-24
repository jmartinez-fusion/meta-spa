import { type FC, type ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFilters from 'hooks/useFilters.js'
import dateFormat from 'utils/dateFormat.ts'
import StructureHeader from 'components/StructureHeader'
import useModal from 'hooks/useModal.tsx'
import Gated from 'components/Gated'
import { UPLOAD_STAKEHOLDERS } from 'permissions'
import useFetchStakeholders from 'Project/features/Structure/features/Stakeholders/hooks/useFetchStakeholders.tsx'
import StakeholdersFilters from 'Project/features/Structure/features/Stakeholders/components/StakeholdersFilters'
import StakeholdersTable from 'Project/features/Structure/features/Stakeholders/components/StakeholdersTable'
import { STAKEHOLDERS_PATHS } from 'Project/features/Structure/features/Stakeholders/routes.tsx'
import UploadStakeholders from 'src/features/Project/features/Structure/features/Stakeholders/components/UploadStakeholders'
import { type Stakeholder } from 'Project/features/Structure/features/Stakeholders/types'
import TableListItem from 'components/TableListItem'
import ManagerWarning from 'components/ManagerWarning'
import styles from './stakeholdersList.module.scss'

const StakeholdersList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders' })
  const { projectId } = useParams()
  const { onCancel, onApply, filters } = useFilters()
  const { stakeholders, paginator, sorter, setSorter, loading, refresh } = useFetchStakeholders({
    filters,
  })
  const {
    Modal: ModalUploadStakeholders,
    close: closeUploadStakeholders,
    open,
    handleOpen,
  } = useModal()
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: STAKEHOLDERS_PATHS.LIST.replace(':projectId', projectId ?? ''),
      active: false,
    },
    {
      title: t('plural'),
      path: STAKEHOLDERS_PATHS.LIST.replace(':projectId', projectId ?? ''),
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
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
      },
      {
        header: t('fields.code'),
        fieldName: 'code',
        sortable: true,
      },
      {
        header: t('fields.departments'),
        fieldName: 'departments',
        sortable: false,
        dataModifier: (stakeholder: Stakeholder): ReactNode => (
          <div className={styles.departments}>
            {stakeholder?.departments?.some((department) => department.manager) && (
              <ManagerWarning />
            )}
            <TableListItem items={stakeholder?.departments?.map((department) => department.name)} />
          </div>
        ),
      },
      {
        header: t('fields.positions'),
        fieldName: 'positions',
        sortable: false,
        dataModifier: (stakeholder: Stakeholder): ReactNode => (
          <TableListItem items={stakeholder?.positions} />
        ),
      },
      {
        header: t('fields.projectRole'),
        fieldName: 'projectRole',
        sortable: true,
      },
      {
        header: t('fields.updatedAt'),
        fieldName: 'updatedAt',
        sortable: false,
        dataModifier: (stakeholder: Stakeholder): string =>
          dateFormat(stakeholder.updatedAt, 'MM/DD/YYYY HH:mm'),
      },
    ],
    [t]
  )

  const handleClickView = useCallback(
    ({ id }: Stakeholder) => {
      navigate(
        STAKEHOLDERS_PATHS.DETAILS.replace(':projectId', projectId ?? '').replace(
          ':stakeholderId',
          id
        )
      )
    },
    [navigate, projectId]
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
          <Gated permissions={UPLOAD_STAKEHOLDERS}>
            <Button onClick={handleClickAdd} endIcon={<FileUploadOutlined />}>
              {t('create.title')}
            </Button>
          </Gated>
        }
      />
      <StructureHeader active="stakeholders" />
      <div className={styles.subtitle}>{t('plural')}</div>
      <ContentBox>
        <StakeholdersFilters onCancel={onCancel} onApply={onApply} />
        <StakeholdersTable
          columns={columns}
          rows={stakeholders}
          loading={loading}
          onSort={setSorter}
          onClickView={handleClickView}
          count={lastPage}
          page={page}
          sorter={sorter}
          onPageChange={setPage}
          displayResultsMessage={displayResultsMessage}
          perPage={perPage}
          onRowsPerPageChange={setPerPage}
        />
      </ContentBox>
      <ModalUploadStakeholders open={open && !loading} onClose={closeUploadStakeholders}>
        <UploadStakeholders handleClose={closeUploadStakeholders} onSuccess={refresh} />
      </ModalUploadStakeholders>
    </div>
  )
}

export default StakeholdersList
