import { type FC, useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import Gated from 'components/Gated'
import useFilters from 'hooks/useFilters'
import useProject from 'Project/hooks/useProject'
import useModal from 'hooks/useModal'
import { CREATE_FUTURE_PROCESS } from 'permissions'
import { type ProcessMapping } from 'Project/features/ProcessMapping/types'
import { PROCESS_MAPPING_PATHS } from 'Project/features/ProcessMapping/routes'
import useFetchProcessMapping from 'Project/features/ProcessMapping/hooks/useFetchProcessMapping'
import ProcessMappingTable from 'Project/features/ProcessMapping/components/ProcessMappingTable'
import ProcessMappingBreadcrumbs from 'Project/features/ProcessMapping/components/ProcessMappingBreadcrumbs'
import ProcessMappingFilters from 'Project/features/ProcessMapping/components/ProcessMappingFilters'
import UploadProcessMapping from 'Project/features/ProcessMapping/components/UploadProcessMapping'
import styles from './processMappingList.module.scss'

const ProcessMappingList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const { project } = useProject()
  const [searchParams] = useSearchParams()
  const branchCode = searchParams.get('branchCode')
  const status = searchParams.get('status') ?? undefined
  const { onCancel, onApply, filters } = useFilters()
  const { processMappings, processMappingsPath, paginator, sorter, setSorter, loading, refresh } =
    useFetchProcessMapping({
      filters,
    })

  const {
    Modal: ModalUploadProcessMapping,
    close: closeUploadProcessMapping,
    open,
    handleOpen,
  } = useModal()
  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const processMappingsPathList =
    PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
    '?branchCode=' +
    branchCode +
    '&status='

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: processMappingsPathList,
      active: true,
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      onApply({ processBranch: branchCode, status })
    }, 1)
  }, [branchCode, status])

  const navigateToProcessSelection = useCallback(
    (branchCode: string, status: string = '') => {
      navigate(
        PROCESS_MAPPING_PATHS.LIST.replace(':projectId', project?.id ?? '') +
          '?branchCode=' +
          branchCode +
          '&status=' +
          status
      )
    },
    [navigate]
  )

  const columns = useMemo(
    () => [
      {
        header: t('process'),
        fieldName: 'futureProcessName',
        dataModifier: (processMapping: ProcessMapping): any => (
          <div className={styles.processBranchItem}>
            <span>{processMapping.futureProcessName}</span>
            {processMapping.hasChildren && (
              <IconButton
                color="default"
                aria-label="hide"
                size="small"
                onClick={() => {
                  navigateToProcessSelection(processMapping?.branchCode ?? '', status)
                }}
              >
                <Tooltip title={t('viewChildren')}>
                  <SouthEastIcon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            )}
          </div>
        ),
      },
      { header: t('id'), fieldName: 'branchCode' },
      {
        header: t('mappedTo'),
        fieldName: 'department.name',
        dataModifier: (processMapping: ProcessMapping): any =>
          processMapping.department?.name ?? '-',
      },
      {
        header: t('mappedStatus'),
        fieldName: 'mappedStatus',
        dataModifier: (processMapping: ProcessMapping): any =>
          processMapping.mappedStatus ?? t('status.notMapped'),
      },
    ],
    [t, status]
  )

  const handleClickView = useCallback(
    ({ id }: { id: string }) => {
      navigate(`details/${id}`)
    },
    [navigate]
  )

  const handleClickUpload = useCallback(() => {
    handleOpen()
  }, [])

  const handleClickEdit = useCallback(() => {
    return null
  }, [])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <Gated permissions={CREATE_FUTURE_PROCESS}>
            <Button onClick={handleClickUpload} endIcon={<FileUploadOutlined />}>
              {t('upload.title')}
            </Button>
          </Gated>
        }
      />
      <ContentBox>
        <ProcessMappingFilters
          onCancel={onCancel}
          onApply={(data: any) => {
            navigateToProcessSelection(data.processBranch, data.status)
          }}
          initialFilters={{
            processBranch: branchCode ?? '',
          }}
        />
        <ProcessMappingBreadcrumbs processMappingPaths={processMappingsPath ?? []} />
        <ProcessMappingTable
          columns={columns}
          rows={processMappings}
          loading={loading}
          onClickView={handleClickView}
          onSort={setSorter}
          onClickEdit={handleClickEdit}
          count={lastPage}
          page={page}
          sorter={sorter}
          onPageChange={setPage}
          displayResultsMessage={displayResultsMessage}
          perPage={perPage}
          onRowsPerPageChange={setPerPage}
        />
        <ModalUploadProcessMapping open={open && !loading} onClose={closeUploadProcessMapping}>
          <UploadProcessMapping handleClose={closeUploadProcessMapping} onSuccess={refresh} />
        </ModalUploadProcessMapping>
      </ContentBox>
    </div>
  )
}

export default ProcessMappingList
