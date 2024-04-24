import { type Dayjs } from 'dayjs'
import { type Department } from '../../Structure/features/Departments/types'

export interface AnswerListMultiple {
  id: string
  name: string
}

export interface Answer {
  id: string
  name: string
  lastAnswerAt: Dayjs | undefined
  departments: Department[]
  projectRole: string[]
  positions: string[]
  influencerTypes: string[]
}

export interface AnswerFromApi {
  id: string
  name: string
  lastAnswerAt: Dayjs
  departments: Department[]
  projectRole: string[]
  positions: string[]
  influencerTypes: string[]
}

export interface FiltersToApi {
  name: string
  departments: string
  positions: string
  projectRole: string
  influencerTypes: string
}
