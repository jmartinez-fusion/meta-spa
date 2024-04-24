import { type FC, useCallback, useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import TableListItem from 'components/TableListItem'
import ContentBox from 'components/ContentBox'
import dateFormat from 'utils/dateFormat'
import usePagination from 'hooks/usePagination'
import useFilters from 'hooks/useFilters'
import { type Answer } from 'Project/features/Answers/types'
import useProject from 'Project/hooks/useProject'
import useFetchAnswers from 'Project/features/Answers/hooks/useFetchAnswers'
import AnswersTable from 'Project/features/Answers/components/AnswersTable'
import AnswersFilters from 'Project/features/Answers/components/AnswersFilters'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes'

interface AnswersListProps {
  module: 'future_state_process' | 'current_state_process'
}

const AnswersList: FC<AnswersListProps> = ({ module }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Answers' })
  const { onCancel, filters, onApply } = useFilters()
  const navigate = useNavigate()
  const { project } = useProject()
  const { surveyId } = useParams()
  const { answers, loading } = useFetchAnswers({
    filters: { ...filters, module },
  })

  const {
    data: answersPaginated,
    displayResultsMessage,
    paginator,
    goToPage,
    setSorter,
  } = usePagination(answers ?? [], 10)

  const { lastPage, currentPage, perPage } = paginator

  const viewAnswerPath =
    module === 'future_state_process' ? FUTURE_PROCESSES_PATHS : CURRENT_PROCESSES_PATHS

  const handleView = useCallback(
    (answer: Answer) => {
      navigate(
        viewAnswerPath.SURVEY_ANSWER.replace(':projectId', project?.id ?? '')
          .replace(':surveyId', surveyId ?? '')
          .replace(':answerId', answer.id ?? '')
      )
    },
    [navigate]
  )

  const columns = useMemo(
    () => [
      {
        header: t('fields.stakeholder'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.lastAnsweredAt'),
        fieldName: 'lastAnsweredAt',
        sortable: true,
        dataModifier: (answer: Answer): string =>
          answer.lastAnswerAt ? dateFormat(answer.lastAnswerAt, 'MM/DD/YYYY HH:mm') : '-',
      },
      {
        header: t('fields.department'),
        fieldName: 'departments',
        dataModifier: (answer: Answer): ReactNode => (
          <TableListItem items={answer.departments?.map((department) => department.name)} />
        ),
      },
      {
        header: t('fields.position'),
        fieldName: 'positions',
        dataModifier: (answer: Answer): ReactNode => (
          <TableListItem items={answer.positions?.map((position) => position)} />
        ),
      },
      {
        header: t('fields.influencer'),
        fieldName: 'influencerTypes',
        dataModifier: (answer: Answer): ReactNode => (
          <TableListItem items={answer.influencerTypes?.map((influencerType) => influencerType)} />
        ),
      },
    ],
    [t]
  )

  return (
    <ContentBox>
      <AnswersFilters onCancel={onCancel} onApply={onApply} isSearching={loading} />
      <AnswersTable
        columns={columns}
        rows={answersPaginated}
        loading={loading}
        onSort={setSorter}
        onClickView={handleView}
        count={lastPage}
        page={currentPage}
        onPageChange={goToPage}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={() => null}
      />
    </ContentBox>
  )
}

export default AnswersList
