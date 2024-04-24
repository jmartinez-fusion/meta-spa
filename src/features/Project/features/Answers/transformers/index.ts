import { type FiltersToApi, type Answer, type AnswerFromApi } from 'Project/features/Answers/types'
import dayjs from 'dayjs'

export const answerFromApi = ({
  id,
  name,
  lastAnswerAt,
  departments,
  projectRole,
  positions,
  influencerTypes,
}: AnswerFromApi): Answer => {
  return {
    id,
    lastAnswerAt: lastAnswerAt ? dayjs(lastAnswerAt) : undefined,
    name,
    departments,
    projectRole,
    positions,
    influencerTypes,
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { stakeholder, departments, positions, projectRole, influencers } = data

  return {
    name: stakeholder,
    departments: departments.map((department: any) => department.value).join(',') || '',
    positions: positions.map((position: any) => position.value).join(',') || '',
    projectRole,
    influencerTypes: influencers.join(',') || '',
  }
}
