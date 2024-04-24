import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useProject from 'Project/hooks/useProject'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import SurveysList from 'Project/features/Surveys/screen/SurveysList.tsx'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'

const CurrentProcessesSurveysList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()

  const futureStatePath = FUTURE_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: futureStatePath,
      active: true,
    },
  ]

  const handleClickAdd = useCallback(() => {
    navigate('create')
  }, [navigate])

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <PrivateScreenTitle
        title={t('surveys.listing.title')}
        rightContent={
          <Button onClick={handleClickAdd} endIcon={<ChecklistRtlIcon />}>
            {t('surveys.create.title')}
          </Button>
        }
      />
      <SurveysList module="future_state_process" />
    </div>
  )
}

export default CurrentProcessesSurveysList
