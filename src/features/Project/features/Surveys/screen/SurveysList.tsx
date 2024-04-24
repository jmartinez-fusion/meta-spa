import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ContentBox from 'components/ContentBox'
import dateFormat from 'utils/dateFormat.ts'
import useFilters from 'hooks/useFilters.js'
import useFetchSurveys from 'Project/features/Surveys/hooks/useFetchSurveys.tsx'
import { type Survey } from 'Project/features/Surveys/types'
import SurveysTable from 'Project/features/Surveys/components/SurveysTable'
import SurveysFilters from 'Project/features/Surveys/components/SurveysFilters'
import { useNavigate } from 'react-router-dom'
import useStopSurvey from 'Project/features/Surveys/hooks/useStopSurvey.tsx'
import useCancelSurvey from 'Project/features/Surveys/hooks/useCancelSurvey.tsx'
import useContinueSurvey from 'Project/features/Surveys/hooks/useContinueSurvey.tsx'

interface SurveysListProps {
  module: 'future_state_process' | 'current_state_process'
}

const SurveysList: FC<SurveysListProps> = ({ module }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const { onCancel, onApply, filters } = useFilters()
  const navigate = useNavigate()
  const { surveys, paginator, sorter, setSorter, loading, refresh } = useFetchSurveys({
    filters: { ...filters, module },
  })
  const { onClickOpenConfirm: onClickOpenConfirmStopSurvey } = useStopSurvey(refresh)
  const { onClickOpenConfirm: onClickOpenConfirmCancelSurvey } = useCancelSurvey(refresh)
  const { onClickOpenConfirm: onClickOpenConfirmContinueSurvey } = useContinueSurvey(refresh)

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const handleView = useCallback(
    (survey: Survey) => {
      navigate(`${survey.id}/edit`)
    },
    [navigate]
  )

  const handleViewAnswers = useCallback(
    (survey: Survey) => {
      navigate(`${survey.id}/answers`)
    },
    [navigate]
  )

  const handleEditConfigurations = useCallback(
    (survey: Survey) => {
      navigate(`${survey.id}/configurations`)
    },
    [navigate]
  )

  const columns = useMemo(
    () => [
      {
        header: t('fields.title'),
        fieldName: 'title',
        sortable: true,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: false,
        dataModifier: (survey: Survey): string => t(`types.${survey.type.type}`),
      },
      {
        header: t('fields.deliveredAt'),
        fieldName: 'deliveredAt',
        sortable: true,
        dataModifier: (survey: Survey): string =>
          survey.deliveredAt ? dateFormat(survey.deliveredAt, 'MM/DD/YYYY HH:mm') : '-',
      },
      {
        header: t('fields.closedAt'),
        fieldName: 'closedAt',
        sortable: true,
        dataModifier: (survey: Survey): string =>
          survey.closedAt ? dateFormat(survey.closedAt, 'MM/DD/YYYY HH:mm') : '-',
      },
      {
        header: t('fields.status'),
        fieldName: 'status',
        sortable: true,
        dataModifier: (survey: Survey): string => t(`statuses.${survey.status.status}`),
      },
      {
        header: t('fields.responses'),
        fieldName: 'responses',
        sortable: false,
        dataModifier: (survey: Survey): string => `${survey.totalSurveyed} / ${survey.totalSent}`,
      },
    ],
    [t]
  )

  return (
    <ContentBox>
      <SurveysFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
      <SurveysTable
        columns={columns}
        rows={surveys}
        loading={loading}
        onSort={setSorter}
        onClickEditConfigurations={handleEditConfigurations}
        onClickView={handleView}
        onClickViewAnswers={handleViewAnswers}
        onClickContinue={onClickOpenConfirmContinueSurvey}
        onClickStop={onClickOpenConfirmStopSurvey}
        onClickCancel={onClickOpenConfirmCancelSurvey}
        count={lastPage}
        page={page}
        sorter={sorter}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
      />
    </ContentBox>
  )
}

export default SurveysList
