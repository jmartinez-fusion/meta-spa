import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { bankQuestionFromApi } from 'Project/features/Surveys/components/QuestionsBank/transformers'
import { type BankQuestion } from 'Project/features/Surveys/components/QuestionsBank/types'

interface UseFetchQuestionsBankProps {
  filters: Filters
}

interface UseFetchQuestionsBankReturn {
  questions: BankQuestion[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchBankQuestions = ({
  filters,
}: UseFetchQuestionsBankProps): UseFetchQuestionsBankReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [questions, setQuestionBanks] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProjects.baseUrl}/question-banks`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const questions = response.data.map((bankQuestion: any) => bankQuestionFromApi(bankQuestion))

    setQuestionBanks(questions)
  }, [response?.data, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
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

  return { questions, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchBankQuestions
