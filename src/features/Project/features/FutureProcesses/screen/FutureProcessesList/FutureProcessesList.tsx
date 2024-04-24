import React, { type FC, useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { Add } from '@mui/icons-material'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFilters from 'hooks/useFilters.ts'
import useProject from 'Project/hooks/useProject.ts'
import useFetchFutureProcesses from 'Project/features/FutureProcesses/hooks/useFetchFutureProcesses.tsx'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'
import FutureProcessesFilters from 'Project/features/FutureProcesses/components/FutureProcessesFilters'
import FutureProcessesTable from 'Project/features/FutureProcesses/components/FutureProcessesTable'
import useModal from 'hooks/useModal.tsx'
import useResetFutureProcess from 'Project/features/FutureProcesses/hooks/useResetFutureProcess.tsx'
import {
  type FutureProcess,
  type FutureProcessDetail,
} from 'Project/features/FutureProcesses/types'
import useFetchFutureProcessDetail from 'Project/features/FutureProcesses/hooks/useFetchFutureProcessDetail.tsx'
import { futureProcessFromApi } from 'Project/features/FutureProcesses/transformers'
import { PROCESSES_PATHS } from 'Project/features/ProcessSelection/routes.tsx'
import FutureProcessChipStatus from 'Project/features/FutureProcesses/components/FutureProcessChipStatus/FutureProcessChipStatus.tsx'
import FutureProcessesBreadcrumbs from 'Project/features/FutureProcesses/components/FutureProcessesBreadcrumbs'
import EditFutureProcessPresentation from 'components/EditFutureProcessPresentation'
import Gated from 'components/Gated'
import { CREATE_FUTURE_PROCESS, LIST_SURVEYS } from 'permissions'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import styles from './futureProcessesList.module.scss'

const FutureProcessesList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()
  const [searchParams] = useSearchParams()
  const branchCode = searchParams.get('branchCode')
  const status = searchParams.get('status') ?? undefined
  const { onCancel, onApply, filters } = useFilters()
  const { futureProcesses, futureProcessesPath, paginator, sorter, setSorter, loading } =
    useFetchFutureProcesses({
      filters,
    })
  const [editFutureProcess, setEditFutureProcess] = useState<FutureProcess | undefined>(undefined)
  const { futureProcess } = useFetchFutureProcessDetail({
    id: editFutureProcess?.id,
    transformer: futureProcessFromApi,
  })
  const { Modal: ModalEdit, close: closeEdit, handleOpen, open } = useModal()
  const { onClickOpenConfirm, reset } = useResetFutureProcess()

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    onClickOpenConfirm(editFutureProcess?.id ?? '')
  }

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    reset(editFutureProcess?.id ?? '')
  }

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const futureProcessesPathList =
    FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '') +
    '?branchCode=' +
    branchCode +
    '&status='

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: futureProcessesPathList,
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
        FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '') +
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
        dataModifier: (futureProcess: FutureProcess): any => (
          <div className={styles.processBranchItem}>
            <span>{futureProcess.futureProcessName}</span>
            {futureProcess.hasChildren && (
              <IconButton
                color="default"
                aria-label="hide"
                size="small"
                onClick={() => {
                  navigateToProcessSelection(futureProcess?.branchCode ?? '', status)
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
        header: t('reviewStatus'),
        fieldName: 'status',
        dataModifier: (futureProcess: FutureProcessDetail): any => (
          <FutureProcessChipStatus status={futureProcess.status ?? ''} />
        ),
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

  const handleClickAdd = useCallback(() => {
    navigate(PROCESSES_PATHS.CREATE.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  const handleClickSurveys = useCallback(() => {
    navigate(FUTURE_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  const handleClickEdit = useCallback(
    (futureProcess: FutureProcess) => {
      setEditFutureProcess(futureProcess)
      handleOpen()
    },
    [navigate]
  )

  const goToEditPresentation = (): void => {
    navigate(
      FUTURE_PROCESSES_PATHS.EDIT_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
        ':futureProcessId',
        editFutureProcess?.id ?? ''
      )
    )
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <div className={styles.actions}>
            <Gated permissions={CREATE_FUTURE_PROCESS}>
              <Button onClick={handleClickAdd} endIcon={<Add />}>
                {t('create.title')}
              </Button>
            </Gated>
            <Gated permissions={LIST_SURVEYS}>
              <Button onClick={handleClickSurveys} endIcon={<ChecklistRtlIcon />}>
                {t('surveys.listing.title')}
              </Button>
            </Gated>
          </div>
        }
      />
      <ContentBox>
        <FutureProcessesFilters
          onCancel={onCancel}
          onApply={(data: any) => {
            navigateToProcessSelection(data.processBranch, data.status)
          }}
          initialFilters={{
            processBranch: branchCode ?? '',
            status,
          }}
        />
        <FutureProcessesBreadcrumbs futureProcessPaths={futureProcessesPath ?? []} />
        <FutureProcessesTable
          columns={columns}
          rows={futureProcesses}
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
        <ModalEdit open={open} onClose={closeEdit}>
          <EditFutureProcessPresentation
            handleCloseModalEdit={closeEdit}
            goToEditPresentation={goToEditPresentation}
            handleReset={handleReset}
            handleStart={handleStart}
            futureProcess={futureProcess ?? undefined}
          />
        </ModalEdit>
      </ContentBox>
    </div>
  )
}

export default FutureProcessesList
