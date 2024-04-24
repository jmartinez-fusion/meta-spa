import { type FC } from 'react'
import useFetchBankQuestions from 'Project/features/Surveys/components/QuestionsBank/hooks/useFetchQuestionsBank.tsx'
import useFilters from 'hooks/useFilters.ts'
import { Button, Pagination, PaginationItem } from '@mui/material'
import {
  Add,
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from '@mui/icons-material'
import styles from './questionsBankList.module.scss'
import { type BankQuestion } from 'Project/features/Surveys/components/QuestionsBank/types'
import QuestionsBankFilters from 'Project/features/Surveys/components/QuestionsBank/components/QuestionsBankFilters'
import LoadingRing from 'components/LoadingRing'
import ModalContent from 'components/ModalContent/ModalContent.tsx'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import { useTranslation } from 'react-i18next'
import ContentBox from 'components/ContentBox'

const QuestionsBankList: FC<{
  onClose: () => void
  onAddQuestion: (bankQuestion: BankQuestion) => void
}> = ({ onClose, onAddQuestion }) => {
  const { t } = useTranslation('common', { keyPrefix: 'questionsBank' })

  const { onCancel, onApply, filters } = useFilters()
  const { questions, paginator, loading } = useFetchBankQuestions({ filters })
  const { lastPage, displayResultsMessage, page, setPage } = paginator

  return (
    <ContentBox isModal>
      <ModalHeader onClose={onClose} title={t('title')} />
      <ModalContent>
        <QuestionsBankFilters onCancel={onCancel} onApply={onApply} />
        <div className={styles.questions}>
          {loading ? (
            <LoadingRing center small />
          ) : (
            <>
              {questions?.map((question: BankQuestion) => (
                <div key={question.id} className={styles.question}>
                  <div className={styles.information}>
                    <div className={styles.title}>{question.title}</div>
                    <div> {question.description}</div>
                  </div>
                  <Button
                    onClick={() => {
                      onAddQuestion(question)
                    }}
                    sx={{
                      alignSelf: 'center !important',
                      minHeight: '28px !important',
                      maxWidth: '126px !important',
                      minWidth: '126px !important',
                      width: '126px !important',
                    }}
                    endIcon={<Add />}
                  >
                    {t('add')}
                  </Button>
                </div>
              ))}
              <div className={styles.paginator}>
                <div className={styles.showingResults}>{displayResultsMessage}</div>
                <Pagination
                  showFirstButton
                  showLastButton
                  variant="outlined"
                  shape="rounded"
                  count={lastPage}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ChevronLeftRounded,
                        next: ChevronRightRounded,
                        first: KeyboardDoubleArrowLeftRounded,
                        last: KeyboardDoubleArrowRightRounded,
                      }}
                      {...item}
                    />
                  )}
                  onChange={(_e, value) => {
                    setPage(value)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </ModalContent>
    </ContentBox>
  )
}

export default QuestionsBankList
