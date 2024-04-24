import {
  type BankQuestion,
  type BankQuestionFromApi,
  type FiltersToApi,
} from 'Project/features/Surveys/components/QuestionsBank/types'

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { question, categories = [], industries = [] } = data
  return {
    question,
    categories: categories.map((category: any) => category.value),
    industries: industries.map((industry: any) => industry.value),
  }
}

export const bankQuestionFromApi = ({
  id,
  title,
  description,
  type,
  dropdownOptions,
}: BankQuestionFromApi): BankQuestion => {
  // const dropdownOptionsArray = Object.keys(dropdownOptions).map((key) => ({
  //   value: key,
  //   label: dropdownOptions[key],
  // }))

  return {
    id,
    title,
    description,
    type,
    dropdownOptions,
  }
}
