import React, { type FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject.ts'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import CurrentProcessesInfo from 'Project/features/CurrentProcesses/components/CurrentProcessesInfo/CurrentProcessesInfo.tsx'
import PresentationTool from 'Project/features/PresentationTool/screens/PresentationTool/PresentationTool.tsx'
import useFetchCurrentProcessPresentation from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcessPresentation.tsx'
import LoadingRing from 'components/LoadingRing'
import { useNavigate, useParams } from 'react-router-dom'
import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'
import useSaveCurrentProcessPresentation from 'Project/features/CurrentProcesses/hooks/useSaveCurrentProcessPresentation.tsx'
import useFetchCurrentProcessDetail from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcessDetail.tsx'
import styles from 'Project/features/FutureProcesses/screen/futureProcessesDetails.module.scss'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import useModal from 'hooks/useModal.tsx'
import useResetCurrentProcess from 'Project/features/CurrentProcesses/hooks/useResetCurrentProcess.tsx'
import ContentBox from 'components/ContentBox'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import ModalContent from 'components/ModalContent/ModalContent.tsx'
import getStatusIdByName from 'Project/features/FutureProcesses/utils/getStatusByIdName.ts'
import EditCurrentProcessPresentation from 'components/EditCurrentProcessPresentation'
import useCurrentProcessChangeStatus from 'Project/features/CurrentProcesses/hooks/useCurrentProcessChangeStatus.tsx'
import CurrentProcessesStatusForm from 'Project/features/CurrentProcesses/components/CurrentProcessesStatusForm'
import { ContentCopyOutlined, DeleteForeverOutlined } from '@mui/icons-material'
import useRemoveCurrentProcess from 'Project/features/CurrentProcesses/hooks/useRemoveCurrentProcess.tsx'
import Gated from 'components/Gated'
import {
  CHANGE_STATUS_CURRENT_PROCESS_PRESENTATION,
  CLONE_CURRENT_PROCESS,
  DELETE_CURRENT_PROCESS,
  FILL_CURRENT_PROCESS_PRESENTATION,
  UPDATE_CURRENT_PROCESS,
  VIEW_CURRENT_PROCESS_PRESENTATION,
} from 'permissions'

const CurrentProcessesPresentation: FC<{ mode?: 'view' | 'edit' }> = ({ mode = 'edit' }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()
  const { currentProcessId } = useParams()
  const navigate = useNavigate()
  const isView = mode === 'view'
  const {
    effectiveProcessId,
    currentProcessSteps,
    loading,
    refresh: refreshCurrentProcessPresentation,
  } = useFetchCurrentProcessPresentation(currentProcessId)
  const {
    currentProcess,
    loading: loadingCurrentProcess,
    refresh: refreshCurrentProcessDetail,
  } = useFetchCurrentProcessDetail({
    id: currentProcessId,
  })
  const {
    Modal: ModalEdit,
    close: closeEdit,
    open: openEdit,
    handleOpen: handleOpenEdit,
  } = useModal()
  const { Modal: ModalStatus, close: closeStatus } = useModal()

  const refresh = useCallback((): void => {
    refreshCurrentProcessDetail()
    refreshCurrentProcessPresentation()
    closeEdit()
    closeStatus()
  }, [refreshCurrentProcessDetail, refreshCurrentProcessPresentation, closeEdit, closeStatus])

  const { save: savePresentation, loading: loadingSave } = useSaveCurrentProcessPresentation(
    currentProcessId,
    refreshCurrentProcessPresentation
  )
  const [isOpenModalStatus, setIsOpenModalStatus] = useState(false)

  const { onClickOpenConfirm: onClickOpenRemoveCurrentProcess } = useRemoveCurrentProcess()
  const { onClickOpenConfirm, reset } = useResetCurrentProcess(refresh)
  const { onSubmit } = useCurrentProcessChangeStatus(refresh)

  const handleSave = useCallback((steps: AllowedPresentationStep[]) => {
    savePresentation(steps)
  }, [])

  const handleRemove = (): void => {
    onClickOpenRemoveCurrentProcess(currentProcess)
  }
  const handleReset = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    onClickOpenConfirm(currentProcessId ?? '')
  }

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    reset(currentProcessId ?? '')
    closeEdit()
  }

  const handleOpenModalStatus = (): void => {
    setIsOpenModalStatus(true)
  }

  const handleCloseModalStatus = (): void => {
    setIsOpenModalStatus(false)
  }

  const handleSubmitChangeStatus = (status: number): void => {
    onSubmit(status)
    handleCloseModalStatus()
  }

  const goToEditPresentation = (): void => {
    navigate(
      CURRENT_PROCESSES_PATHS.EDIT_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
        ':currentProcessId',
        currentProcessId ?? ''
      )
    )
    closeEdit()
  }

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  if (loadingCurrentProcess && !currentProcess) {
    return <LoadingRing center small />
  }

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        goBackPath={CURRENT_PROCESSES_PATHS.DETAILS.replace(
          ':projectId',
          project?.id ?? ''
        ).replace(':currentProcessId', currentProcessId ?? '')}
        rightContent={
          <div className={styles.buttonsTopContainer}>
            <Gated permissions={CLONE_CURRENT_PROCESS}>
              <IconButton
                color="info"
                aria-label="hide"
                size="small"
                onClick={() => {
                  navigate(
                    CURRENT_PROCESSES_PATHS.CLONE.replace(':projectId', project?.id ?? '').replace(
                      ':currentProcessId',
                      currentProcessId ?? ''
                    )
                  )
                }}
              >
                <Tooltip title={t('clone.action')}>
                  <ContentCopyOutlined sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>
            <Gated permissions={UPDATE_CURRENT_PROCESS}>
              <IconButton
                color="info"
                aria-label="hide"
                size="small"
                onClick={() => {
                  navigate(
                    CURRENT_PROCESSES_PATHS.EDIT.replace(':projectId', project?.id ?? '').replace(
                      ':currentProcessId',
                      currentProcessId ?? ''
                    )
                  )
                }}
              >
                <Tooltip title={t('edit.action')}>
                  <EditIcon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>

            {isView ? (
              <Gated permissions={FILL_CURRENT_PROCESS_PRESENTATION}>
                <IconButton color="info" aria-label="hide" size="small" onClick={handleOpenEdit}>
                  <Tooltip title={t('editPresentation')}>
                    <CoPresentIcon sx={{ fontSize: 14 }} />
                  </Tooltip>
                </IconButton>
              </Gated>
            ) : (
              <Gated permissions={VIEW_CURRENT_PROCESS_PRESENTATION}>
                <IconButton
                  color="info"
                  aria-label="hide"
                  size="small"
                  onClick={() => {
                    navigate(
                      CURRENT_PROCESSES_PATHS.VIEW_PRESENTATION.replace(
                        ':projectId',
                        project?.id ?? ''
                      ).replace(':currentProcessId', currentProcessId ?? '')
                    )
                  }}
                >
                  <Tooltip title={t('viewPresentation')}>
                    <CoPresentIcon sx={{ fontSize: 14 }} />
                  </Tooltip>
                </IconButton>
              </Gated>
            )}
            <Gated permissions={CHANGE_STATUS_CURRENT_PROCESS_PRESENTATION}>
              <IconButton
                color="info"
                aria-label="hide"
                size="small"
                onClick={handleOpenModalStatus}
              >
                <Tooltip title={t('review')}>
                  <HowToRegIcon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>
            <Gated permissions={DELETE_CURRENT_PROCESS}>
              <IconButton color="info" aria-label="hide" size="small" onClick={handleRemove}>
                <Tooltip title={t('delete')}>
                  <DeleteForeverOutlined sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>
          </div>
        }
      />
      <div>
        <CurrentProcessesInfo currentProcess={currentProcess ?? undefined} />
        <ModalEdit open={openEdit} onClose={closeEdit}>
          <EditCurrentProcessPresentation
            handleCloseModalEdit={closeEdit}
            goToEditPresentation={goToEditPresentation}
            handleReset={handleReset}
            handleStart={handleStart}
            currentProcess={currentProcess ?? undefined}
          />
        </ModalEdit>
        <ModalStatus open={isOpenModalStatus} onClose={closeStatus}>
          <ContentBox isModal>
            <ModalHeader title={t('statusPresentation')} onClose={handleCloseModalStatus} />
            <ModalContent>
              <CurrentProcessesInfo currentProcess={currentProcess ?? undefined} />
              <h2>{t('newStatus')}</h2>
              <CurrentProcessesStatusForm
                initialValues={{
                  status: getStatusIdByName(currentProcess?.status ?? ''),
                }}
                onApply={handleSubmitChangeStatus}
                onCancel={handleCloseModalStatus}
              />
            </ModalContent>
          </ContentBox>
        </ModalStatus>
      </div>
      {loading && currentProcessSteps?.length === 0 ? (
        <LoadingRing center small />
      ) : (
        <PresentationTool
          processId={currentProcessId ?? ''}
          initialData={currentProcessSteps}
          onSave={handleSave}
          effectiveProcessId={effectiveProcessId}
          mode={mode}
          module="current_state_process"
          isSaving={loadingSave}
        />
      )}
    </div>
  )
}

export default CurrentProcessesPresentation
