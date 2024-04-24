import { type FC, useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, SvgIcon } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useFilters from 'hooks/useFilters.ts'
import useProject from 'Project/hooks/useProject.ts'
import useFetchCurrentProcesses from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcesses.tsx'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import CurrentProcessesFilters from 'Project/features/CurrentProcesses/components/CurrentProcessesFilters'
import CurrentProcessesTable from 'Project/features/CurrentProcesses/components/CurrentProcessesTable'
import dateFormat from 'utils/dateFormat.ts'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import CurrentProcessChipStatus from 'Project/features/CurrentProcesses/components/CurrentProcessChipStatus/CurrentProcessChipStatus.tsx'
import styles from './currentProcessesList.module.scss'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import Gated from 'components/Gated'
import { CREATE_CURRENT_PROCESS, LIST_SURVEYS } from 'permissions'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'

const CurrentProcessesList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { project } = useProject()
  const [searchParams] = useSearchParams()
  const branchCode = searchParams.get('branchCode')
  const status = searchParams.get('status') ?? undefined
  const { onCancel, onApply, filters } = useFilters()
  const { currentProcesses, paginator, sorter, setSorter, loading } = useFetchCurrentProcesses({
    filters,
  })

  const getListNamesSpcBranches = (spcBranches: string[]): string => {
    if (!spcBranches || spcBranches.length === 0 || spcBranches.length > 1) {
      return ''
    }

    return spcBranches?.join(', ')
  }

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const currentProcessesPathList = CURRENT_PROCESSES_PATHS.LIST.replace(
    ':projectId',
    project?.id ?? ''
  )

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: currentProcessesPathList,
      active: true,
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      onApply({ processBranch: branchCode, status })
    }, 1)
  }, [branchCode, status])

  const columns = useMemo(
    () => [
      {
        header: t('singular'),
        fieldName: 'currentProcess',
        sortable: true,
      },
      {
        header: t('associatedCurrentProcesses'),
        fieldName: 'associatedCurrentProcesses',
        dataModifier: (currentProcess: CurrentProcess): any => (
          <span>{currentProcess.associatedCurrentProcesses?.name}</span>
        ),
      },
      {
        header: t('associatedSPC'),
        fieldName: 'associatedSpc',
        dataModifier: (currentProcess: CurrentProcess): any => (
          <span>{currentProcess.associatedSpc?.name}</span>
        ),
      },
      {
        header: t('SPCBranch'),
        fieldName: 'spcBranch',
        sortable: true,
        dataModifier: (currentProcess: CurrentProcess): any => (
          <span> {getListNamesSpcBranches(currentProcess.spcBranch ?? [])}</span>
        ),
      },
      {
        header: t('reviewStatus'),
        fieldName: 'status',
        dataModifier: (currentProcess: CurrentProcess): any => (
          <CurrentProcessChipStatus status={currentProcess.status ?? ''} />
        ),
      },
      {
        header: t('updatedAt'),
        fieldName: 'updatedAt',
        sortable: true,
        dataModifier: (currentProcess: CurrentProcess): string =>
          dateFormat(currentProcess.updatedAt),
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
    navigate(CURRENT_PROCESSES_PATHS.CREATE.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  const handleClickRequestCapturing = useCallback(() => {
    navigate(CURRENT_PROCESSES_PATHS.REQUEST_CAPTURING.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  const handleClickSurveys = useCallback(() => {
    navigate(CURRENT_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? ''))
  }, [navigate])

  const handleClickEdit = useCallback(
    (currentProcess: CurrentProcess) => {
      navigate(
        CURRENT_PROCESSES_PATHS.EDIT.replace(':projectId', project?.id ?? '').replace(
          ':currentProcessId',
          currentProcess.id ?? ''
        )
      )
    },
    [navigate]
  )

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <div className={styles.actions}>
            <Gated permissions={CREATE_CURRENT_PROCESS}>
              <div className={styles.newProcess} onClick={handleClickAdd}>
                {t('create.title')}
                <div className={styles.icon}>
                  <SvgIcon fontSize="inherit">
                    <PostAddIcon sx={{ transform: 'rotateY(180deg) rotate(180deg)' }} />
                  </SvgIcon>
                </div>
              </div>
            </Gated>
            <Button onClick={handleClickRequestCapturing} endIcon={<AddPhotoAlternateOutlined />}>
              {t('requestCapturing.subtitle')}
            </Button>
            <Gated permissions={LIST_SURVEYS}>
              <Button onClick={handleClickSurveys} endIcon={<ChecklistRtlIcon />}>
                {t('surveys.listing.title')}
              </Button>
            </Gated>
          </div>
        }
      />
      <ContentBox>
        <CurrentProcessesFilters onCancel={onCancel} onApply={onApply} />
        <CurrentProcessesTable
          columns={columns}
          rows={currentProcesses}
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
      </ContentBox>
    </div>
  )
}

export default CurrentProcessesList
