export interface FiltersToApi {
  question: string
  categories: string[]
  industries: string[]
}

export type DropdownOptions = Record<string, string>

export interface BankQuestion {
  id: string
  title: string
  description: string
  type: string
  dropdownOptions?: DropdownOptions | null
}

export interface BankQuestionFromApi {
  id: string
  title: string
  description: string
  type: string
  dropdownOptions?: DropdownOptions | null
}
