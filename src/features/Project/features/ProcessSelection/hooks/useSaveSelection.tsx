import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'src/hooks/useFetch'
import config from 'src/config'
import { useNavigate } from 'react-router-dom'
import useProject from 'Project/hooks/useProject.ts'

interface UseSaveSelection {
  onSave: (selectedProcessIds: string[]) => void
  isSaving: boolean
}

const useSaveSelection = (
  initialSelectedFutureProcessIds: string[],
  refresh: () => void
): UseSaveSelection => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessSelection' })
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/project-future-processes/update-selection`,
    {
      method: 'POST',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSave = useCallback(
    (currentSelectedProcessIds: string[]) => {
      const selected = currentSelectedProcessIds.filter(
        (id) => !initialSelectedFutureProcessIds.includes(id)
      )
      const unselected = initialSelectedFutureProcessIds.filter(
        (id) => !currentSelectedProcessIds.includes(id)
      )

      void doFetch({
        data: {
          projectId: project?.id,
          selected,
          unselected,
          deleted: [],
        },
      }).then(() => {
        refresh()
      })
    },
    [doFetch, project, initialSelectedFutureProcessIds]
  )

  useEffect(() => {
    if (!response) return

    const message = t('selectionSavedSuccessfully')

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error?.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        />
      ),
    })
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSave, isSaving: loading }
}

export default useSaveSelection
