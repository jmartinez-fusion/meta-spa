import { useCallback /*, useMemo */, type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, IconButton, SvgIcon } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Add, DeleteForeverOutlined } from '@mui/icons-material'
import ContentBox from 'components/ContentBox'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import { PROCESSES_PATHS } from 'Project/features/ProcessSelection/routes.tsx'
import useFetchFutureProcesses from 'Project/features/ProcessSelection/hooks/useFetchFutureProcesses.tsx'
import CheckBoxList from 'components/CheckBoxList/CheckBoxList.tsx'
import useSearch from 'src/hooks/useSearch.ts'
import { type FutureProcess } from 'Project/features/ProcessSelection/types'
import { type CheckboxOption } from 'components/CheckBoxList/types'
import useProject from 'Project/hooks/useProject.ts'
import { LoadingButton } from '@mui/lab'
import styles from './processesList.module.scss'
import LoadingRing from 'components/LoadingRing'
import useProcessesListConfirmDialog from 'Project/features/ProcessSelection/hooks/useProcessesListConfirmDialog.ts'
import useRemoveFutureProcess from 'Project/features/ProcessSelection/hooks/useRemoveFutureProcess.tsx'
import useSaveSelection from 'Project/features/ProcessSelection/hooks/useSaveSelection.tsx'
import useProcessesListSearch from 'Project/features/ProcessSelection/hooks/useProcessesListSearch.tsx'
import FormBox from 'components/FormBox'

const convertFutureProcessesToCheckBoxOptions = (
  futureProcessesOptions: FutureProcess[],
  handleDelete: (id: string) => void
): CheckboxOption[] => {
  return futureProcessesOptions.map((futureProcess) => {
    return {
      id: futureProcess.id,
      label: (
        <div className={styles.threeNode}>
          <div className={styles.futureProcessName}>
            <span className={styles.code}>{futureProcess.code}</span> {futureProcess.name}
          </div>
          {futureProcess.canBeDeleted && (
            <IconButton
              className={styles.deleteButton}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleDelete(futureProcess.id)
              }}
            >
              <SvgIcon>
                <DeleteForeverOutlined />
              </SvgIcon>
            </IconButton>
          )}
        </div>
      ),
      subOptions:
        futureProcess.subProcesses?.length && futureProcess.subProcesses.length > 0
          ? convertFutureProcessesToCheckBoxOptions(futureProcess.subProcesses, handleDelete)
          : undefined,
    }
  })
}

const ProcessesList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'ProcessSelection' })
  const { futureProcesses, refresh, loading } = useFetchFutureProcesses()
  const { project } = useProject()
  const { filter } = useProcessesListSearch()
  const { filteredOptions, handleChangeSearch } = useSearch(futureProcesses, filter)
  const [futureProcessCheckboxOptions, setFutureProcessCheckboxOptions] = useState<
    CheckboxOption[]
  >([])
  const [selectedFutureProcessIds, setSelectedFutureProcessIds] = useState<string[]>([])
  const [initialSelectedFutureProcessIds, setInitialSelectedFutureProcessIds] = useState<string[]>(
    []
  )
  const { onClickOpenConfirm: onClickOpenConfirmCancelSelection } =
    useProcessesListConfirmDialog(refresh)
  const { onClickOpenConfirm: onClickOpenConfirmRemoveFutureProcess } =
    useRemoveFutureProcess(refresh)
  const { isSaving, onSave } = useSaveSelection(initialSelectedFutureProcessIds, refresh)
  const canSave = !(
    initialSelectedFutureProcessIds.length === selectedFutureProcessIds.length &&
    initialSelectedFutureProcessIds.every((element) => selectedFutureProcessIds.includes(element))
  )

  const handleChangeSelectedFutureProcesses = useCallback(
    (processIds: string[]) => {
      setSelectedFutureProcessIds(processIds)
    },
    [setSelectedFutureProcessIds]
  )

  const itemsBreadcrumbs = [
    {
      title: t('configuration'),
      path: PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''),
      active: true,
    },
  ]

  const handleClickAdd = useCallback(() => {
    navigate(`create`)
  }, [navigate])

  const handleDelete = useCallback((id: string) => {
    onClickOpenConfirmRemoveFutureProcess(id)
  }, [])

  const handleSave = useCallback(() => {
    onSave(selectedFutureProcessIds)
  }, [selectedFutureProcessIds])

  const selectedProcessesOf = (futureProcessesOptions: FutureProcess[]): string[] => {
    const selectedFutureProcessIds: string[] = []
    futureProcessesOptions?.forEach((futureProcess): void => {
      if (futureProcess.isSelected) {
        selectedFutureProcessIds.push(futureProcess.id)
      }

      if (futureProcess.subProcesses) {
        selectedFutureProcessIds.push(...selectedProcessesOf(futureProcess.subProcesses))
      }
    })

    return selectedFutureProcessIds
  }

  useEffect(() => {
    if (futureProcesses) {
      const selected = selectedProcessesOf(futureProcesses)
      setInitialSelectedFutureProcessIds(selected)
      setSelectedFutureProcessIds(selected)
    }
  }, [futureProcesses])

  useEffect(() => {
    setFutureProcessCheckboxOptions(
      convertFutureProcessesToCheckBoxOptions(filteredOptions ?? [], handleDelete)
    )
  }, [filteredOptions])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('listing.title')}
        rightContent={
          <Button onClick={handleClickAdd} endIcon={<Add />}>
            {t('create.title')}
          </Button>
        }
      />
      <ContentBox>
        {loading ? (
          <LoadingRing center small />
        ) : (
          <FormBox>
            <CheckBoxList
              fullOptions={convertFutureProcessesToCheckBoxOptions(
                futureProcesses ?? [],
                () => null
              )}
              loading={loading}
              searchProps={{
                name: 'availableProcesses',
                label: t('availableProcesses', { industry: project?.industry }),
                onChange: handleChangeSearch,
              }}
              disabled={isSaving}
              options={futureProcessCheckboxOptions}
              selectedOptionIds={selectedFutureProcessIds}
              onChange={handleChangeSelectedFutureProcesses}
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
                  disabled={!canSave}
                  color="primary"
                >
                  {t('common:save')}
                </LoadingButton>
              </div>
            )}
          </FormBox>
        )}
      </ContentBox>
    </div>
  )
}

export default ProcessesList
