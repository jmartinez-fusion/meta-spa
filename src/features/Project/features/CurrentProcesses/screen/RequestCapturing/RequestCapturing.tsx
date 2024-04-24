import { useCallback /*, useMemo */, type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, IconButton, SvgIcon, Typography } from '@mui/material'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useSaveRequestCapturing from 'Project/features/CurrentProcesses/hooks/useSaveRequestCapturing.tsx'
import CheckBoxList from 'components/CheckBoxList/CheckBoxList.tsx'
import { type CheckboxOption } from 'components/CheckBoxList/types'
import useProject from 'Project/hooks/useProject.ts'
import { LoadingButton } from '@mui/lab'
import LoadingRing from 'components/LoadingRing'
import useProcessesListConfirmDialog from 'Project/features/ProcessSelection/hooks/useProcessesListConfirmDialog.ts'
import FormBox from 'components/FormBox'
import useFetchCurrentProcessesRequestCapturing from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcessesRequestCapturing.tsx'
import { type CurrentProcessRequestCapturing } from 'Project/features/CurrentProcesses/types'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import styles from './requestCapturing.module.scss'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import { useNavigate } from 'react-router-dom'
import useSearch from 'hooks/useSearch.ts'
import useRequestCapturingListSearch from 'Project/features/CurrentProcesses/hooks/useRequestCapturingListSearch.tsx'

const convertProcessesToCheckBoxOptions = (
  processesOptions: CurrentProcessRequestCapturing[],
  handleGoToPresentation: (process: CurrentProcessRequestCapturing) => void
): CheckboxOption[] => {
  return processesOptions.map((currentProcess) => {
    return {
      id: currentProcess.id,
      label: (
        <div className={styles.threeNode}>
          <div className={styles.processName}>{currentProcess.name}</div>
          {currentProcess.presentationId && (
            <IconButton
              className={styles.presentationButton}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleGoToPresentation(currentProcess)
              }}
            >
              <SvgIcon>
                <CoPresentIcon />
              </SvgIcon>
            </IconButton>
          )}
        </div>
      ),
      subOptions:
        currentProcess.subProcesses?.length && currentProcess.subProcesses.length > 0
          ? convertProcessesToCheckBoxOptions(currentProcess.subProcesses, handleGoToPresentation)
          : undefined,
    }
  })
}

const RequestCapturing: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses.requestCapturing' })
  const navigate = useNavigate()
  const { currentProcesses, refresh, loading } = useFetchCurrentProcessesRequestCapturing()
  const { project } = useProject()
  const [currentProcessCheckboxOptions, setFutureProcessCheckboxOptions] = useState<
    CheckboxOption[]
  >([])
  const { filter } = useRequestCapturingListSearch()
  const { filteredOptions, handleChangeSearch } = useSearch(currentProcesses, filter)
  const [selectedCurrentProcessIds, setSelectedCurrentProcessIds] = useState<string[]>([])
  const [initialSelectedCurrentProcessIds, setInitialSelectedCurrentProcessIds] = useState<
    string[]
  >([])
  const { onClickOpenConfirm: onClickOpenConfirmCancelSelection } =
    useProcessesListConfirmDialog(refresh)
  const { isSaving, onSave } = useSaveRequestCapturing(initialSelectedCurrentProcessIds, refresh)
  const canSave = !(
    initialSelectedCurrentProcessIds.length === selectedCurrentProcessIds.length &&
    initialSelectedCurrentProcessIds.every((element) => selectedCurrentProcessIds.includes(element))
  )

  const handleChangeSelected = useCallback(
    (processIds: string[]) => {
      setSelectedCurrentProcessIds(processIds)
    },
    [setSelectedCurrentProcessIds]
  )

  const itemsBreadcrumbs = [
    {
      title: t('currentState'),
      path: CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  const handleGoToPresentation = useCallback(
    (process: CurrentProcessRequestCapturing) => {
      navigate(
        CURRENT_PROCESSES_PATHS.VIEW_PRESENTATION.replace(':projectId', project?.id ?? '').replace(
          ':currentProcessId',
          process.presentationId ?? ''
        )
      )
    },
    [project]
  )

  const handleSave = useCallback(() => {
    onSave(selectedCurrentProcessIds)
  }, [selectedCurrentProcessIds])

  const selectedProcessesOf = (processesOptions: CurrentProcessRequestCapturing[]): string[] => {
    const selectedCurrentProcessIds: string[] = []
    processesOptions?.forEach((currentProcess): void => {
      if (currentProcess.subProcesses) {
        selectedCurrentProcessIds.push(...selectedProcessesOf(currentProcess.subProcesses))
      }
    })

    return selectedCurrentProcessIds
  }

  useEffect(() => {
    if (currentProcesses) {
      const selected = selectedProcessesOf(currentProcesses)
      setInitialSelectedCurrentProcessIds(selected)
      setSelectedCurrentProcessIds(selected)
    }
  }, [currentProcesses])

  useEffect(() => {
    setFutureProcessCheckboxOptions(
      convertProcessesToCheckBoxOptions(filteredOptions ?? [], handleGoToPresentation)
    )
  }, [filteredOptions])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('title')}
        goBackPath={CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')}
      />
      <ContentBox>
        <Typography variant="h3">{t('subtitle')}</Typography>
        {loading ? (
          <LoadingRing center small />
        ) : (
          <FormBox>
            <div className={styles.three}>
              <CheckBoxList
                fullOptions={convertProcessesToCheckBoxOptions(
                  currentProcesses ?? [],
                  handleGoToPresentation
                )}
                loading={loading}
                disabled={isSaving}
                searchProps={{
                  name: 'search',
                  onChange: handleChangeSearch,
                }}
                options={currentProcessCheckboxOptions}
                recursivelySelection={false}
                selectedOptionIds={selectedCurrentProcessIds}
                onChange={handleChangeSelected}
              />
              {canSave && !loading && (
                <div className={styles.actions}>
                  <Button
                    onClick={onClickOpenConfirmCancelSelection}
                    variant="outlined"
                    color="primary"
                    disabled={isSaving ?? !canSave}
                  >
                    {t('common:cancel')}
                  </Button>
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={handleSave}
                    loading={isSaving}
                    endIcon={<ChecklistRtlIcon />}
                    disabled={!canSave}
                    color="primary"
                  >
                    {t('sendSurveys')}
                  </LoadingButton>
                </div>
              )}
            </div>
          </FormBox>
        )}
      </ContentBox>
    </div>
  )
}

export default RequestCapturing
