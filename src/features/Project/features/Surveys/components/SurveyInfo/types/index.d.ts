import { type SurveyDetail } from 'Project/features/Surveys/types'

export interface SurveyInfoProps {
  survey?: SurveyDetail
  showTitle?: boolean
  onChangeSprint?: (_e: any, value: string) => void
  getFieldProps?: (name: string) => any | undefined | null
  module: 'future_state_process' | 'current_state_process'
}
