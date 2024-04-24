import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'src/config'
import useFetch from 'src/hooks/useFetch'
import { type Survey } from 'Project/features/Surveys/types'
import useProject from 'Project/hooks/useProject.ts'

export interface UseStopSurveyResult {
  onClickOpenConfirm: (survey: Survey) => void
}

export default function useStopSurvey(refresh: () => void): UseStopSurveyResult {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const confirm = useConfirm()
  const { project } = useProject()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    (survey: Survey) => {
      const action = 'close'

      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.exit'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          void doFetch({
            method: 'POST',
            url: `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys/${survey.id}/close`,
          }).then(() => {
            refresh()
          })
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, refresh, project?.id]
  )

  return { onClickOpenConfirm }
}
