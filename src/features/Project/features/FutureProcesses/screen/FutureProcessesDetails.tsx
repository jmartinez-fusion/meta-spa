import React, { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { useNavigate, useParams } from 'react-router-dom'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject'
import ContentBox from 'components/ContentBox'
import ModalHeader from 'components/ModalHeader/ModalHeader'
import ModalContent from 'components/ModalContent/ModalContent'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import FutureProcessesInfo from 'Project/features/FutureProcesses/components/FutureProcessesInfo/FutureProcessesInfo'
import useModal from 'hooks/useModal.tsx'
import FutureProcessesStatusForm from 'Project/features/FutureProcesses/components/FutureProcessesStatusForm'
import useResetFutureProcess from 'Project/features/FutureProcesses/hooks/useResetFutureProcess'
import { futureProcessFromApi } from 'Project/features/FutureProcesses/transformers'
import useFutureProcessChangeStatus from 'Project/features/FutureProcesses/hooks/useFutureProcessChangeStatus'
import useFetchFutureProcessDetail from 'Project/features/FutureProcesses/hooks/useFetchFutureProcessDetail'
import styles from './futureProcessesDetails.module.scss'
import getStatusIdByName from '../utils/getStatusByIdName'
import EditFutureProcessPresentation from 'components/EditFutureProcessPresentation'
import Gated from 'components/Gated'
import {
  CHANGE_STATUS_FUTURE_PROCESS_PRESENTATION,
  FILL_FUTURE_PROCESS_PRESENTATION,
  RESET_FUTURE_PROCESS_PRESENTATION,
  VIEW_FUTURE_PROCESS_PRESENTATION,
} from 'permissions'

const FutureProcessesDetails: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()
  const navigate = useNavigate()
  const { futureProcessId } = useParams()
  const { futureProcess, refresh } = useFetchFutureProcessDetail({
    id: futureProcessId,
    transformer: futureProcessFromApi,
  })
  const [isOpenModalStatus, setIsOpenModalStatus] = useState(false)
  const {
    Modal: ModalEdit,
    close: closeEdit,
    open: openEdit,
    handleOpen: handleOpenEdit,
  } = useModal()
  const { Modal: ModalStatus, close: closeStatus } = useModal()
  const { onClickOpenConfirm, reset } = useResetFutureProcess()
  const { onSubmit } = useFutureProcessChangeStatus(refresh)

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    onClickOpenConfirm(futureProcessId ?? '')
  }

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    reset(futureProcessId ?? '')
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
      FUTURE_PROCESSES_PATHS.EDIT_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
        ':futureProcessId',
        futureProcessId ?? ''
      )
    )
  }

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        goBackPath={FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')}
        rightContent={
          <div className={styles.buttonsTopContainer}>
            <Gated
              permissions={[RESET_FUTURE_PROCESS_PRESENTATION, FILL_FUTURE_PROCESS_PRESENTATION]}
              orValidation
            >
              <IconButton color="info" aria-label="hide" size="small" onClick={handleOpenEdit}>
                <Tooltip title={t('edit')}>
                  <EditIcon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>
            <Gated permissions={VIEW_FUTURE_PROCESS_PRESENTATION}>
              <IconButton
                color="info"
                aria-label="hide"
                size="small"
                onClick={() => {
                  navigate(
                    FUTURE_PROCESSES_PATHS.VIEW_PRESENTATION.replace(
                      ':projectId',
                      project?.id ?? ''
                    ).replace(':futureProcessId', futureProcessId ?? '')
                  )
                }}
              >
                <Tooltip title={t('view')}>
                  <CoPresentIcon sx={{ fontSize: 14 }} />
                </Tooltip>
              </IconButton>
            </Gated>

            <Gated permissions={CHANGE_STATUS_FUTURE_PROCESS_PRESENTATION}>
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
          </div>
        }
      />
      <div>
        <FutureProcessesInfo futureProcess={futureProcess ?? undefined} />
        <ModalEdit open={openEdit} onClose={closeEdit}>
          <EditFutureProcessPresentation
            handleCloseModalEdit={closeEdit}
            goToEditPresentation={goToEditPresentation}
            handleReset={handleReset}
            handleStart={handleStart}
            futureProcess={futureProcess ?? undefined}
          />
        </ModalEdit>
        <ModalStatus open={isOpenModalStatus} onClose={closeStatus}>
          <ContentBox isModal>
            <ModalHeader title={t('statusPresentation')} onClose={handleCloseModalStatus} />
            <ModalContent>
              <FutureProcessesInfo futureProcess={futureProcess ?? undefined} />
              <h2>{t('newStatus')}</h2>
              <FutureProcessesStatusForm
                initialValues={{
                  status: getStatusIdByName(futureProcess?.status ?? ''),
                }}
                onApply={handleSubmitChangeStatus}
                onCancel={handleCloseModalStatus}
              />
            </ModalContent>
          </ContentBox>
        </ModalStatus>
      </div>
    </div>
  )
}

export default FutureProcessesDetails
